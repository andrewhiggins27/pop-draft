RSpec.describe Team, type: :model do
  let!(:pool1) {Pool.create(name:"test pool")}
  let!(:selection1) {Selection.create(name:"selection", description: "description", image: "image.png", pool: pool1)}
  let!(:selection2) {Selection.create(name:"selection2", description: "description2", image: "image2.png", pool: pool1)}
  let!(:selection3) {Selection.create(name:"selection3", description: "description3", image: "image3.png", pool: pool1)}
  let!(:selection4) {Selection.create(name:"selection4", description: "description4", image: "image4.png", pool: pool1)}

  describe "#self.start" do
    it "when given a poolId and no second argument, it returns a new game with 2 teams" do
      game = Game.start(pool1.id)

      expect(game.pool).to eq(pool1)
      expect(game.status).to eq("in progress")
      expect(game.teams.count).to eq(2)
    end
    it "takes in an optional second argument of number of players, and creates the appropriate number of teams" do
      game_3_players = Game.start(pool1.id, "3")
      game_4_players = Game.start(pool1.id, "4")

      expect(game_3_players.teams.count).to eq(3)
      expect(game_4_players.teams.count).to eq(4)
    end
    it "creates draft class associated with the game" do
      game = Game.start(pool1.id)

      expect(DraftClass.last).to eq(game.draft_class)
      expect(game.draft_class.selections.count).to eq(4)
    end
  end
  describe "#self.online_start" do
    it "takes in a poolId, numberofplayers string, and user as arguments and returns a new game with a status of waiting" do
      user1 = FactoryBot.create(:user)
      game = Game.online_start(pool1.id, "2", user1)

      expect(game.pool).to eq(pool1)
      expect(game.status).to eq("waiting")
      expect(game.teams.count).to eq(1)
      expect(game.number_of_players).to eq(2)
      expect(game.created_by).to eq(user1.username)
      expect(game.teams.first.user).to eq(user1)
      expect(game.draft_class).to eq(DraftClass.last)
    end
  end
  describe "#self.player_makes_selection" do
    let!(:game1) {Game.start(pool1.id)}
    it "adds the selection to the current_player's team, and removes the association from the game" do
      game_starting_selections = game1.selections.count
      game_updated = Game.player_makes_selection(selection1.id, game1.id, game1.current_player)

      expect(game_updated.teams.first.selections.first).to eq(selection1)
      expect(game_updated.selections.count).to eq(game_starting_selections - 1)
    end
    it "updates the game's current_player" do
      game_starting_player = game1.current_player
      game_updated = Game.player_makes_selection(selection1.id, game1.id, game1.current_player)

      expect(game_updated.current_player).not_to eq(game_starting_player)
    end
    it "if 3 player game or more, updates current_player in serpentine order" do
      game_3_players = Game.start(pool1.id, "3")
      game_starting_player = game_3_players.current_player
      game_updated_1 = Game.player_makes_selection(selection1.id, game_3_players.id, game_3_players.current_player)
      game_updated_2 = Game.player_makes_selection(selection2.id, game_updated_1.id, game_updated_1.current_player)
      game_updated_3 = Game.player_makes_selection(selection3.id, game_updated_2.id, game_updated_2.current_player)
      game_updated_4 = Game.player_makes_selection(selection4.id, game_updated_3.id, game_updated_3.current_player)

      expect(game_updated_1.current_player).not_to eq(game_starting_player)
      expect(game_updated_1.current_player).to eq(1)
      expect(game_updated_2.current_player).to eq(2)
      expect(game_updated_3.current_player).to eq(2)
      expect(game_updated_4.current_player).to eq(1)
    end
    it "updates round if every team has made a selection that round" do
      game = Game.player_makes_selection(selection1.id, game1.id, game1.current_player)
      game_second_round = Game.player_makes_selection(selection2.id, game.id, game.current_player)

      expect(game.round).to eq("1")
      expect(game_second_round.round).to eq("2")
    end
    it "changes round to 'complete' when round 6 ends" do
      game1.round = "6"
      game1.save
      game = Game.player_makes_selection(selection1.id, game1.id, game1.current_player)
      game_updated = Game.player_makes_selection(selection2.id, game.id, game.current_player)

      expect(game_updated.round).to eq("complete")
    end
  end
  describe "#does_not_include_user?" do
    it "should return false if the user is associated with the game" do
      user1 = FactoryBot.create(:user)
      game = Game.create()
      team = Team.create(game: game, user: user1)

      expect(game.does_not_include_user?(user1)).to eq(false)
    end
    it "should return true if the user is NOT associated with the game" do
      user1 = FactoryBot.create(:user)
      user2 = FactoryBot.create(:user)
      game = Game.create()
      team = Team.create(game: game, user: user1)

      expect(game.does_not_include_user?(user2)).to eq(true)
    end
  end
  describe "#find_user_team" do
    it "should return the team of the user passed as argument" do
      user3 = FactoryBot.create(:user)
      user4 = FactoryBot.create(:user)
      game = Game.create()
      team1 = Team.create(game: game, user: user3)
      team2 = Team.create(game: game, user: user4)

      expect(game.find_user_team(user3)).to eq(team1)
    end
  end
  describe "#self.find_random_game" do
    it "takes in a gameID, and returns a random completed game that doesn't have the supplied gameId" do
      game1 = Game.create(round: 'complete')      
      game2 = Game.create(round: 'complete')
      game3 = Game.create()  
      
      random_game = Game.find_random_game(game1.id)

      expect(random_game).not_to eq(game1)
      expect(random_game).to eq(game2)
    end
  end
  describe "#enough_players?" do
    it "returns true if the number of teams equals the game's number_of_players value" do
      user1 = FactoryBot.create(:user)
      game1 = Game.start(pool1.id)
      game2 = Game.online_start(pool1.id, "2", user1)

      expect(game1.enough_players?).to be true
      expect(game2.enough_players?).to be false
    end
  end
  describe "#current_player_username" do
    it "returns the username for the current player" do
      user1 = FactoryBot.create(:user)
      game1 = Game.online_start(pool1.id, "2", user1)

      expect(game1.current_player_username).to eq(user1.username)
    end
  end
  describe "#created" do
    it "returns a string with the formatted created_at time" do
      game1 = Game.start(pool1.id)
      
      expect(game1.created).to eq(game1.created_at.strftime("%b %e, %l:%M %p"))
    end
  end
  describe "#current_num_of_players" do
    it "returns the number of teams currently associated with the game" do
      game1 = Game.start(pool1.id)

      expect(game1.current_num_of_players).to eq(2)
    end
  end
end

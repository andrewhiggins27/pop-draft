RSpec.describe Team, type: :model do
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
end
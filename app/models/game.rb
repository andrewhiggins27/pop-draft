class Game < ApplicationRecord
  has_one :draft_class
  has_one :pool, through: :draft_class
  has_many :teams
  has_many :usergames
  has_many :users, through: :usergames
  has_many :gameselections
  has_many :selections, through: :gameselections

  def self.start(poolId, num_players = "2")
    number_of_players = num_players.to_i
    pool = Pool.find(poolId)
    game = Game.create(number_of_players: number_of_players)
    selections = pool.selections.sample(10 * number_of_players)
    game.selections = selections
    number_of_players.times do
      Team.create(game: game)
    end

    draft_class = DraftClass.create(
      pool: pool, 
      game: game, 
      selections: selections
    )      

    return game
  end

  def self.online_start(poolId, num_players = "2", user)
    number_of_players = num_players.to_i
    pool = Pool.find(poolId)
    game = Game.create(status: "waiting", number_of_players: number_of_players, created_by: user.username)
    selections = pool.selections.sample(10 * number_of_players)
    game.selections = selections
    Team.create(game: game, user: user)
    
    draft_class = DraftClass.create(
      pool: pool, 
      game: game, 
      selections: selections
    )      

    return game
  end

  def self.player_makes_selection(selectionId, gameId, player_num)
    selection = Selection.find(selectionId)
    game = Game.find(gameId)
    team = game.teams[player_num.to_i]
    team.selections << selection
    game.selections.destroy(selection)
    current_player = game.current_player

    if game.teams.count == 2
      if current_player == 0
        game.current_player = 1
        game.save
      elsif current_player == 1
        game.current_player = 0
        game.save
      end
    else
      if game.round.to_i.odd? 
        unless game.teams[current_player] == game.teams.last
          game.current_player = current_player + 1
          game.save
        end
      else
        unless game.teams[current_player] == game.teams.first
          game.current_player = current_player - 1
          game.save
        end
      end
    end

    if game.teams.first.selections.count == game.teams.last.selections.count
      game.round = (game.round.to_i + 1).to_s
      game.save
      if game.round == "7"
        game.round = "complete"
        game.status = "complete"
        game.save
      end
    end

    return game
  end

  def self.find_random_game(gameId)
    last_game = Game.find(gameId)
    completed_games = Game.where({round: 'complete'})
    random_game = completed_games.sample

    while random_game == last_game do
      random_game = completed_games.sample
    end
    return random_game
  end

  def does_not_include_user?(user)
    teams = self.teams
    teams_check = teams.map { |team| team.user.id == user.id  }
    if teams_check.include?(true)
      return false
    else
      return true
    end
  end

  def enough_players?
    self.number_of_players == self.teams.count
  end

  def current_player_username
    self.teams[self.current_player].user.username
  end
end
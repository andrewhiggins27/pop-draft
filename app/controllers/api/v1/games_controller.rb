class Api::V1::GamesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    completed_games = Game.where({round: 'complete'})
    random_game = completed_games.sample

    render json: random_game
  end

  def show
    render json: Game.find(params["id"])
  end

  def update
    selection = Selection.find(params["selection"])
    game = Game.find(params["id"])
    team = game.teams[params["player"].to_i]
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
        game.save
      end
    end

    render json: game
  end
end

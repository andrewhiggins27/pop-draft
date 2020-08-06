class Api::V1::GamesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    render json: Game.find(params["id"])
  end

  def update
    selection = Selection.find(params["selection"])
    game = Game.find(params["id"])
    team = game.teams[params["player"].to_i]
    team.selections << selection
    game.selections.destroy(selection)

    if game.teams[0].selections.count == game.teams[1].selections.count
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

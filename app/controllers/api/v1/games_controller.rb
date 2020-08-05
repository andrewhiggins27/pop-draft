class Api::V1::GamesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def update
    selection = Selection.find(params["selection"])
    game = Game.find(params["id"])
    team = game.teams[params["player"].to_i]
    team.selections << selection
    game.selections.destroy(selection)
    
    render json: game
  end
end

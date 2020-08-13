class Api::V1::GamesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    if Game.all.count < 2
      game = Game.find(params["gameId"])

      render json: game
    else
      random_game = Game.find_random_game(params["gameId"])

      render json: random_game
    end
  end

  def show
    game = Game.find(params["id"])

    render json: game
  end

  def update
    game = Game.player_makes_selection(params["selection"], params["id"], params["player"])

    render json: game
  end
end

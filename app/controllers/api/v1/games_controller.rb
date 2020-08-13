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
    if Game.where(id: params["id"]).empty?
      render json: {conn_error: "Game not found."}
    else
      game = Game.find(params["id"])
      render json: game
    end
  end

  def update
    game = Game.player_makes_selection(params["selection"], params["id"], params["player"])

    render json: game
  end
end

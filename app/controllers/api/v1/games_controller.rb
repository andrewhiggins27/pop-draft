class Api::V1::GamesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    random_game = Game.find_random_game(params["gameId"])

    render json: random_game
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

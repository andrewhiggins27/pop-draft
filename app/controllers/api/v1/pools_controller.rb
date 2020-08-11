class Api::V1::PoolsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Pool.all
  end

  def update
    if params["online"]
      game = Game.online_start(params["id"], params["numberOfPlayers"], current_user)
    else
      game = Game.start(params["id"], params["numberOfPlayers"])
    end

    render json: game
  end

  def waiting_games
    pool = Pool.find(params["id"])
    waiting_games = pool.games.where({status: "waiting"}).limit(20).order("created_at DESC")

    render json: waiting_games
  end
end

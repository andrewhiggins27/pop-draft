class Api::V1::PoolsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Pool.all
  end

  def show
    render json: Pool.find(params["id"])
  end

  def waiting_games
    if current_user
      pool = Pool.find(params["id"])
      waiting_games = pool.games.where({status: "waiting"}).limit(20).order("created_at DESC")

      render json: waiting_games, serializer: GameWaitingSerializer
    else
      render json: { error: "You must be signed in to play online" }
    end
  end

  def start_game
    game = Game.start(params["id"], params["numberOfPlayers"])

    render json: game
  end

  def start_online_game
    if current_user 
      game = Game.online_start(params["id"], params["numberOfPlayers"], current_user)
      render json: game
    else
      render json: { error: "You must be signed in to play online" }
    end
  end
end

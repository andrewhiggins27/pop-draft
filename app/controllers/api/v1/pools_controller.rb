class Api::V1::PoolsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Pool.all
  end

  def show
    binding.pry

    pool = Pool.find(params["id"])
    game = Game.create
    selections = pool.selections.sample(20)
    game.selections = selections
    Team.create(game: game)
    Team.create(game: game)
    draft_class = DraftClass.create(
      pool: pool, 
      game: game, 
      selections: selections
    )

    render json: draft_class
  end

  def update
    number_of_players = params["numberOfPlayers"].to_i
    pool = Pool.find(params["id"])
    game = Game.create
    selections = pool.selections.sample(20)
    game.selections = selections
    number_of_players.times do
      Team.create(game: game)
    end

    draft_class = DraftClass.create(
      pool: pool, 
      game: game, 
      selections: selections
    )

    render json: game
  end
end

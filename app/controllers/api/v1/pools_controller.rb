class Api::V1::PoolsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    # draft_class = GameStart.begin_game(params["id"])
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
end
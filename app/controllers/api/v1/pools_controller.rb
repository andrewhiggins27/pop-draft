class Api::V1::PoolsController < ApplicationController
  def show
    pool = Pool.find(params["id"])
    game = Game.create
    selections = pool.selections.sample(20)
    draft_class = DraftClass.create(
      pool: pool, 
      game: game, 
      selections: selections
    )

    render json: draft_class
  end
end
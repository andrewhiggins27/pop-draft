class Api::V1::PoolsController < ApplicationController

  def show
    pool = Pool.find(params["id"])
    selections = pool.selections.sample(20)
    render json: selections
  end

end
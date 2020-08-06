class Api::V1::UsersController < ApplicationController

  def show
    render json: { user_id: current_user.id, handle: current_user.email }
  end

end

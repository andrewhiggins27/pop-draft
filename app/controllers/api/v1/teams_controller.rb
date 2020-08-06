class Api::V1::TeamsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def update
    game = Game.find(params["gameId"])
    team = Team.find(params["id"])

    if current_user
      team.liked_by current_user
      game.teams.where("id != #{team.id}").each do |team|
        team.unliked_by current_user
      end
      
      render json: game
    else
      render json: {error: "You must be signed in to vote"}
    end
  end
end

class GameChannel < ApplicationCable::Channel
  def subscribed    
    stream_from "game_#{params[:game_id]}"
  end

  def unsubscribed
  end

  def receive(data)
    game = Game.find(data["gameId"])

    if game.status == "waiting" && current_user
      if game.does_not_include_user?(current_user)
        Team.create(game: game, user: current_user)
      end
    end
    
    if data["lobby"]
      game = Game.find(data["gameId"])
      users = []
      
      game.teams.each do |team|
        users << team.user.username
      end
      ActionCable.server.broadcast("game_#{data["gameId"]}", { users: users})
    elsif game.enough_players?
      if (data["start"] && game.enough_players?)
        game = Game.find(data["gameId"])
        game.status = "in progress"
        game.save
        alert = "Begin Draft!"
      elsif (data["makeSelection"])
        game = Game.player_makes_selection(
          data["selection"], 
          data["gameId"], 
          data["player"]
        )
        username = game.teams[data["player"]].user.username
        selection = Selection.find(data["selection"]).name

        alert = "#{username} selects... #{selection}"
      end
      game_serialized = GameSerializer.new(game).as_json

      broadcast = {game: game_serialized, alert: alert}
      
      ActionCable.server.broadcast("game_#{data["gameId"]}", broadcast)
    end
  end
end

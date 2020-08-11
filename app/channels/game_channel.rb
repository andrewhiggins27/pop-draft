class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_#{params[:game_id]}"
  end

  def unsubscribed

  end

  def receive(data)
    game = Game.find(data["gameId"])
    if game.enough_players? 
      if (data["start"] && game.enough_players?)
        game = Game.find(data["gameId"])
        game.status = "in progress"
        game.save
        alert = "Begin Draft!"
      elsif (data["makeSelection"])
        game = Game.player_makes_selection(data["selection"], data["gameId"], data["player"])
        username = game.teams[data["player"]].user.username
        selection = Selection.find(data["selection"]).name

        alert = "#{username} selects... #{selection}"
      end
      game_serialized = GameSerializer.new(game).as_json

      broadcast = {game: game_serialized, alert: alert}
      
      ActionCable.server.broadcast("game_#{data["gameId"]}", broadcast)
    else
      ActionCable.server.broadcast("game_#{data["gameId"]}", {not_enough_players: true})
    end
  end
end

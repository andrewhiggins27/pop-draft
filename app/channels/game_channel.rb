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
      elsif (data["makeSelection"])
        game = Game.player_makes_selection(data["selection"], data["gameId"], data["player"])
      end
  
      game_serialized = GameSerializer.new(game).as_json
      
      ActionCable.server.broadcast("game_#{data["gameId"]}", game_serialized)
    else
      ActionCable.server.broadcast("game_#{data["gameId"]}", {not_enough_players: true})
    end
  end
end

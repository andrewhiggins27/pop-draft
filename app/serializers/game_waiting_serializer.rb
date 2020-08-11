class GameWaitingSerializer < ActiveModel::Serializer
  attributes :id, :round, :current_player, :status

end

class GameWaitingSerializer < ActiveModel::Serializer
  attributes :id, :status, :created, :created_by, :number_of_players, :current_num_of_players

end

class GameSerializer < ActiveModel::Serializer
  attributes :id, :round, :current_player, :status, :number_of_players, :created_by

  has_many :teams
  has_many :selections
  has_one :draft_class
end

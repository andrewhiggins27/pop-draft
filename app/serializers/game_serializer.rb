class GameSerializer < ActiveModel::Serializer
  attributes :id, :round, :current_player

  has_many :teams
  has_many :selections
  has_one :draft_class
end

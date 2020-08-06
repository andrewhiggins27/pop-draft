class GameSerializer < ActiveModel::Serializer
  attributes :id, :round

  has_many :teams
  has_many :selections
  has_one :draft_class
end

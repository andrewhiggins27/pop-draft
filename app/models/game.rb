class Game < ApplicationRecord
  has_one :draft_class
  has_many :teams
  has_many :usergames
  has_many :users, through: :usergames
end
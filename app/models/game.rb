class Game < ApplicationRecord
  has_one :draft_class
  has_many :teams
  has_many :usergames
  has_many :users, through: :usergames
  has_many :gameselections
  has_many :selections, through: :gameselections
end
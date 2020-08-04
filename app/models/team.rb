class Team < ApplicationRecord
  belongs_to :game
  belongs_to :user
  has_many :selections
end
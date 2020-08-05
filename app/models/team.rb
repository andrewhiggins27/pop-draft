class Team < ApplicationRecord
  belongs_to :game
  belongs_to :user, optional: true
  has_many :selections
end
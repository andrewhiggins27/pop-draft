class Team < ApplicationRecord
  belongs_to :game
  belongs_to :user, optional: true

  has_many :teamselections
  has_many :selections, through: :teamselections
end
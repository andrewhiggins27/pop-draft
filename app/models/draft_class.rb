class DraftClass < ApplicationRecord
  belongs_to :pool
  belongs_to :game
  has_many :selections
end
class Pool < ApplicationRecord
  has_many :selections
  has_many :draft_classes
  has_many :games, through: :draft_classes
end
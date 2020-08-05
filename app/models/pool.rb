class Pool < ApplicationRecord
  has_many :selections
  has_many :draft_classes
end
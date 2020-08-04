class Selection < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true

  belongs_to :pool
  belongs_to :team, optional: true
end
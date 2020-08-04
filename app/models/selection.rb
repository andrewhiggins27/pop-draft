class Selection < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true

  belongs_to :pool
  belongs_to :team, optional: true
  belongs_to :draft_class, optional: true
end
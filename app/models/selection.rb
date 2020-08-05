class Selection < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true

  belongs_to :pool
  belongs_to :draft_class, optional: true

  has_many :teamselections
  has_many :teams, through: :teamselections
  has_many :gameselections
  has_many :games, through: :gameselections
end
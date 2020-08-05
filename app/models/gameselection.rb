class Gameselection < ApplicationRecord
  belongs_to :game, optional: true
  belongs_to :selection, optional: true
end
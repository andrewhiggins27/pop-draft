class Teamselection < ApplicationRecord
  belongs_to :team, optional: true
  belongs_to :selection, optional: true
end
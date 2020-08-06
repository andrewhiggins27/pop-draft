class User < ApplicationRecord
  acts_as_voter

  has_many :usergames
  has_many :games, through: :usergames
  has_many :teams
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end

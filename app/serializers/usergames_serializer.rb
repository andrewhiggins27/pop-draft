class UsergamesSerializer < ActiveModel::Serializer
  attributes :id, :status, :created, :created_by, :number_of_players, :pool_name, :players

  def pool_name
    self.object.pool.name
  end

  def players
    players = []
    self.object.users.each do |user|
      players << user.username
    end
    players
  end
end

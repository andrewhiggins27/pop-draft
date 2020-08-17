class UsergamesSerializer < ActiveModel::Serializer
  attributes :id, :status, :created, :created_by, :number_of_players, :pool_name

  def pool_name
    self.object.pool.name
  end
end

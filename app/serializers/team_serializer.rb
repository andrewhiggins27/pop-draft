class TeamSerializer < ActiveModel::Serializer
  attributes :id, :selections, :user, :votes

  def votes
    self.object.votes_for.size
  end
end

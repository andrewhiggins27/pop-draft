class GameWaitingSerializer < ActiveModel::Serializer
  attributes :id, :round, :current_player, :status, :created

  def created
    self.created_at.strftime("%b %e, %l:%M %p")
  end

end

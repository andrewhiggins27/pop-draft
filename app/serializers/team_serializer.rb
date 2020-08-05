class TeamSerializer < ActiveModel::Serializer
  attributes :id, :selections, :user
end

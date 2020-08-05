class DraftClassSerializer < ActiveModel::Serializer
  attributes :id, :selections, :pool, :game

end

class PoolSerializer < ActiveModel::Serializer
  attributes :id, :name, :sample_image

  def sample_image
    pool = Pool.find(self.object.id)
    sample = pool.selections.sample
    sample.image
  end
end

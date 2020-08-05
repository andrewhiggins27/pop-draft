require 'rails_helper'

RSpec.describe DraftClass, type: :model do
  it { should belong_to(:pool) }
  it { should belong_to(:game) }
end
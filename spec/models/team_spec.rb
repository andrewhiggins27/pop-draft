require 'rails_helper'

RSpec.describe Team, type: :model do
  it { should belong_to(:game) }
end
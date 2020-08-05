require 'rails_helper'

RSpec.describe Selection, type: :model do
  it { should have_valid(:name).when("selection")}
  it { should_not have_valid(:name).when(nil, "")}

  it { should have_valid(:description).when("description")}
  it { should_not have_valid(:description).when(nil, "")}

  it { should have_valid(:image).when("image")}
  it { should_not have_valid(:image).when(nil, "")}

  it { should belong_to(:pool) }
end
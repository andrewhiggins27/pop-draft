require 'rails_helper'

RSpec.describe Api::V1::PoolsController, type: :controller do
  describe "GET#Show" do
    let!(:pool1) {Pool.create(name:"test pool")}
    let!(:selection1) {Selection.create(name:"selection", description: "description", image: "image.png", pool: pool1)}
    let!(:selection2) {Selection.create(name:"selection2", description: "description2", image: "image2.png", pool: pool1)}
    let!(:selection3) {Selection.create(name:"selection3", description: "description3", image: "image3.png", pool: pool1)}

    it "return a status of 200" do
      get :show, params: {id: pool1.id}
      
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "initializes a new game" do
      get :show, params: {id: pool1.id}

      expect(Game.all.count).to eq(1)
    end

    it "creates teams associated with the newly created game" do
      get :show, params: {id: pool1.id}

      expect(Game.last.teams.count).to eq(2)
    end

    it "returns a draft class object" do
      get :show, params: {id: pool1.id}

      returned_json = JSON.parse(response.body)

      expect(returned_json.length).to eq(1)
      expect(returned_json["draft_class"]["selections"].count).to eq(3)
      expect(returned_json["draft_class"]["pool"]["name"]).to eq(pool1.name)
      expect(returned_json["draft_class"]["game"].count).to eq(3)
    end
  end
end

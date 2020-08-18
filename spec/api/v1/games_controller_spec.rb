require 'rails_helper'

RSpec.describe Api::V1::GamesController, type: :controller do
  let!(:pool1) {Pool.create(name:"test pool")}
  let!(:game1) {Game.create(round: "complete", status: "complete", pool: pool1)}
  let!(:game2) {Game.create(round: "complete", status: "complete", pool: pool1)}
  let!(:team1) {Team.create(game: game1)}
  let!(:team2) {Team.create(game: game1)}
  let!(:selection1) {Selection.create(name:"selection", description: "description", image: "image.png", pool: pool1)}
  let!(:selection2) {Selection.create(name:"selection2", description: "description2", image: "image2.png", pool: pool1)}
  let!(:selection3) {Selection.create(name:"selection3", description: "description3", image: "image3.png", pool: pool1)}

  describe "GET#Index" do
    it "returns a status of 200" do
      user = FactoryBot.create(:user)
      get :index, params: {user_id: user.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end
    it "returns completed games associated with the user" do
      user = FactoryBot.create(:user)
      game1.users << user
      game2.users << user

      get :index, params: {user_id: user.id}
      returned_json = JSON.parse(response.body)

      expect(returned_json["games"].length).to eq(2)
    end
  end

  describe "POST#Create" do
    it "return a status of 200" do
      post :create, params: { gameId: game1.id }
      
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end
    it "returns a random completed game, that is not the current game" do
      post :create, params: { gameId: game1.id }

      returned_json = JSON.parse(response.body)

      expect(returned_json["game"]["id"]).to eq(game2.id)
      expect(returned_json["game"]["round"]).to eq "complete"
    end
  end
  describe "GET#Show" do
    it "return a status of 200" do
      get :show, params: { id: game1.id }
      
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end
    it "returns json for the specified game" do
      get :show, params: { id: game1.id }

      returned_json = JSON.parse(response.body)

      expect(returned_json["game"]["id"]).to eq(game1.id)
    end
    it "returns json with error message if no game is found" do
      get :show, params: { id: 0 }

      returned_json = JSON.parse(response.body)

      expect(returned_json["conn_error"]).to eq("Game not found.")
    end
  end
  describe "PATCH#Update" do  
    it "return a status of 200" do
      patch :update, params: { selection: selection1.id, id: game1.id, player: 0 }
      
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "destroys the selection association for the game (for the selectionID sent to the endpoint)" do
      game1.selections << [selection1, selection2, selection3]
      prev_count = game1.selections.count
      patch :update, params: { selection: selection1.id, id: game1.id, player: 0 }

      returned_json = JSON.parse(response.body)

      expect(returned_json["game"]["selections"].count).not_to eq(prev_count)
    end

    it "adds the selection to the player's team" do
      game1.selections << [selection1, selection2, selection3]
      prev_count = game1.teams[0].selections.count
      patch :update, params: { selection: selection1.id, id: game1.id, player: 0 }

      returned_json = JSON.parse(response.body)

      expect(returned_json["game"]["teams"][0]["selections"].count).to eq(prev_count + 1)
    end
  end
end
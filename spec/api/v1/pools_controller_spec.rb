require 'rails_helper'

RSpec.describe Api::V1::PoolsController, type: :controller do
  let!(:pool1) {Pool.create(name:"test pool")}
  let!(:pool2) {Pool.create(name:"test pool2")}
  let!(:pool3) {Pool.create(name:"test pool3")}
  let!(:selection1) {Selection.create(name:"selection", description: "description", image: "image.png", pool: pool1)}
  let!(:selection2) {Selection.create(name:"selection2", description: "description2", image: "image2.png", pool: pool1)}
  let!(:selection3) {Selection.create(name:"selection3", description: "description3", image: "image3.png", pool: pool1)}
  let!(:selection4) {Selection.create(name:"selection4", description: "description4", image: "image4.png", pool: pool2)}
  let!(:selection5) {Selection.create(name:"selection5", description: "description5", image: "image5.png", pool: pool3)}

  describe "GET#Index" do
    it "return a status of 200" do
      get :index
      
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns a json of all of the pools" do
      get :index

      returned_json = JSON.parse(response.body)

      expect(returned_json["pools"].count).to eq(3)
    end
  end

  describe "GET#Show" do
    it "returns a status of 200" do
      get :show, params: {id: pool1.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns the specific pool based on ID" do
      get :show, params: {id: pool1.id}
      returned_json = JSON.parse(response.body)

      expect(returned_json["pool"]["id"]).to eq(pool1.id)
    end
  end

  describe "POST#start_game" do
    it "return a status of 200" do
      post :start_game, params: {id: pool1.id, numberOfPlayers: "2"}
      
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "initializes a new game" do
      post :start_game, params: {id: pool1.id, numberOfPlayers: "2"}

      expect(Game.all.count).to eq(1)
    end

    it "creates teams associated with the newly created game" do
      post :start_game, params: {id: pool1.id, numberOfPlayers: "2"}

      expect(Game.last.teams.count).to eq(2)
    end

    it "returns a game object" do
      post :start_game, params: {id: pool1.id, numberOfPlayers: "2"}
      returned_json = JSON.parse(response.body)

      expect(returned_json.length).to eq(1)
      expect(returned_json["game"]["teams"].count).to eq(2)
      expect(returned_json["game"]["selections"].count).to eq(3)
      expect(returned_json["game"]["draft_class"]["selections"].count).to eq(3)
      expect(returned_json["game"]["round"]).to eq("1")
      expect(returned_json["game"]["current_player"]).to eq(0)
    end
  end

  describe "POST#start_online_game" do
    it "if user is not signed it, returns json with an error message" do
      post :start_online_game, params: {id: pool1.id, numberOfPlayers: "2"}
      returned_json = JSON.parse(response.body)

      expect(returned_json["error"]).to eq("You must be signed in to play online")
    end
    it "if user is signed in, creates a new game with a status of waiting, and returns the newly created game" do
      user = FactoryBot.create(:user)
      sign_in user

      post :start_online_game, params: {id: pool1.id, numberOfPlayers: "2"}
      returned_json = JSON.parse(response.body)

      expect(returned_json.length).to eq(1)
      expect(returned_json["game"]["created_by"]).to eq(user.username)
      expect(returned_json["game"]["status"]).to eq("waiting")
      expect(returned_json["game"]["teams"].count).to eq(1)
      expect(returned_json["game"]["selections"].count).to eq(3)
      expect(returned_json["game"]["draft_class"]["selections"].count).to eq(3)
      expect(returned_json["game"]["round"]).to eq("1")
      expect(returned_json["game"]["current_player"]).to eq(0)
    end
  end

  describe "GET#waiting_games" do
    it "should return json with error message if user is not signed in" do
      get :waiting_games, params: {id: pool1.id}
      returned_json = JSON.parse(response.body)

      expect(returned_json["error"]).to eq("You must be signed in to play online")
    end
    it "should return json of online games with a status of waiting" do
      user = FactoryBot.create(:user)
      user2 = FactoryBot.create(:user)
      sign_in user

      game = Game.online_start(pool1.id, "2", user2)
      game2 = Game.online_start(pool2.id, "2", user2)

      get :waiting_games, params: {id: pool1.id}
      returned_json = JSON.parse(response.body)

      expect(returned_json["games"].length).to eq(1)
      expect(returned_json["games"].first["created_by"]).to eq(user2.username)      
      expect(returned_json["games"].first["id"]).not_to eq(game2.id)      
    end
  end
end

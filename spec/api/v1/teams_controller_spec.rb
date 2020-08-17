require 'rails_helper'

RSpec.describe Api::V1::TeamsController, type: :controller do
  let!(:pool1) {Pool.create(name:"test pool")}
  let!(:selection1) {Selection.create(name:"selection", description: "description", image: "image.png", pool: pool1)}
  let!(:selection2) {Selection.create(name:"selection2", description: "description2", image: "image2.png", pool: pool1)}
  let!(:selection3) {Selection.create(name:"selection3", description: "description3", image: "image3.png", pool: pool1)}
  let!(:team1) {Team.create(selections: [selection1, selection2])}
  let!(:team2) {Team.create(selections: [selection3])}
  let!(:game1) {Game.create(teams: [team1, team2])}

  describe "PATCH#Update" do
    it "if not signed in should return error" do
      patch :update, params: {id: team1.id, gameId: game1.id }
      returned_json = JSON.parse(response.body)

      expect(returned_json["error"]).to eq("You must be signed in to vote.")
    end
    it "should add one vote to the team" do
      user = FactoryBot.create(:user)
      sign_in user

      patch :update, params: {id: team1.id, gameId: game1.id }
      returned_json = JSON.parse(response.body)

      expect(returned_json["game"]["teams"].first["votes"]).to eq(1)
    end
    it "should remove votes from other teams associated with the game" do
      user = FactoryBot.create(:user)
      sign_in user

      patch :update, params: {id: team1.id, gameId: game1.id }
      patch :update, params: {id: team2.id, gameId: game1.id }
      returned_json = JSON.parse(response.body)

      expect(returned_json["game"]["teams"].first["votes"]).to eq(0)
      expect(returned_json["game"]["teams"].last["votes"]).to eq(1)
    end
    it "should return error if user submits vote for a team they already voted for" do
      user = FactoryBot.create(:user)
      sign_in user

      patch :update, params: {id: team1.id, gameId: game1.id }
      patch :update, params: {id: team1.id, gameId: game1.id }
      returned_json = JSON.parse(response.body)

      expect(returned_json["error"]).to eq("Only one vote per user!")
    end
  end
end

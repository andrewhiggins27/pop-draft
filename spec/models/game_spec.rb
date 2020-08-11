RSpec.describe Team, type: :model do
  describe "#does_not_include_user?" do
    it "should return false if the user is associated with the game" do
      user = FactoryBot.create(:user)
      game = Game.create()
      team = Team.create(game: game, user: user)

      expect(game.does_not_include_user?(user)).to eq(false)
    end
    it "should return true if the user is NOT associated with the game" do
      user = FactoryBot.create(:user)
      user2 = FactoryBot.create(:user)
      game = Game.create()
      team = Team.create(game: game, user: user)

      expect(game.does_not_include_user?(user2)).to eq(true)
    end
  end
end
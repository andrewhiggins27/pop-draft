class GameStart 
  def self.begin_game (pool_id)
    binding.pry
    pool = Pool.find(params["id"])
    game = Game.create
    selections = pool.selections.sample(20)
    game.selections = selections
    Team.create(game: game)
    Team.create(game: game)
    draft_class = DraftClass.create(
      pool: pool, 
      game: game, 
      selections: selections
    )
  end
end
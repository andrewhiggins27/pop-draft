class GameStart
  def begin_game (pool_id)
    binding.pry
    pool = Pool.find(pool_id)
    game = Game.create
    selections = pool.selections.sample(20)
    game.selections = selections
    draft_class = DraftClass.create(
      pool: pool, 
      game: game, 
      selections: selections
    )
  end
end
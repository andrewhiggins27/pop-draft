class CreateGameselections < ActiveRecord::Migration[5.2]
  def change
    create_table :gameselections do |t|
      t.belongs_to :game
      t.belongs_to :selection

      t.timestamps null: false
    end
  end
end

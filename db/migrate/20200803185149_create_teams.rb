class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :name
      t.belongs_to :game
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end

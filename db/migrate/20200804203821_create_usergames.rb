class CreateUsergames < ActiveRecord::Migration[5.2]
  def change
    create_table :usergames do |t|
      t.belongs_to :user
      t.belongs_to :game

      t.timestamps null: false
    end
  end
end

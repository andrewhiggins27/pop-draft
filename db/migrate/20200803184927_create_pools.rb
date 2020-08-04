class CreatePools < ActiveRecord::Migration[5.2]
  def change
    create_table :pools do |t|
      t.string :name, null: false

      t.timestamps null: false
    end
  end
end

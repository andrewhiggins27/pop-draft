class CreateSelections < ActiveRecord::Migration[5.2]
  def change
    create_table :selections do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.string :image, null: false
      t.belongs_to :pool
      t.belongs_to :team

      t.timestamps null: false
    end
  end
end

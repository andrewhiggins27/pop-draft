class CreateSelections < ActiveRecord::Migration[5.2]
  def change
    create_table :selections do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.string :image, null: false
      t.belongs_to :pool
      t.belongs_to :team
      t.belongs_to :draft_class

      t.timestamps null: false
    end
  end
end

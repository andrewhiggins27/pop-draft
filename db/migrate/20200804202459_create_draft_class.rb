class CreateDraftClass < ActiveRecord::Migration[5.2]
  def change
    create_table :draft_classes do |t|
      t.belongs_to :pool
      t.belongs_to :game

      t.timestamps null: false
    end
  end
end

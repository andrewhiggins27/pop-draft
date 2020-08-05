class CreateTeamselections < ActiveRecord::Migration[5.2]
  def change
    create_table :teamselections do |t|
      t.belongs_to :team
      t.belongs_to :selection

      t.timestamps null: false
    end
  end
end

class AddColumnsToGame < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :number_of_players, :integer, default: 2
    add_column :games, :status, :string, default: "in progress"
    add_column :games, :created_by, :string
  end
end

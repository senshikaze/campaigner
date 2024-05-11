class CreateBattleEntities < ActiveRecord::Migration[7.1]
  def change
    create_table :battle_entities do |t|
      t.integer :user_id
      t.integer :battle_id
      t.string :name
      t.integer :total_health
      t.integer :current_health
      t.string :description
      t.string :notes
      t.integer :initiative

      t.timestamps
    end
  end
end

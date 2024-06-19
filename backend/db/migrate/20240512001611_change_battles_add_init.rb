class ChangeBattlesAddInit < ActiveRecord::Migration[7.1]
    def change
      add_column :battles, :current_entity_id, :integer, :default => nil
    end
  end
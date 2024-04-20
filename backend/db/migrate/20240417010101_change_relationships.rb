class ChangeRelationships < ActiveRecord::Migration[7.1]
    def change
      rename_column :campaigns, :user, :user_id
      rename_column :sections, :user, :user_id
      rename_column :campaign_entries, :user, :user_id

      rename_column :sections, :campaign, :campaign_id
      rename_column :campaign_entries, :section, :section_id
    end
  end
  
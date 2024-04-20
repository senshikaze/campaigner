class CreateCampaignEntries < ActiveRecord::Migration[7.1]
  def change
    create_table :campaign_entries do |t|
      t.integer :section
      t.string :title
      t.string :text
      t.integer :user

      t.timestamps
    end
  end
end

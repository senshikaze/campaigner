class CreateCampaigns < ActiveRecord::Migration[7.1]
  def change
    create_table :campaigns do |t|
      t.string :name
      t.string :description
      t.integer :user

      t.timestamps
    end
  end
end

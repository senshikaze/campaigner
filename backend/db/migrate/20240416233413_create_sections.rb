class CreateSections < ActiveRecord::Migration[7.1]
  def change
    create_table :sections do |t|
      t.integer :campaign
      t.string :name
      t.integer :user

      t.timestamps
    end
  end
end

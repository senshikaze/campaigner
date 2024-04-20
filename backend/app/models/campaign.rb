class Campaign < ApplicationRecord
    belongs_to :user
    has_many :sections
    has_many :campaign_entries, through: :sections
end

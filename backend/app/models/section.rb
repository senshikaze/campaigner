class Section < ApplicationRecord
    belongs_to :user
    belongs_to :campaign
    has_many :campaign_entries
end

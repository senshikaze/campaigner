class Battle < ApplicationRecord
    belongs_to :user
    has_many :entities, foreign_key: 'battle_id', class_name: :BattleEntity
end

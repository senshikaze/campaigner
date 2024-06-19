export interface BattleEntity {
    id?: number;
    battle_id: number;
    name: string;
    initiative: number;
    total_health: number;
    current_health: number;
    description: string;
    notes: string;
}
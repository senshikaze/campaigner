export enum EntityType {
    PLAYER=1,
    NPC=2,
    MONSTER=3,
    WEAPON=4,
    ARMOR=5,
    ITEM=6,
}

export function hasStats(entity: EntityType): boolean {
    return [EntityType.NPC, EntityType.PLAYER, EntityType.MONSTER].includes(entity);
}
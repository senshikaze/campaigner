import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BattleEntity } from "src/app/interfaces/battle-entity";

@Injectable({
    providedIn: "root",
})
export class BattleEntitySelectedService {
    entity$ = new Subject<BattleEntity>();

    getEntity(): Observable<BattleEntity> {
        return this.entity$.asObservable();
    }

    entitySelected(entity: BattleEntity): void {
        this.entity$.next(entity);
    }
}
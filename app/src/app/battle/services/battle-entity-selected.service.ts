import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Entity } from "src/app/interfaces/entity";

@Injectable({
    providedIn: "root",
})
export class BattleEntitySelectedService {
    entity$ = new Subject<Entity>();

    getEntity(): Observable<Entity> {
        return this.entity$.asObservable();
    }

    entitySelected(entity: Entity): void {
        this.entity$.next(entity);
    }
}
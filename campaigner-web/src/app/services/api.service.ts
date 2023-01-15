import { Injectable, isDevMode } from '@angular/core';
import { from, map, Observable, of, reduce } from 'rxjs';
import { Entry } from '../interfaces/entry';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getEntries(): Observable<Entry[]> {
    let entries = localStorage.getItem('entries') ?? "[]";
    return from(of(entries)).pipe(
      map(entries => JSON.parse(entries) as Entry[])
    );
  }

  saveEntry(entry: Entry): Observable<Entry> {
    let entries = JSON.parse(localStorage.getItem('entries') ?? "[]") as Entry[];
    let ids = entries.map(e => e.id ?? 0) ?? [];
    ids.sort((a, b) => b - a);
    if (!entry.id) {
      entry.id = ids[0] + 1;
      entries.push(entry);
    } else {
      entries = entries.filter(e => e.id != entry.id);
      entries.push()
    }

    localStorage.setItem("entries", JSON.stringify(entries));

    return from(of(entry)).pipe(
      map(entry => entry)
    )
  }
}

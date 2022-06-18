import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IAgendar } from "../domain/agendar";

@Injectable({
  providedIn: "root",
})
export class AgendarService {
  private url = `${environment.api}`;

  constructor(private http: HttpClient) {}

  public add(country: IAgendar): Observable<IAgendar> {
    return this.http.post<IAgendar>(`${this.url}/marcacao/save`, country);
  }

  public delete(info:string): Observable<any>  {
    return this.http.delete(`${this.url}/marcacao/deleteInfo/${info}`);
  }

  public getAll() {
    return this.http.get<IAgendar[]>(`${this.url}/marcacao`);
  }

  public findByDate(date : string){
    return this.http.get<IAgendar[]>(`${this.url}/marcacao/byDate/${date}`);
  }
}

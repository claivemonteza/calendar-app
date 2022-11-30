import { HttpClient, HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAgendaResponse } from "src/app/domain/agenda-response";
import { environment } from "src/environments/environment";
import { IAgendar } from "../../domain/agendar";

@Injectable({
  providedIn: "root",
})
export class AgendarService {
  private url = `${environment.api}`;

  constructor(private http: HttpClient) {}

  public add(agendar: any): Observable<IAgendar> {
    return this.http.post<IAgendar>(`${this.url}/marcacao/save`, agendar);
  }

  public update(agendar: any): Observable<IAgendar> {
    return this.http.put<IAgendar>(`${this.url}/marcacao/update`, agendar);
  }

  public delete(date:string, info:string): Observable<any>  {
    const params = new HttpParams({fromObject: {'information':info}}); 
    const options = {params};
    return this.http.delete(`${this.url}/marcacao/deleteInfo/${date}`,options);
  }

  public getAll() {
    return this.http.get<IAgendaResponse[]>(`${this.url}/marcacao`);
  }

  public findByDate(date : string){
    return this.http.get<IAgendar[]>(`${this.url}/marcacao/byDate/${date}`);
  }
}



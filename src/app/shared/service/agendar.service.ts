import { keyframes } from "@angular/animations";
import { HttpClient, HttpParams} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IAgendar } from "../../domain/agendar";

@Injectable({
  providedIn: "root",
})
export class AgendarService {
  private url = `${environment.api}`;

  constructor(private http: HttpClient) {}

  public add(country: IAgendar): Observable<IAgendar> {
    return this.http.post<IAgendar>(`${this.url}/marcacao/save`, country);
  }

  public delete(date:string, info:string): Observable<any>  {
    const params = new HttpParams({fromObject: {'information':info}});
    const options = {params};
    return this.http.delete(`${this.url}/marcacao/deleteInfo/${date}`,options);
  }

  public getAll() {
    return this.http.get<IAgendar[]>(`${this.url}/marcacao`);
  }

  public findByDate(date : string){
    return this.http.get<IAgendar[]>(`${this.url}/marcacao/byDate/${date}`);
  }
}



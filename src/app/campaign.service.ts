import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'; 
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CampaignService {
	
  private campaignUrl = 'https://1x8q0ykj94.execute-api.eu-central-1.amazonaws.com/default/campaigns';

  constructor(
      private http: HttpClient,
      private messageService : MessageService) { }

  private log(message : string) {
    this.messageService.add(`CampaignService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }  

  getBanners(id: number): Observable<string[]> {
  	const url = `${this.campaignUrl}/${id}`;
    this.log(url);
    this.log('');
  	return this.http.get<string[]>(url)
      .pipe(
      	tap(_ => this.log('fetched banners')),
      	catchError(this.handleError<string[]>(`getBanners id=${id}`,[]))
    );
  }
}
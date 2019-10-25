import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http:HttpClient) { }

  getQuery(query:string) {

    const url = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCUIbjAr5R7JtgYvcKETC8_PbxGY8Bbjd_pkM6TUN5gK1CvIWu0A2sU8-mI0BEX7dpVLprTopV3wQf0P8o'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
   /*  const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDqlYJwNp4zdkY_9oUNODKZ2OIAQDRLXQuUiMeOtjmb2L_lXZciOcaaJpmw_e5rHCYS0PsXqN2ogYBALmQ'
    }); */
    return this.getQuery('browse/new-releases')
        .pipe( map( data => {
          return data['albums'].items;
        }));
  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino } &type=artist`)
        .pipe( map( data=> {
          return data['artists'].items;
        }));
  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);
        // .pipe( map( data=> data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
    .pipe( map( data=> data['tracks']));
  }
}

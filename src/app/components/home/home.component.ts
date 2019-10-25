import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  paises: any[] = [];
  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private http:HttpClient, private spotifyService: SpotifyService) {

  this.loading = true;
    /*   console.log('constructor del Home llamado');
    this.http.get('https://restcountries.eu/rest/v2/lang/es')
        .subscribe( (paises:any) =>{
          this.paises = paises;
          console.log(paises);
        }); */
      this.spotifyService.getNewReleases()
          .subscribe( (data: any) => {
            console.log(data);
            this.nuevasCanciones = data;
            this.loading = false;
      }, (err)=> {
        this.loading = false;
        this.error = true;
        this.mensajeError = err.error.error.message;
        console.log(err);
      } );
   }


}

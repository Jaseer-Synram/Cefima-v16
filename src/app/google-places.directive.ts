import { Directive, ElementRef, OnInit } from '@angular/core';

// const google = require('@types/googlemaps')

@Directive({
  selector: '[appGooglePlaces]'
})
export class GooglePlacesDirective {

  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }

  ngOnInit(){
    // const autocomplete = new google.maps.places.Autocomplete(this.element);
  }
}

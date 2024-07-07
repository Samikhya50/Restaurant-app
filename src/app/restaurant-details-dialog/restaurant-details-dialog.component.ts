import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Restaurant } from '../restaurant.model';

@Component({
  selector: 'app-restaurant-details-dialog',
  templateUrl: './restaurant-details-dialog.component.html',
  styleUrls: ['./restaurant-details-dialog.component.css']
})
export class RestaurantDetailsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Restaurant
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}

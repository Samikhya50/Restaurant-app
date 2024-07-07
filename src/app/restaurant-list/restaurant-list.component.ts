import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant.model';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantDetailsDialogComponent } from '../restaurant-details-dialog/restaurant-details-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
})
export class RestaurantListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'location',
    'rating',
    'contact',
    'cuisine',
    'timings',
    'actions',
  ];
  restaurants: Restaurant[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource<Restaurant>();
  }
  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((data) => {
      this.restaurants = data;
      this.dataSource = new MatTableDataSource(this.restaurants);
    });
  }

  addNewRestaurant() {
    this.router.navigate(['/add-restaurant-form']);
  }
  openDialog(restaurant?: Restaurant) : void {
    const dialogRef = this.dialog.open(RestaurantDetailsDialogComponent, {
      width:'500px',
      data: restaurant
    });
  }
  editRestaurant(id: any) {
    console.log(id);
    this.router.navigate(['/restaurants/edit',id]);
  }
  deleteRestaurant(id: any) {
    console.log(id)
    if (confirm("Are you sure you want to delete the restaurant details")) 
    {
      this.restaurantService.deleteRestaurant(id).subscribe(()=> {
        this.snackBar.open('Restaurant Details Deleted Successfully','Close',{
          duration:2000,
          horizontalPosition: 'right'
        });
        this.restaurantService.getRestaurants().subscribe((data) => {
          this.restaurants = data;
          this.dataSource = new MatTableDataSource(this.restaurants);
        });
      });
    }
  }
}

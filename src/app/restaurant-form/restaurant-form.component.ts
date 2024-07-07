import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../restaurant.model';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css'],
})
export class RestaurantFormComponent implements OnInit {
  public restaurantForm!: FormGroup;
  restaurantId!: any;
  isEditMode = false;
  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      cuisine: ['', Validators.required],
      rating: ['', Validators.required],
      contactNumber: ['', [Validators.required,Validators.pattern("[6789][0-9]*")]],
      fullAddress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      timings: ['', Validators.required],
      type: ['', Validators.required],
      deliveryCharges: ['', Validators.required],
      menu: this.fb.array([]),
      reviews: this.fb.array([]),
    });
    if (this.restaurantId) {
      this.isEditMode = true;
      this.restaurantService
        .getRestaurantById(this.restaurantId)
        .subscribe((restaurant: Restaurant) => {
          this.restaurantForm.patchValue(restaurant);
          this.setReview(restaurant.reviews);
          this.setMenu(restaurant.menu);
        });
    }
  }

  setReview(reviews: any): void {
    //this.menu.clear();
    reviews?.forEach((item: any) =>
      (this.restaurantForm.get('reviews') as FormArray).push(
        this.fb.group(item)
      )
    );
  }

  setMenu(menu: any): void {
    //this.menu.clear();
    menu?.forEach((item: any) =>
      (this.restaurantForm.get('menu') as FormArray).push(this.fb.group(item))
    );
  }

  get menuControls() {
    return (this.restaurantForm.get('menu') as FormArray).controls;
  }

  get reviewControls() {
    return (this.restaurantForm.get('reviews') as FormArray).controls;
  }

  addMenuItem() {
    (this.restaurantForm.get('menu') as FormArray).push(
      this.fb.group({
        menuItem: ['', Validators.required],
      })
    );
  }

  removeMenuItem(index: number) {
    (this.restaurantForm.get('menu') as FormArray).removeAt(index);
  }

  addReview() {
    (this.restaurantForm.get('reviews') as FormArray).push(
      this.fb.group({
        customer: ['', Validators.required],
        review: ['', Validators.required],
      })
    );
  }

  removeReview(index: number) {
    (this.restaurantForm.get('reviews') as FormArray).removeAt(index);
  }

  onSubmit() {
    if (this.restaurantForm.valid) {
      if (this.isEditMode) {
        this.restaurantService
          .updateRestaurant(this.restaurantId, this.restaurantForm.value)
          .subscribe(() => {
            this.snackBar.open('Restaurant Data Updated Successfully','Close',{
              duration:2000,
              horizontalPosition: 'right'
            });
            this.router.navigate(['/restaurants']);
          });
      } else {
        this.restaurantService
          .addRestaurant(this.restaurantForm.value)
          .subscribe(() => {
            this.snackBar.open('Restaurant Data Added Successfully','Close',{
              duration:2000,
              horizontalPosition: 'right'
            });
            this.router.navigate(['/restaurants']);
          });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/restaurants']);
  }

  isNumberKey(evt:any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode >= 48 && charCode <= 57)
      return true;

    return false;
  }
}

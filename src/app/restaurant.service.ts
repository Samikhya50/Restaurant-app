import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from './restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`)
  }

  getRestaurantById(id: string) {
    return this.http.get<Restaurant>(`${this.apiUrl}/restaurants/` + id)
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.apiUrl}/restaurants`, restaurant);
  }

  updateRestaurant(id: string, restaurant: Restaurant) {
    return this.http.put<Restaurant>(`${this.apiUrl}/restaurants/` + id, restaurant)
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/restaurants/${id}`);
  }
}

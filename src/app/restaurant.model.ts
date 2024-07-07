export interface Restaurant {
    id?: string;
    name: string;
    location: string;
    fullAddress?: string;
    cuisine: string;
    description: string;
    rating: number;
    contactNumber: string;
    timings?: any;
    email: string;
    reviews?: { customer:string, review:string}[];
    menu?: string[];
    deliveryCharges?: string;
    type?: string;
}
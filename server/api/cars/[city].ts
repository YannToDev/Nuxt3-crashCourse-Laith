// correspond à la route /api/car/[city]

import cars from "@/data/carsData.json";
import { Listings, Listing, Cars } from "@/types/carsType";


export default defineEventHandler((event) => {

    const { city } = event.context.params;
    const{ make, minPrice, maxPrice } = getQuery(event);

    let filteredCars = cars;

    filteredCars= filteredCars.filter(car => car.city.toLocaleLowerCase() === city.toLocaleLowerCase());

    if(make){

        filteredCars = filteredCars.filter(car => car.make.toLowerCase() === (make as string).toLowerCase());
    };

     if(minPrice){

        filteredCars = filteredCars.filter(car => car.price >= parseInt(minPrice as string))
    };

    if(maxPrice){

         filteredCars = filteredCars.filter(car => car.price <= parseInt(maxPrice as string))
    }
 
    return filteredCars;
})
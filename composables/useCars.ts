import cars from '~~/data/carsData.json';
import makes from '~/data/makes.json';
import listings from '~/data/listings.json'
import { Cars, Makes, Listings } from '~~/types/carsType'


export const useCars = ():(Cars & Makes & Listings) => {

    return { cars, makes, listings }  
}
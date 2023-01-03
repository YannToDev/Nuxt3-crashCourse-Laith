import cars from '~~/data/carsData.json';
import makes from '~/data/makes.json';
import { Cars, Makes } from '~~/types/carsType'

export const useCars = ():(Cars & Makes) => {

    return { cars, makes }
}
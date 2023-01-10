export type Car = {

    id: number
    name: string,
    price:string,
    url: string,
    seats: string
    miles: string,
    features:[],
    description: string
}

export type Cars ={

    cars:Car[]
}

export type Makes = {
    makes:string[];
}

export type Listing = {

    id: string,
    name: string,
    make: string,
    model: string,
    price: string,
    year: number,
    city: string,
    url: string
    seats: number,
    miles: string,
    features: string,
    description: string
}

export type Listings= {
    listings:Listing[]
}
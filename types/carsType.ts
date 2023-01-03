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

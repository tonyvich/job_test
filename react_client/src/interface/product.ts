export default interface Product {
    _id?:           number,
    name:           string,
    type:           string,
    price:          number,
    rating:         number,
    warranty_years: number,
    available:      Boolean
}

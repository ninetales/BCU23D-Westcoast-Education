export interface User {
    id: number,
    role: string,
    fname: string,
    lname: string,
    email: string,
    password: string,
    phone: string,
    address: {
        city: string,
        postalCode: string,
        street: string
    },
    accountState: {
        status: string,
        date: string
    }

}
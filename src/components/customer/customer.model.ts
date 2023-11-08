
export interface ICustomerInput {

    name: string;
    phone: string;
    address: string;
}

export interface ICustomer extends ICustomerInput {
    id: string;
}

import axios from "axios";
import { ICustomer, ICustomerInput } from "../components/customer/customer.model";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const api_getCustomersData = createAsyncThunk(
    'customers/getCustomers', async () => {
        try {
            const response = await axios.get("http://192.168.100.229:4000/api/customers");
            return response.data;
        } catch (error) {
            console.error('Error fetching Data: ', error);
            return null;
        }
    });


export const api_CreateNewCustomer = createAsyncThunk(
    'customer/createCustomer', async (customerData: ICustomerInput) => {
        try {
            const response = await axios({
                method: 'POST',
                url: `http://192.168.100.229:4000/api/customer`,
                data: customerData,
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });

export const api_searchCustomerByName = createAsyncThunk(
    'customer/searchCustomer', async (cusName: string) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `http://192.168.100.229:4000/api/customer/s/${cusName}`
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });


export async function api_updateCustomer(cusData: ICustomer | null) {
    if (cusData !== null) {
        try {
            const response = await axios({
                method: 'PUT',
                url: `http://192.168.100.229:4000/api/customer/${cusData.id}`,
                data: cusData
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}
export async function api_deleteCustomer(cusId: string) {
    try {
        const response = await axios({
            method: 'DELETE',
            url: `http://192.168.100.229:4000/api/customer/${cusId}`,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}



import axios from "axios";
import { ICustomer, ICustomerInput } from "../components/customer/customer.model";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITV_RDX_ACTIONS } from "../redux/actions";
import { envLoader } from "../utils/envloader";


export const api_getCustomersData = createAsyncThunk(
    ITV_RDX_ACTIONS.GET_ALL_CUSTOMERS, async (reqParams: { take: number, skip: number }) => {
        try {
            const response = await axios.get(`${envLoader.baseURL}/customers/${reqParams.take}/${reqParams.skip}`);

            return response.data;
        } catch (error) {
            console.error('Error fetching Data: ', error);
            return null;
        }
    });


export const api_CreateNewCustomer = createAsyncThunk(
    ITV_RDX_ACTIONS.CREATE_CUSTOMER, async (customerData: ICustomerInput) => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${envLoader.baseURL}/customer`,
                data: customerData,
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });

export const api_searchCustomerByName = createAsyncThunk(
    ITV_RDX_ACTIONS.SEARCH_CUSTOMER_NAME, async (cusName: string) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${envLoader.baseURL}/customer/s/${cusName}`
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });

export const api_searchCustomerByPhone = createAsyncThunk(
    ITV_RDX_ACTIONS.SEARCH_CUSTOMER_PHONE, async (phone: string) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${envLoader.baseURL}/customer/s/p/${phone}`
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
                url: `${envLoader.baseURL}/customer/${cusData.id}`,
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
            url: `${envLoader.baseURL}/customer/${cusId}`,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}



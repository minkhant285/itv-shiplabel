import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICustomer } from '../../components/customer/customer.model';
import { api_CreateNewCustomer, api_deleteCustomer, api_getCustomersData, api_searchCustomerByName } from '../../apis/customer.api';

const initialState: {
    loading: boolean;
    error: string | null;
    customers: ICustomer[] | [];
} = {
    loading: false,
    error: null,
    customers: []
};

export const customerSlice = createSlice({
    name: 'customer-slicer',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(api_getCustomersData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(api_getCustomersData.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload.data;
            }).addCase(api_getCustomersData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occured';
            })
            .addCase(api_CreateNewCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(api_CreateNewCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = [...state.customers, action.payload.data]
            }).addCase(api_CreateNewCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occured';
            })
            .addCase(api_searchCustomerByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(api_searchCustomerByName.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload.data
            }).addCase(api_searchCustomerByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occured';
            })
    },
    reducers: {
        removeCustomer: (state, action: PayloadAction<string>) => {
            state.customers = state.customers.filter((cus: any) => cus.id !== action.payload);
            api_deleteCustomer(action.payload);
            return state;
        },
        editCustomer: (state, action: PayloadAction<ICustomer>) => {
            let repIndex: number = state.customers.findIndex((val) => val.id === action.payload.id);
            state.customers[repIndex] = action.payload
            return state;
        },
    },
})

// Action creators are generated for each case reducer function
export const { removeCustomer, editCustomer } = customerSlice.actions

export default customerSlice.reducer

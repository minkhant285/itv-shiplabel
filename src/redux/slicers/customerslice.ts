import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { ICustomer } from '../../components/customer/customer.model';
import { api_CreateNewCustomer, api_deleteCustomer, api_getCustomersData, api_searchCustomerByName, api_searchCustomerByPhone } from '../../apis/customer.api';
import { ITV_RDX_ACTIONS } from '../actions';

const initialState: {
    loading: boolean;
    error: string | null;
    customers: ICustomer[] | [];
    numOfCus: number;
} = {
    loading: false,
    error: null,
    customers: [],
    numOfCus: 0
};

export const customerSlice = createSlice({
    name: 'customer-slicer',
    initialState,
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(
                api_getCustomersData.fulfilled,
                api_searchCustomerByPhone.fulfilled,
                api_CreateNewCustomer.fulfilled,
                api_searchCustomerByName.fulfilled
            ), (state, action) => {
                state.loading = false;
                let realType = action.type.split('/').slice(0, -1).join('/').toString();
                // console.log(realType)
                switch (realType) {
                    case ITV_RDX_ACTIONS.GET_ALL_CUSTOMERS:
                        state.customers = action.payload.data.customers;
                        state.numOfCus = action.payload.data.totalCus;
                        break;

                    case ITV_RDX_ACTIONS.SEARCH_CUSTOMER_PHONE:
                        state.customers = action.payload.data;
                        break;

                    case ITV_RDX_ACTIONS.SEARCH_CUSTOMER_NAME:
                        state.customers = action.payload.data;
                        break;
                    case ITV_RDX_ACTIONS.CREATE_CUSTOMER:
                        state.customers = [...state.customers, action.payload.data];
                        state.numOfCus = state.numOfCus + 1;
                        break;

                    default:
                        state.customers = action.payload.data;
                        break;

                }
            })
            .addMatcher(isAnyOf(
                api_searchCustomerByPhone.pending,
                api_getCustomersData.pending,
                api_CreateNewCustomer.pending,
                api_searchCustomerByName.pending
            ), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isAnyOf(
                api_searchCustomerByPhone.rejected,
                api_searchCustomerByName.rejected,
                api_CreateNewCustomer.rejected,
                api_getCustomersData.rejected
            ), (state, action) => {
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

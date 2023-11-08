
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCustomer, removeCustomer } from "../../redux/slicers/customerslice";
import { ICustomer, ICustomerInput } from "./customer.model";
import { AppDispatch, RootState } from "../../redux/store";
import { api_CreateNewCustomer, api_getCustomersData, api_searchCustomerByName, api_updateCustomer } from "../../apis/customer.api";

const cusInput: ICustomerInput = {
    name: '',
    phone: '',
    address: '',
};
export default function useCustomerController() {

    const { customers, loading, error } = useSelector((cus: RootState) => cus.customerReducer);
    const dispatch: AppDispatch = useDispatch();
    const [serachName, setSearchName] = useState<string>('');
    const [selectedCus, setSelectedCus] = useState<ICustomer>();

    const [formData, setFormData] = useState<ICustomerInput>(cusInput);
    const [headerChecked, setHdcheck] = useState<boolean>(true);
    const [deliChecked, setDelicheck] = useState<boolean>(false);
    const [codAmount, setCodAmount] = useState<string>();
    const [remark, setRemark] = useState<string>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        let updateData: ICustomer = {
            name: formData.name,
            address: formData.address,
            id: selectedCus?.id || '',
            phone: formData.phone
        }
        let r = await api_updateCustomer(updateData);
        if (r?.status === 204) {
            dispatch(editCustomer(updateData));
        }
        setFormData(cusInput);
        setSelectedCus(undefined);
    }

    const selectCus = (cus: ICustomer) => {
        setSelectedCus(cus);
        setFormData(cus);
    };

    const resetForm = () => {
        setSelectedCus(undefined);
        setFormData(cusInput);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(api_CreateNewCustomer(formData));
        setFormData(cusInput);
    };

    const deleteCus = (id: string) => {
        dispatch(removeCustomer(id));
    }

    const getAllCus = () => {
        console.log('All Cus', customers);
        dispatch(api_getCustomersData());

    }

    const getCusByName = () => {
        dispatch(api_searchCustomerByName(serachName));
        // console.log('Searched Name', customers.find((cus) => cus.name === serachName.trim()))
    }


    useEffect(() => {
        if (customers.length < 1) {
            dispatch(api_getCustomersData());
        }
    }, [])

    return {
        formData,
        handleChange,
        handleSubmit,
        customers,
        deleteCus,
        getAllCus,
        getCusByName,
        serachName,
        setSearchName,
        loading,
        error,
        selectCus,
        selectedCus,
        handleUpdate,
        setSelectedCus,
        resetForm,
        headerChecked,
        deliChecked,
        setHdcheck,
        setDelicheck,
        codAmount,
        setCodAmount,
        remark,
        setRemark
    };
}

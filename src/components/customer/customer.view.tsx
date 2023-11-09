
import useCustomerController from "./customer.controller";
import React from 'react';
import { ICustomer } from "./customer.model";
import CustomerPrintView from "./customer.print.view";

const CustomerInputForm: React.FC = () => {


    const {
        handleSubmit,
        handleChange,
        formData,
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
        resetForm,
        searchPhone,
        setSearchPhone,
        getCusByPhone
    } = useCustomerController();

    return (
        <div style={{ display: 'flex' }}>
            {error && <h2 style={{ color: 'red' }}>Error</h2>}

            <div>
                <h2>Customer Create Form</h2>
                <form onSubmit={selectedCus?.id ? handleUpdate : handleSubmit}>
                    <div>
                        <label htmlFor='name1'>Name:</label>
                        <input
                            id='name1'
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete='name'
                        />
                    </div>
                    <div>
                        <label htmlFor='phone'>Phone Number:</label>
                        <input
                            id='phone'
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            autoComplete='phone'
                        />
                    </div>
                    <div>
                        <label htmlFor='add'>Address:</label>
                        <textarea
                            id='add'
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            autoComplete='address'
                        />
                    </div>
                    <div>
                        <button type="submit">{selectedCus?.id ? 'Update' : 'Create'}</button>
                    </div>
                </form>
                {selectedCus && <button onClick={resetForm}>Reset</button>}


            </div>
            {
                loading ? <h2>loading....</h2> :
                    <div style={{ marginLeft: '10px' }}>
                        <h2>
                            Customers
                        </h2>
                        <input type="text" placeholder="Search customer by Name" name="search" value={serachName} onChange={(e) => setSearchName(e.target.value)} /><br />
                        <input type="text" placeholder="Search customer by Phone Number" name="phsearch" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} /><br />
                        <button onClick={() => getCusByName()}>Search Name</button>
                        <button onClick={() => getCusByPhone()}>Search Phone</button>
                        <button onClick={() => getAllCus()}>refresh</button>
                        {
                            customers && customers.map((cus: ICustomer, index: number) => <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column' }} key={index}>
                                <span>{index + 1}.{cus.name}</span>
                                <div>
                                    <button style={{ backgroundColor: 'red' }} onClick={() => deleteCus(cus.id)}>Delete</button>

                                    <button onClick={() => selectCus(cus)} style={{ backgroundColor: 'blue' }}>Select</button>
                                </div>
                            </div>)
                        }
                    </div>
            }
            {selectedCus && <CustomerPrintView selectedCus={selectedCus} />}
        </div>
    );
};

export default CustomerInputForm;

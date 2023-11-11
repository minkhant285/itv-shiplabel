
import useCustomerController from "./customer.controller";
import React from 'react';
import { ICustomer } from "./customer.model";
import CustomerPrintView from "./customer.print.view";

const CustomerInputForm: React.FC = () => {


    const customerController = useCustomerController();
    function generateArray(length: number, initialValue = 0) {
        // Using Array.from to create an array with the specified length
        return Array.from({ length }, (_, index) => initialValue + index);
    }

    return (
        <div style={{ display: 'flex' }}>
            {customerController.error && <h2 style={{ color: 'red' }}>Error</h2>}

            <div>
                <h2>Customer Create Form</h2>
                <form onSubmit={customerController.selectedCus?.id ? customerController.handleUpdate : customerController.handleSubmit}>
                    <div>
                        <label htmlFor='name1'>Name:</label>
                        <input
                            id='name1'
                            type="text"
                            name="name"
                            value={customerController.formData.name}
                            onChange={customerController.handleChange}
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
                            value={customerController.formData.phone}
                            onChange={customerController.handleChange}
                            required
                            autoComplete='phone'
                        />
                    </div>
                    <div>
                        <label htmlFor='add'>Address:</label>
                        <textarea
                            id='add'
                            name="address"
                            value={customerController.formData.address}
                            onChange={customerController.handleChange}
                            required
                            autoComplete='address'
                        />
                    </div>
                    <div>
                        <button type="submit">{customerController.selectedCus?.id ? 'Update' : 'Create'}</button>
                    </div>
                </form>
                {customerController.selectedCus && <button onClick={customerController.resetForm}>Reset</button>}


            </div>
            {
                customerController.loading ? <h2>loading....</h2> :
                    <div style={{ marginLeft: '10px' }}>
                        <h2>
                            Customers
                        </h2>
                        <input type="text" placeholder="Search customer by Name" name="search" value={customerController.serachName} onChange={(e) => customerController.setSearchName(e.target.value)} /><br />
                        <input type="text" placeholder="Search customer by Phone Number" name="phsearch" value={customerController.searchPhone} onChange={(e) => customerController.setSearchPhone(e.target.value)} /><br />
                        <button onClick={() => customerController.getCusByName()}>Search Name</button>
                        <button onClick={() => customerController.getCusByPhone()}>Search Phone</button>
                        <button onClick={() => customerController.getAllCus(0)}>refresh</button>
                        <div>Total Customers:{customerController.numOfCus}</div>
                        {
                            // JSON.stringify(customers)
                            customerController.customers && customerController.customers.map((cus: ICustomer, index: number) => <div style={{ display: 'flex', marginTop: '10px', flexDirection: 'column' }} key={index}>
                                <span>{index + 1}.{cus.name}</span>
                                <div>
                                    <button style={{ backgroundColor: 'red' }} onClick={() => customerController.deleteCus(cus.id)}>Delete</button>

                                    <button onClick={() => customerController.selectCus(cus)} style={{ backgroundColor: 'blue' }}>Select</button>
                                </div>
                            </div>)
                        }
                        {
                            <div>{generateArray(Math.ceil(customerController.numOfCus / customerController.take), 1).map((val, index) =>
                                <button key={val} style={{ margin: '2.5px', marginTop: '10px', backgroundColor: customerController.take * index === customerController.skip ? 'red' : '' }} onClick={() => {
                                    customerController.getAllCus(customerController.take * index);
                                    customerController.setSkip(customerController.take * index);
                                }}>{val}</button>)}
                            </div>

                        }
                    </div>
            }
            {customerController.selectedCus && <CustomerPrintView selectedCus={customerController.selectedCus} />}
        </div >
    );
};

export default CustomerInputForm;


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
        <React.Fragment>
            {<ModalView
                isOpen={customerController.openModal}
                handleOpen={customerController.setModal}
                title="Add New Customer">
                <div>
                    <div>
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
                                    rows={10}
                                />
                            </div>
                            <div>
                                <button type="submit">{customerController.selectedCus?.id ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                        {customerController.selectedCus && <button onClick={customerController.resetForm}>Reset</button>}
                    </div>
                </div>
            </ModalView>}
            <button onClick={() => { customerController.resetForm(); customerController.setModal(true); }}>Add New</button>
            <div style={{ display: 'flex' }}>
                {customerController.error && <h2 style={{ color: 'red' }}>Error</h2>}


                {
                    customerController.loading ? <h2>loading....</h2> :
                        <div style={{ marginLeft: '10px' }}>
                            <h2>
                                Customers
                            </h2>
                            <input type="text" placeholder="Search customer by Name" name="search" value={customerController.serachName} onChange={(e) => customerController.setSearchName(e.target.value)} /><br />
                            <input type="text" placeholder="Search customer by Phone Number" name="phsearch" value={customerController.searchPhone} onChange={(e) => customerController.setSearchPhone(e.target.value)} /><br />
                            <button disabled={customerController.serachName.length < 3} onClick={() => customerController.getCusByName()}>Search Name</button>
                            <button disabled={customerController.searchPhone.length < 3} onClick={() => customerController.getCusByPhone()}>Search Phone</button>
                            <button onClick={() => customerController.getAllCus(0)}>refresh</button>
                            <div>Total Customers:{customerController.numOfCus}</div>
                            {
                                <div>{generateArray(Math.ceil(customerController.numOfCus / customerController.take), 1).map((val, index) =>
                                    <button key={val} style={{ margin: '2.5px', marginTop: '10px', backgroundColor: customerController.take * index === customerController.skip ? 'red' : '' }} onClick={() => {
                                        customerController.getAllCus(customerController.take * index);
                                        customerController.setSkip(customerController.take * index);
                                    }}>{val}</button>)}
                                </div>
                            }
                            <div style={{
                                overflow: 'auto',
                                height: '300px'
                            }}>
                                {
                                    customerController.customers && customerController.customers.map((cus: ICustomer, index: number) => <div
                                        style={{
                                            display: 'flex',
                                            marginTop: '10px',
                                            flexDirection: 'column',

                                        }}
                                        key={index}>
                                        <span>{index + 1}.{cus.name}</span>
                                        <div>
                                            <button style={{ backgroundColor: 'red' }} onClick={() => customerController.deleteCus(cus.id)}>Delete</button>

                                            <button onClick={() => {
                                                customerController.selectCus(cus);
                                                customerController.setModal(true)
                                            }}>Update</button>

                                            <button onClick={() => {
                                                customerController.selectCus(cus);
                                                customerController.setPrintView(true);
                                            }}>Print</button>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                }
                {customerController.selectedCus && <ModalView
                    handleOpen={customerController.setPrintView}
                    isOpen={customerController.openPrintView}
                    title="PrintView"
                >
                    <CustomerPrintView selectedCus={customerController.selectedCus} /></ModalView>}
            </div >
        </React.Fragment>
    );
};

export default CustomerInputForm;

const ModalView: React.FC<{
    isOpen: boolean,
    handleOpen: Function,
    children?: React.ReactNode,
    title: string
}> = ({ isOpen, handleOpen, children, title }) => {

    if (isOpen) {
        return <div style={{
            zIndex: 1,
            top: 0, left: 0,
            right: 0, bottom: 0,
            backgroundColor: '#595e6290',
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
        >
            <div style={{
                display: 'flex',
                padding: '10px',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: '5px',
                marginTop: '50px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    alignItems: 'center'
                }}>
                    {title}
                    {isOpen ? <button onClick={() => handleOpen(false)}>X</button> : <></>}
                </div>
                {children}

            </div>
        </div >
    } else {
        return <></>
    }
}

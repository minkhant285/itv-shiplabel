
import useCustomerController from "./customer.controller";
import React, { useRef } from 'react';
import { ICustomer } from "./customer.model";
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from "./printComponent";

const CustomerInputForm: React.FC = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

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
        headerChecked,
        deliChecked,
        setDelicheck,
        setHdcheck,
        codAmount,
        setCodAmount,
        remark,
        setRemark
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
                        <input type="text" placeholder="Search customer" name="search" value={serachName} onChange={(e) => setSearchName(e.target.value)} /><br />
                        <button onClick={() => getCusByName()}>Search</button>
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
            {selectedCus && <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2>Print Customer</h2>
                <ComponentToPrint ref={componentRef} props={
                    <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column' }}>
                        {headerChecked && <h3>ITVerse</h3>}
                        <span>{selectedCus.name}</span>
                        <span>{selectedCus.phone}</span>
                        <span>{selectedCus.address}</span>
                        {codAmount && <span>{codAmount} Kyat</span>}
                        {deliChecked && <span>Deli ခကောက်ရန်</span>}
                        {
                            remark && <span>{remark}</span>
                        }
                    </div>
                } />

                <div style={{ display: 'flex' }}>
                    <input id="hdcb" type="checkbox" checked={headerChecked} onChange={() => setHdcheck(!headerChecked)} />
                    <label htmlFor="hdcb" >Show Header</label>
                </div>
                <div style={{ display: 'flex' }}>
                    <input id="deli" type="checkbox" checked={deliChecked} onChange={() => setDelicheck(!deliChecked)} />
                    <label htmlFor="deli" >delivery charges</label>
                </div>
                <input type="text"
                    placeholder="COD Amount"
                    value={codAmount}
                    onChange={(e) => setCodAmount(e.target.value)}
                    style={{ marginBottom: '10px' }} />

                <textarea placeholder="Remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
                <button style={{ marginTop: '10px' }} onClick={handlePrint}>Print Label</button>
            </div>}
        </div>
    );
};

export default CustomerInputForm;

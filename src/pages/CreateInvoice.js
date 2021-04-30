import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

function CreateInvoice() {
    const initialValues = {
        customerNumber: '',
        items: []
    };

    function addItem(e, values, setValues) {
      const items = [...values.items]
      items.push({ name: '', quantity: '', sellingPrice: '' })

      setValues({ ...values, items });

    }

    function onSubmit(fields) {
        // display form field values on success
        alert(JSON.stringify(fields, null, 4));
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, values, touched, setValues }) => (
                <Form>
                    <div className="card m-3">
                        <div className="card-body border-bottom">
                            <div className="form-row">
                                <div className="form-group">
                                    <label style={ {margin: '1rem 0 1rem 20rem', width: '1000px', height: '40px'} }>Customer Number</label>
                                    <Field name="customerNumber" type='text' style={ {margin: '1rem 0 1rem 20rem', width: '1000px', height: '40px'} }>

                                    </Field>
                                    <ErrorMessage name="customerNumber" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                        </div>
                        <FieldArray name="items">
                        {() => (values.items.map((item, i) => {
                            const ticketErrors = errors.items?.length && errors.items[i] || {};
                            const ticketTouched = touched.items?.length && touched.items[i] || {};
                            return (
                                <div key={i} className="list-group list-group-flush">
                                    <div className="list-group-item">
                                        <h5 className="card-title" style={ {margin: '1rem 0 1rem 20rem', width: '1000px', height: '40px'} }>Ticket {i + 1}</h5>
                                        <div className="form-row">
                                            <div className="form-group col-6" style={ {margin: '1rem 0 1rem 20rem', width: '1000px', height: '40px'} }>
                                                <label style={ {margin: '0rem 1rem 0rem 1rem'}}>Name</label>
                                                <Field name={`items.${i}.name`} type="text" className={'form-control'} />
                                                <ErrorMessage name={`items.${i}.name`} component="div" className="invalid-feedback" />
                                                <label style={ {margin: '0rem 1rem 0rem 1rem'} }>Quantity</label>
                                                <Field name={`items.${i}.quantity`} type="text" className={'form-control'} />
                                                <ErrorMessage name={`items.${i}.quantity`} component="div" className="invalid-feedback" />
                                                <label style={ {margin: '0rem 1rem 0rem 1rem'} }>Selling Price</label>
                                                <Field name={`items.${i}.sellingPrice`} type="text" className={'form-control'} />
                                                <ErrorMessage name={`items.${i}.sellingPrice`} component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }))}
                        </FieldArray>
                        <div style={{justifyContent: 'center',
      alignItems: 'center'}} >
                            <button variant="primary" size="sm" type="button" onClick={e => addItem(e, values, setValues)}>
                                Add Item
                            </button>
                        </div>
                        <div className="card-footer text-center border-top-0">
                            <button type="submit" className="btn btn-primary mr-1">
                                Create Invoice
                            </button>
                            <button className="btn btn-secondary mr-1" type="reset">Reset</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default CreateInvoice;
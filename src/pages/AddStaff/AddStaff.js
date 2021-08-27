import Card from "../../components/Card/Card";
import CtaButton from "../../components/CtaButton/CtaButton";
import { postCall } from '../../helper/ApiHelper';
import { useFormik } from 'formik';
import './AddStaff.css'
import PageTitleContainer from "../../components/PageTitleContainer/PageTitleContainer";
import {showMessage} from '../../components/Alert/AlertPopup'


const AddStaff = (props) => {

    const validate = values => {
        const errors = {};
      
        if (!values.staffName) {
          errors.staffName = 'Required';
        } 
        if (!values.optionalData) {
          errors.optionalData = 'Required'
        }
        if (values.phone.length < 10 || values.phone.length > 11) {
          errors.phone = 'Enter correct number of digits'
        }

        if (!values.phone) {
          errors.phone = 'Required'
        }
      
        return errors;
      };
      

    const formik = useFormik({
        initialValues: props.staff ? props.staff: {
          staffName: '',
          optionalData:'',
          phone:'',
          emailAddress:'',
          address:'',
        },
        validate,
        enableReinitialize:false,
        onSubmit: values => {
          postCall('staffs', values, true).then((data) => {
            showMessage('Done!!!', 'Staff Added Successfully','success', 'OK');
          })
        },
      });

      return (
        <PageTitleContainer title='Add Staff Member'>
        <Card className='staff-container'>
        <form  onSubmit={(e) => {e.preventDefault(); formik.handleSubmit(e)}}>
            <div>
              <label className='staff-label'>
                Name:
              </label>
              <input 
                className='staff-input'
                id="staffName"
                name="staffName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.staffName} />
                {formik.errors.staffName ? <div style={{color:'red'}}>{formik.errors.staffName}</div> : null}
            </div>
            <div>
              <label className='staff-label'>
                Phone Number:
              </label>
              <input 
                className='staff-input' 
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone} />
                {formik.errors.phone ? <div style={{color:'red'}}>{formik.errors.phone}</div> : null}
            </div>
    
            <div>
              <label className='staff-label'>
                Address:
              </label>
              <textarea 
                className='staff-text-area'
                id="address"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address} />
            </div>
              <div>
              <label className='staff-label'>
                Designation:
              </label>
              <input 
                className='staff-input' 
                id="optionalData"
                name="optionalData"
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.optionalData}
                style={{marginBottom:'2rem'}} />
                {formik.errors.optionalData ? <div style={{color:'red'}}>{formik.errors.optionalData}</div> : null}
              </div>   
            <CtaButton type="submit" onClick={() => {}}>{'ADD'}</CtaButton>
          </form>
          </Card>
          </PageTitleContainer>
      );
}

export default AddStaff;
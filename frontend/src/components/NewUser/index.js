import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../api'
import './style.css'
import Swal from 'sweetalert2'

const NewUser = ({ errors }) => {
  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        phone: Yup.string().required('Required').min(8, 'Min 8 numbers').max(14, 'Max 14 numbers'),
      })}

      onSubmit={async (values, { setSubmitting, resetForm, }) => {
        try {
          await api.post('/users', {
            name: values.name,
            email: values.email,
            phone: values.phone,
            adm_user: false,
            active: true,
          })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          resetForm({})
          setSubmitting(false)

        } catch (error) {
          console.log(error)
        }
      }}>
      {({ isSubmitting, errors }) => (
        <Form className='form'>

          <div className='input-box'>
            <label htmlFor='name'>Name</label>
            <Field type="text" name="name" className={errors.ErrorMessage ? 'error-message' : ''} />
            <ErrorMessage name="name" component="div" style={{ color: 'red', fontSize: '18px', marginLeft: '20px' }} />
          </div>

          <div className='input-box'>
            <label htmlFor='email'>Email</label>
            <Field type="email" name="email" className={errors.ErrorMessage ? 'error-message' : ''} />
            <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '18px', marginLeft: '20px' }} />
          </div>

          <div className='input-box'>
            <label htmlFor='name'>Phone</label>
            <Field type="text" name="phone" className={errors.ErrorMessage ? 'error-message' : ''} />
            <ErrorMessage name="phone" component="div" style={{ color: 'red', fontSize: '18px', marginLeft: '20px' }} />
          </div>

          <div className='buttonDiv'>
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </div>
        </Form>
      )}
    </Formik >
  );
};

export default NewUser;

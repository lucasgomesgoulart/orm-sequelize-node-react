import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../api'
import Swal from 'sweetalert2'


const NewUser = ({ errors }) => {

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        phone: Yup.string().required('Required').min(8, 'Min 8 numbers').max(10, 'Max 10 numbers')
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
          Toast.fire({
            icon: 'sucess',
            title: `User registered successfully`
          })
          resetForm({})
          setSubmitting(false)

        } catch (error) {
          if (error.request.status === 401 || error.request.status === 403) {
            Toast.fire({
              icon: 'error',
              title: `Please login first`
            })
          }
        }
      }}>
      {({ isSubmitting, errors }) => (

        <div className='container-login'>
          <Form className='formm'>
            <div className='form-container'>
              <div className='input-box'>
                <Field type="text" placeholder='Name' name="name" className='inputForm' />
                <ErrorMessage name="name" component="div" style={{ color: 'red', fontSize: '15px',}} />
              </div>
              <div className='input-box'>
                <Field type="email" placeholder='Email' name="email" className='inputForm' />
                <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '15px'}} />
              </div>
              <div className='input-box'>
                <Field type="text" placeholder='Phone' name="phone" className='inputForm'/>
                <ErrorMessage name="phone" component="div" style={{ color: 'red', fontSize: '15px', }} />
              </div>
              <div className='buttonDiv'>
                <button type="submit" disabled={isSubmitting} className='button'>Submit</button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik >
  );
};

export default NewUser;

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NewUser = ({ errors }) => {

  const navigate = useNavigate()

  return (
    <>
      <h2>New user</h2>
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
           navigate('/listusers')
            resetForm({})
            setSubmitting(false)

          } catch (error) {
            if (error.request.status === 401 || error.request.status === 403) {
              toast.error(<div>You need to login first</div>)
            }
          }
        }}>
        {({ isSubmitting, errors }) => (

          <div className='container-login'>
            <Form className='formm'>
              <div className='form-container'>
                <div className='input-box'>
                  <Field type="text" placeholder='Name' name="name" className='inputForm' />
                  <ErrorMessage name="name" component="div" style={{ color: 'red', fontSize: '15px', }} />
                </div>
                <div className='input-box'>
                  <Field type="email" placeholder='Email' name="email" className='inputForm' />
                  <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '15px' }} />
                </div>
                <div className='input-box'>
                  <Field type="text" placeholder='Phone' name="phone" className='inputForm' />
                  <ErrorMessage name="phone" component="div" style={{ color: 'red', fontSize: '15px', }} />
                </div>
                <div className='buttonDiv'>
                  <button className='buttonSubimt' type="submit" disabled={isSubmitting} >Submit</button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik >
    </>
  );
};

export default NewUser;

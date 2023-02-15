import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../components/Context/AuthContext'
import { useContext, useEffect } from 'react';

const NewUser = () => {

  const { authenticated } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authenticated) {
      navigate('/unauthorizaded')
    }
  }, [])


  return (
    <>
      <h1 style={{
        fontSize: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid black'
      }}>
        Register User
      </h1>
      <Formik
        initialValues={{ name: '', email: '', phone: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          phone: Yup.string().required('Required')
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

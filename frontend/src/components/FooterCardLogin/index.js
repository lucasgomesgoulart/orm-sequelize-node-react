import { FaFacebookF } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import './style.scss'

const FooterCardLogin = (props) => {

    return (<>

        <div className='box-button-icons'>
            <button
                type='button'
                onClick={props.alertUser}
                style={{ backgroundColor: '#3a5ba0' }}
            >
                <FaFacebookF size={25}
                />
                Continue with Facebook
            </button>
        </div>
        <div className='box-button-icons'>
            <button
                type='button'
                onClick={props.alertUser}
                style={{ backgroundColor: '#D34836' }}
            >
                <FaGoogle size={25} />
                Continue with Google
            </button>
        </div>
    </>
    )
}

export default FooterCardLogin
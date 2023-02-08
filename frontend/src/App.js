import Layout from './Screens/Layout'
import { AuthProvider } from './components/Context/AuthContext'
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <>
      <AuthProvider>
        <Layout />
      </AuthProvider>
      <ToastContainer 
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;

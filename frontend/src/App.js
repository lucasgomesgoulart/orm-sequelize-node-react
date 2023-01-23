import Layout from './components/Layout';
import { AuthProvider } from './components/Context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;

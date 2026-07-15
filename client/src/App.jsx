import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProperty from './pages/AddProperty';
import PropertyDetails from './pages/PropertyDetails';
import MyProperties from './pages/MyProperties';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#f7f3ec', color: '#1c1a17' }}>
          <Navbar />
          <div className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/edit-property/:id" element={<AddProperty />} />
              <Route path="/my-properties" element={<MyProperties />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

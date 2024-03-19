import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin';
import Sales from './pages/Sales';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import SingleBlogPage from './pages/SingleBlogPage'; // Import the SingleBlogPage component
import NotFound from './pages/NotFound'; // Import the NotFound component

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/sales" />} />
            <Route path="/admin/signup" element={user && user.isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminSignup />} />
            <Route path="/admin/login" element={user && user.isAdmin ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/dashboard" element={user && !user.isAdmin ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/admin/dashboard" element={user && user.isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            {/* Add route for single blog page */}
            <Route path="/blog/:postId" element={<SingleBlogPage />} />
            {/* Route for 404 error page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

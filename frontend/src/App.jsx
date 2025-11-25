import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import CarListPage from './pages/CarListPage';
import CarDetailsPage from './pages/CarDetailsPage';
import AddCarPage from './pages/AddCarPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="cars" element={<CarListPage />} />
          <Route path="cars/:id" element={<CarDetailsPage />} />
          <Route path="add-car" element={<AddCarPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

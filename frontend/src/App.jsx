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
import EditCarPage from './pages/EditCarPage';
import NotFoundPage from './pages/NotFoundPage';
import CarFilms from './pages/Film';
import UpdateProfilePage from './pages/UpdateProfilePage';
import NewsPage from './pages/NewsPage';
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
          <Route path="edit-car/:id" element={<EditCarPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="film" element={<CarFilms />} />
          <Route path="edit-profile" element={<UpdateProfilePage />} />
          <Route path="news" element={<NewsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

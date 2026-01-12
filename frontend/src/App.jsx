import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
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
import CarValuationPage from "./pages/CarValuationPage.jsx";
import NewsPage from './pages/NewsPage';
import BrandsPage from './pages/BrandsPage.jsx';
import ModelsPage from './pages/ModelsPage.jsx';
import ModelDetailsPage from './pages/ModelDetailsPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <ToastContainer />
        <ThemeProvider>
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
              <Route path="news" element={<NewsPage />} />
              <Route path="valuation" element={<CarValuationPage />} />
              <Route path="edit-profile" element={<UpdateProfilePage />} />
              <Route path="chat" element={<ChatPage />} />

              <Route path="/catalog" element={<BrandsPage />} />
              <Route path="/catalog/brand/:brandId" element={<ModelsPage />} />
              <Route path="/catalog/details/:modelId" element={<ModelDetailsPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </WebSocketProvider>
    </AuthProvider>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
// import Signup from '../pages/auth/Signup';
import Home from '../pages/Home';
import Books from '../pages/Books'
import DashboardLayout from '../components/layout/DashboardLayout';
import Recomendation from '../pages/Recomendation';
import Reviews from '../pages/Reviews';
import Composites from '../pages/Composites';
import AddBooks from '../components/AddBooks';
import EditBook from '../components/EditBook';
import AddRecommendation from '../components/AddRecommendation';
import EditRecommendation from '../components/EditRecommendation';
import AddReview from '../components/AddReview';
import EditReview from '../components/EditReview';
import LandingPage from '../pages/LandingPage';
import Profile from '../pages/Profile';

const RouterPath = () => {
  return (
    <Routes>
      <Route index element={<LandingPage />} />

      {/* <Route index element={<Login />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile/>} />
        <Route path="books" element={ <Books/>} />
        <Route path="recomendations" element={<Recomendation/>} />
        <Route path="reviews" element={<Reviews/>} />
        <Route path="composites" element={<Composites/>} />
        <Route path="add-book" element={<AddBooks />} />
        <Route path="edit-book/:id" element={<EditBook />} />
        <Route path="add-recommendation" element={<AddRecommendation />} />
        <Route path="edit-recommendation/:id" element={<EditRecommendation />} />
        <Route path="add-review" element={<AddReview />} />
        <Route path="edit-review/:id" element={<EditReview />} />
      </Route>
    </Routes>
  );
};

export default RouterPath;

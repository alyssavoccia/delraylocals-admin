import { useEffect, useContext } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DelrayLocalsContext from "./context/DelrayLocalsContext";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Restaurants from "./pages/Restaurants";

function App() {
  const { dispatch } = useContext(DelrayLocalsContext);
  const location = useLocation();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const restaurantsRef = collection(db, 'restaurants');
      const querySnap = await getDocs(restaurantsRef);
      const restaurants = [];

      querySnap.forEach(doc => {
        restaurants.push(doc.data());
      });

      dispatch({ type: 'SET_RESTAURANTS', payload: restaurants });
    }

    fetchRestaurants();
  }, [dispatch]);

  return (
    <div className="app">
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/restaurants' element={<PrivateRoute />}>
          <Route path='/restaurants' element={<Restaurants />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

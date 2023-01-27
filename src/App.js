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
import Events from "./pages/Events";
import Living from "./pages/Living";
import Community from "./pages/Community";

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
        <Route path='/events' element={<PrivateRoute />}>
          <Route path='/events' element={<Events />} />
        </Route>
        <Route path='/living' element={<PrivateRoute />}>
          <Route path='/living' element={<Living />} />
        </Route>
        <Route path='/community' element={<PrivateRoute />}>
          <Route path='/community' element={<Community />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

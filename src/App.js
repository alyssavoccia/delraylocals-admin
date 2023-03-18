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
import Events from './pages/Events';
import ThingsToDo from "./pages/ThingsToDo";
import Community from "./pages/Organizations";

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

    const fetchEvents = async () => {
      const eventsRef = collection(db, 'events');
      const querySnap = await getDocs(eventsRef);
      const events = [];

      querySnap.forEach(doc => {
        events.push(doc.data());
      });

      dispatch({ type: 'SET_EVENTS', payload: events });
    }

    fetchEvents();

    const fetchThingsToDo = async () => {
      const thingsToDoRef = collection(db, 'thingsToDo');
      const querySnap = await getDocs(thingsToDoRef);
      const things = [];

      querySnap.forEach(doc => {
        things.push(doc.data());
      });

      dispatch({ type: 'SET_THINGS_TO_DO', payload: things });
    }

    fetchThingsToDo();

    const fetchOrganizations = async () => {
      const organizationsRef = collection(db, 'organizations');
      const querySnap = await getDocs(organizationsRef);
      const organizations = [];

      querySnap.forEach(doc => {
        organizations.push(doc.data());
      });

      dispatch({ type: 'SET_ORGANIZATIONS', payload: organizations });
    }

    fetchOrganizations();
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
        <Route path='/things-to-do' element={<PrivateRoute />}>
          <Route path='/things-to-do' element={<ThingsToDo />} />
        </Route>
        <Route path='/organizations' element={<PrivateRoute />}>
          <Route path='/organizations' element={<Community />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

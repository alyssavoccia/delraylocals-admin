import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase.config";
import DelrayLocalsContext from "../context/DelrayLocalsContext";
import DiningModal from "../components/DiningModal";

const Restaurants = () => {
  const { restaurants, dispatch } = useContext(DelrayLocalsContext);
  const [currRestaurants, setCurrRestaurants] = useState([]);

  useEffect(() => {
    if (restaurants.length > 0) {
      setCurrRestaurants(restaurants);
    }
  }, [restaurants]);

  const onDelete = e => {
    const restaurantName = e.target.parentNode.parentNode.parentNode.id;
    db.collection("restaurants").where("name", "==", restaurantName).get()
      .then(querySnapshot => {
        querySnapshot.docs[0].ref.delete();
      });
    
    const updatedArr = currRestaurants.filter(restaurant => restaurant.name !== restaurantName);

    dispatch({ type: 'UPDATE_RESTAURANTS', payload: updatedArr });
  };

  return (
    <section className="pl-[80px] pr-4">
      <div className="flex justify-between items-center">
        <h1 className="py-4 font-black text-2xl">Restaurants</h1>
        <button onClick={() => dispatch({ type: 'OPEN_DINING_MODAL' })} className="bg-slate-500 hover:bg-slate-400 transition-all text-white font-semibold p-2 rounded flex justify-center w-[150px]">Add Restaurant</button>
        <DiningModal />
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {currRestaurants.map(restaurant => (
          <div key={restaurant.name} className="flex justify-between items-center" id={restaurant.name}>
            <div>
              <p className="font-bold">{restaurant.name}</p>
              <p>{restaurant.address}</p>
              <p>{restaurant.website}</p>
              <p>{restaurant.type}</p>
            </div>
            <button onClick={onDelete}>
              <FontAwesomeIcon className="hover:text-red-500 cursor-pointer" icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Restaurants;
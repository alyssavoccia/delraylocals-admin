import { useContext } from "react";
import DelrayLocalsContext from "../context/DelrayLocalsContext";

const Restaurants = () => {
  const { restaurants } = useContext(DelrayLocalsContext);

  return (
    <section className="pl-[80px]">
      <h1 className="py-4 font-black text-2xl">Restaurants</h1>
      <div className="flex flex-col">
        {restaurants.map(restaurant => (
          <div className="my-4" key={restaurant.name}>
            <p className="font-bold">{restaurant.name}</p>
            <p>{restaurant.address}</p>
            <p>{restaurant.website}</p>
            <p>{restaurant.type}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Restaurants;
import { useContext, useEffect, useState } from "react";
import DiningModal from "../components/DiningModal";
import DelrayLocalsContext from "../context/DelrayLocalsContext";

const Dashboard = () => {
  const { restaurants, events, living, community, dispatch } = useContext(DelrayLocalsContext);
  const [currRestaurants, setCurrRestaurants] = useState([]);
  const [currEvents, setCurrEvents] = useState([]);
  const [currLiving, setCurrLiving] = useState([]);
  const [currCommunity, setCurrCommunity] = useState([]);

  useEffect(() => {
    setCurrRestaurants(restaurants);
    setCurrEvents(events);
    setCurrLiving(living);
    setCurrCommunity(community);
  }, [restaurants, events, living, community]);

  return (
    <section className="pl-[80px]">
      <h1 className="py-4 font-black text-2xl">Delray Locals</h1>
      <div className="py-4 flex gap-5">
        <div className="flex flex-col items-center justify-center bg-white p-3 rounded shadow-md w-[125px]">
          <p className="font-bold text-lg">Dining</p>
          <p>{currRestaurants.length}</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-white p-3 rounded shadow-md w-[125px]">
          <p className="font-bold text-lg">Events</p>
          <p>{currEvents.length}</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-white p-3 rounded shadow-md w-[125px]">
          <p className="font-bold text-lg">Living</p>
          <p>{currLiving.length}</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-white p-3 rounded shadow-md w-[125px]">
          <p className="font-bold text-lg">Community</p>
          <p>{currCommunity.length}</p>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-lg font-bold">Quick Links</p>
        <div className="flex flex-wrap gap-5 mt-4">
          <button onClick={() => dispatch({ type: 'OPEN_DINING_MODAL' })} className="bg-slate-500 hover:bg-slate-400 transition-all text-white font-semibold p-2 rounded flex justify-center w-[150px]">Add Restaurant</button>
          <DiningModal />
          <p className="bg-slate-500 hover:bg-slate-400 transition-all text-white font-semibold cursor-pointer p-2 rounded flex justify-center w-[150px]">Add Event</p>
          <p className="bg-slate-500 hover:bg-slate-400 transition-all text-white font-semibold cursor-pointer p-2 rounded flex justify-center w-[150px]">Add Living</p>
          <p className="bg-slate-500 hover:bg-slate-400 transition-all text-white font-semibold cursor-pointer p-2 rounded flex justify-center w-[150px]">Add Community</p>
        </div>
      </div>
    </section>
  )
}

export default Dashboard;
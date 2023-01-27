import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase.config";
import DelrayLocalsContext from "../context/DelrayLocalsContext";
import DiningModal from "../components/DiningModal";

const Community = () => {
  // const { events, dispatch } = useContext(DelrayLocalsContext);
  const [currCommunity, setCurrCommunity] = useState([]);

  // useEffect(() => {
  //   if (events.length > 0) {
  //     setCurrEvents(events);
  //   }
  // }, [events]);

  const onDelete = e => {
    // const eventName = e.target.parentNode.parentNode.parentNode.id;
    // db.collection("events").where("name", "==", eventName).get()
    //   .then(querySnapshot => {
    //     querySnapshot.docs[0].ref.delete();
    //   });
    
    // const updatedArr = events.filter(restaurant => restaurant.name !== eventName);

    // dispatch({ type: 'UPDATE_EVENTS', payload: updatedArr });
  };

  return (
    <section className="pl-[80px] pr-4">
      <div className="flex justify-between items-center">
        <h1 className="py-4 font-black text-2xl">Community</h1>
        <button className="bg-slate-500 hover:bg-slate-400 transition-all text-white font-semibold p-2 rounded flex justify-center w-[150px]">Add Community</button>
        <DiningModal />
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {currCommunity.map(community => (
          <div key={community} className="flex justify-between items-center" id={community}>
            <div>
              Community
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

export default Community;
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase.config";
import DelrayLocalsContext from "../context/DelrayLocalsContext";
import EventsModal from "../components/EventsModal";

const Events = () => {
  const { events, dispatch } = useContext(DelrayLocalsContext);
  const [currEvents, setCurrEvents] = useState([]);

  useEffect(() => {
    if (events.length > 0) {
      setCurrEvents(events);
    }
  }, [events]);

  const underConstruction = e => {
    e.preventDefault();

    toast.info('Currently under construction');
  }

  const onDelete = e => {
    const eventName = e.target.parentNode.parentNode.parentNode.parentNode.id;
    db.collection("events").where("name", "==", eventName).get()
      .then(querySnapshot => {
        querySnapshot.docs[0].ref.delete();
      });
    
    const updatedArr = currEvents.filter(event => event.name !== eventName);

    dispatch({ type: 'UPDATE_EVENTS', payload: updatedArr });
  };

  return (
    <section className="pl-[80px] pr-4">
      <div className="flex justify-between items-center">
        <h1 className="py-4 font-black text-2xl">Events</h1>
        <button onClick={() => dispatch({ type: 'OPEN_EVENTS_MODAL' })} className="bg-slate-500 hover:bg-slate-600 transition-all text-white font-semibold p-2 rounded flex justify-center w-[150px]">Add Event</button>
        <EventsModal />
      </div>
      <div className="container">
        <div className="py-5">
          <div className="mb-1 sm:mb-0">
            <div>
              <form className="flex flex-col w-3/4 space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0" onSubmit={underConstruction}>
                <div className="relative ">
                  <input type="text" className="shadow-sm rounded-lg border-transparent flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:border-transparent" placeholder="Name"/>
                </div>
                <button className="shadow-sm flex-shrink-0 px-4 py-1 font-semibold text-white bg-slate-500 rounded-lg hover:bg-slate-600 focus:outline-none" type="submit">Filter</button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200">Name</th>
                    <th scope="col" className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200">Date</th>
                    <th scope="col" className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200">Website</th>
                    <th scope="col" className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200">Description</th>
                    <th scope="col" className="px-5 py-3 text-sm font-semibold text-left text-gray-800 uppercase bg-white border-b border-gray-200"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    currEvents.map(event => (
                      <tr key={event.name} id={event.name}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="whitespace-no-wrap">{event.name}</p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="whitespace-no-wrap">{event.date}</p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="whitespace-no-wrap">{event.website}</p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="whitespace-no-wrap">{event.description}</p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <button onClick={underConstruction}>
                            <FontAwesomeIcon className="hover:text-slate-500 pr-2 cursor-pointer" icon={faPencil} />
                          </button>
                          <button onClick={onDelete}>
                            <FontAwesomeIcon className="hover:text-red-500 cursor-pointer" icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {/* <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                  <div className="flex items-center">
                      <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                          <svg width="9" fill="currentColor" height="8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                              </path>
                          </svg>
                      </button>
                      <button type="button" class="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 ">
                          1
                      </button>
                      <button type="button" class="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                          2
                      </button>
                      <button type="button" class="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100">
                          3
                      </button>
                      <button type="button" class="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                          4
                      </button>
                      <button type="button" class="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                          <svg width="9" fill="currentColor" height="8" class="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                              </path>
                          </svg>
                      </button>
                  </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events;
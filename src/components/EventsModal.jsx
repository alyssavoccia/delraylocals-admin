import { useContext, useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import DelrayLocalsContext from '../context/DelrayLocalsContext';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#FFF',
    border: 'none'
  },
  overlay: {
    background: 'rgba(0, 0, 0, .6)'
  }
};

Modal.setAppElement('#root');

const EventsModal = () => {
  const { eventsModalOpen, events, dispatch } = useContext(DelrayLocalsContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currEvents, setCurrEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    website: '',
    description: ''
  });

  const { name, date, website, description } = formData;

  useEffect(() => {
    setCurrEvents(events);
  }, [events]);

  useEffect(() => {
    setModalIsOpen(eventsModalOpen);
  }, [eventsModalOpen]);

  const closeModal = () => {
    dispatch({ type: 'CLOSE_EVENTS_MODAL' });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const inDatabase = events.filter(event => event.name === formData.name);

    if (inDatabase.length > 0) {
      toast.error('Event is already in the database.');
    } else {
      try {
        await addDoc(collection(db, 'events'), formData);
  
        currEvents.push(formData);
  
        dispatch({ type: 'UPDATE_EVENTS', payload: currEvents });
  
        setFormData({
          name: '',
          date: '',
          website: '',
          description: ''
        });
  
        toast.success('Event successfully added!');
      } catch (error) {
        toast.error('Unable to add event.');
      }
    }
  };

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Add New Event'
    >
      <div className='min-w-[325px]'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Add New Event</h2>
          <button onClick={closeModal}>
            <FontAwesomeIcon className='hover:text-gray-500' icon={faXmark} />
          </button>
        </div>
        <form className='flex flex-col gap-2 mt-5' onSubmit={onSubmit}>
          <input id='name' className='bg-gray-100 rounded p-1' type="text" placeholder='Enter Name' value={name} onChange={onChange} />
          <input id='date' className='bg-gray-100 rounded p-1' type="text" placeholder='Enter Date' value={date} onChange={onChange} />
          <input id='website' className='bg-gray-100 rounded p-1' type="text" placeholder='Enter Website' value={website} onChange={onChange} />
          <textarea id='description' className='bg-gray-100 rounded p-1' type="text" placeholder='Enter Description' value={description} onChange={onChange} />
          <button type='submit' className='bg-slate-500 hover:bg-slate-400 transition-all text-white rounded font-bold p-1'>Submit</button>
        </form>
      </div>
    </Modal>
  )
}

export default EventsModal;
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

const DiningModal = () => {
  const { diningModalOpen, restaurants, dispatch } = useContext(DelrayLocalsContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currRestaurants, setCurrRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    website: '',
    phone: '',
    type: ''
  });

  const { name, address, website, phone, type } = formData;

  useEffect(() => {
    setCurrRestaurants(restaurants);
  }, [restaurants]);

  useEffect(() => {
    setModalIsOpen(diningModalOpen);
  }, [diningModalOpen]);

  const closeModal = () => {
    dispatch({ type: 'CLOSE_DINING_MODAL' });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (restaurants.filter(restaurant => restaurant.name = formData.name)) {
      toast.error('Restaurant already in the database.');
    } else {
      try {
        await addDoc(collection(db, 'restaurants'), formData);
  
        currRestaurants.push(formData);
  
        dispatch({ type: 'UPDATE_RESTAURANTS', payload: currRestaurants });
  
        setFormData({
          name: '',
          address: '',
          website: '',
          phone: '',
          type: ''
        });
  
        toast.success('Restaurant successfully added!');
      } catch (error) {
        toast.error('Unable to add restaurant.');
      }
    }
  }

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Add New Dining'
    >
      <div className='min-w-[325px]'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Add New Restaurant</h2>
          <button onClick={closeModal}>
            <FontAwesomeIcon className='hover:text-gray-500' icon={faXmark} />
          </button>
        </div>
        <form className='flex flex-col gap-2 mt-5' onSubmit={onSubmit}>
          <input id='name' className='bg-gray-100 rounded p-1' type="text" placeholder='Enter Name' value={name} onChange={onChange} />
          <input id='address' className='bg-gray-100 rounded p-1' type="text" placeholder='Enter Address' value={address} onChange={onChange} />
          <input id='phone' className='bg-gray-100 rounded p-1' type="text" placeholder='Enter Phone' value={phone} onChange={onChange} />
          <input id='website' className='bg-gray-100 rounded p-1' type="text" placeholder='Enter Website' value={website} onChange={onChange} />
          <select id='type' className='bg-gray-100 rounded p-1' value={type} onChange={onChange}>
            <option defaultValue>Type</option>
            <option value='Mexican'>Mexican</option>
            <option value='American'>American</option>
            <option value='Italian'>Italian</option>
            <option value='Asian'>Asian</option>
            <option value='Japanese'>Japanese</option>
            <option value='Bistro'>Bistro</option>
            <option value='Cuban'>Cuban</option>
            <option value='Seafood'>Seafood</option>
            <option value='Thai'>Thai</option>
            <option value='Brewery'>Brewery</option>
          </select>
          <button type='submit' className='bg-slate-500 hover:bg-slate-400 transition-all text-white rounded font-bold p-1'>Submit</button>
        </form>
      </div>
    </Modal>
  )
}

export default DiningModal;
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

const GetInvolvedModal = () => {
  const { getInvolvedModalOpen, organizations, dispatch } = useContext(DelrayLocalsContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currOrganizations, setCurrOrganizations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    phone: '',
    type: ''
  });

  const { name, website, phone, type } = formData;

  useEffect(() => {
    setCurrOrganizations(organizations);
  }, [organizations]);

  useEffect(() => {
    setModalIsOpen(getInvolvedModalOpen);
  }, [getInvolvedModalOpen]);

  const closeModal = () => {
    dispatch({ type: 'CLOSE_ORGANIZATIONS_MODAL' });
  };

  const onSubmit = async e => {
    e.preventDefault();

    const inDatabase = organizations.filter(organization => organization.name === formData.name);

    console.log(inDatabase);

    if (inDatabase.length > 0) {
      toast.error('Organization already in the database.');
    } else {
      try {
        await addDoc(collection(db, 'organizations'), formData);
  
        currOrganizations.push(formData);
  
        dispatch({ type: 'UPDATE_ORGANIZATIONS', payload: currOrganizations });
  
        setFormData({
          name: '',
          website: '',
          phone: '',
          type: ''
        });
  
        toast.success('Organization successfully added!');
      } catch (error) {
        toast.error('Unable to add organization.');
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
      contentLabel='Add New Organization'
    >
      <div className='min-w-[325px]'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-bold'>Add New Organization</h2>
          <button onClick={closeModal}>
            <FontAwesomeIcon className='hover:text-gray-500' icon={faXmark} />
          </button>
        </div>
        <form className='flex flex-col gap-2 mt-5' onSubmit={onSubmit}>
          <input id='name' className='bg-gray-100 rounded p-1' type="text" placeholder='Enter Name' value={name} onChange={onChange} />
          <input id='phone' className='bg-gray-100 rounded p-1' type="text" placeholder='Enter Phone' value={phone} onChange={onChange} />
          <input id='website' className='bg-gray-100 rounded p-1' type="text" placeholder='Enter Website' value={website} onChange={onChange} />
          <select id='type' className='bg-gray-100 rounded p-1' value={type} onChange={onChange}>
            <option defaultValue>Type</option>
            <option value='Volunteer'>Volunteer</option>
            <option value='Professional/Community Organization'>Professional/Community Organization</option>
          </select>
          <button type='submit' className='bg-slate-500 hover:bg-slate-400 transition-all text-white rounded font-bold p-1'>Submit</button>
        </form>
      </div>
    </Modal>
  )
}

export default GetInvolvedModal;
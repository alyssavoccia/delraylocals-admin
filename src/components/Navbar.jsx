import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faUtensils, faCalendarDays, faUmbrellaBeach, faBuildingNgo } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className='h-screen w-[64px] fixed bg-white shadow-lg'>
      <div className='text-center my-5'>
        <p className='font-black'>DL</p>
      </div>
      <ul className='flex flex-col items-center justify-center'>
        <li className='my-3'>
          <Link to='/dashboard' className={`${location.pathname === '/dashboard' ? `text-white bg-slate-500` : 'text-slate-500'} rounded p-2  hover:bg-slate-500 hover:text-white transition-all text-lg`}>
            <FontAwesomeIcon icon={faChartArea} />
          </Link>
        </li>
        <li className='my-3'>
          <Link to='/restaurants' className={`${location.pathname === '/restaurants' ? `text-white bg-slate-500` : 'text-slate-500'} rounded p-2  hover:bg-slate-500 hover:text-white transition-all text-lg`}>
            <FontAwesomeIcon icon={faUtensils} />
          </Link>
        </li>
        <li className='my-3'>
          <Link to='/events' className={`${location.pathname === '/events' ? `text-white bg-slate-500` : 'text-slate-500'} rounded p-2  hover:bg-slate-500 hover:text-white transition-all text-lg`}>
            <FontAwesomeIcon icon={faCalendarDays} />
          </Link>
        </li>
        <li className='my-3'>
          <Link to='/things-to-do' className={`${location.pathname === '/things-to-do' ? `text-white bg-slate-500` : 'text-slate-500'} rounded p-2  hover:bg-slate-500 hover:text-white transition-all text-lg`}>
            <FontAwesomeIcon icon={faUmbrellaBeach} />
          </Link>
        </li>
        <li className='my-3'>
          <Link to='/organizations' className={`${location.pathname === '/organizations' ? `text-white bg-slate-500` : 'text-slate-500'} rounded p-2  hover:bg-slate-500 hover:text-white transition-all text-lg`}>
            <FontAwesomeIcon icon={faBuildingNgo} />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {/* Top Purple Navbar */}
      <div className='bg-[#4a3b82] text-white text-sm py-2'>
        <div className='flex justify-between items-center max-w-7xl mx-auto px-3'>
          <div className='flex gap-6'>
            <span><i className="fas fa-phone mr-2"></i>+91 9876543210</span>
            <span><i className="fas fa-map-marker-alt mr-2"></i>Sm Road, Kandivali (west), Mumbai</span>
            <span><i className="fas fa-envelope mr-2"></i>anshikakhare099@gmail.com</span>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex gap-2'>
              <a href="#" className='w-6 h-6 flex items-center justify-center bg-[#b1c733] rounded-full'>
                <i className="fas fa-rss"></i>
              </a>
              <a href="#" className='w-6 h-6 flex items-center justify-center bg-[#b1c733] rounded-full'>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className='w-6 h-6 flex items-center justify-center bg-[#b1c733] rounded-full'>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className='w-6 h-6 flex items-center justify-center bg-[#b1c733] rounded-full'>
                <i className="fab fa-skype"></i>
              </a>
            </div>
            {currentUser ? (
              <Link to='/profile'>
                <img 
                  src={currentUser.avatar} 
                  alt='profile'
                  className='rounded-full h-7 w-7 object-cover'
                />
              </Link>
            ) : (
              <div className='flex gap-2'>
                <Link to='/sign-in' className='hover:text-[#b1c733]'>LOGIN</Link>
                <span>/</span>
                <Link to='/sign-up' className='hover:text-[#b1c733]'>REGISTER</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main White Navbar */}
      <header className='bg-white shadow-md'>
        <div className='flex justify-between items-center max-w-7xl mx-auto p-3'>
          <Link to='/' className='font-bold text-2xl'>
            HomeQuest
          </Link>
          <div className='flex items-center gap-6'>
            <div className='flex gap-6'>
              <Link to='/' className='text-gray-700 hover:text-[#b1c733]'>Home</Link>
              <Link to='/about' className='text-gray-700 hover:text-[#b1c733]'>About us</Link>
              <Link to='/search' className='text-gray-700 hover:text-[#b1c733]'>Listings</Link>
            </div>
            <Link 
              to='/create-listing' 
              className='bg-[#b1c733] text-white px-4 py-2 hover:bg-[#9ab029]'
            >
              SUBMIT LISTING
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
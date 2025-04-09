import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-100 shadow-sm border-b'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4'>
        {/* Logo */}
        <Link to='/'>
          <h1 className='text-2xl font-extrabold text-slate-700'>
            <span className='text-slate-500'>Home</span>
            <span>Quest</span>
          </h1>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className='flex items-center bg-white border border-slate-300 rounded-full px-4 py-1 w-full sm:w-auto max-w-md'
        >
          <input
            type='text'
            placeholder='Search...'
            className='flex-grow bg-transparent focus:outline-none text-slate-700 px-2'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit'>
            <FaSearch className='text-slate-600' />
          </button>
        </form>

        {/* Navigation */}
        <ul className='flex items-center gap-6 text-sm font-medium'>
          <li>
            <Link
              to='/'
              className='text-slate-700 hover:text-slate-900 hover:underline transition'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/about'
              className='text-slate-700 hover:text-slate-900 hover:underline transition'
            >
              About
            </Link>
          </li>
          <li>
            <Link to='/profile'>
              {currentUser ? (
                <img
                  className='rounded-full h-8 w-8 object-cover border border-slate-300 shadow-sm'
                  src={currentUser.avatar}
                  alt='profile'
                />
              ) : (
                <span className='text-slate-700 hover:text-slate-900 hover:underline transition'>
                  Sign in
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}


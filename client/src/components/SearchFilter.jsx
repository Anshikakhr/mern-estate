import { useState } from 'react';

export default function SearchFilter({ onLocationChange }) {
  const [location, setLocation] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    // Pass the raw value to parent component
    onLocationChange(value);
  };

  return (
    <div className='mb-4'>
      <input
        type='text'
        placeholder='Search by location (city, area, address)...'
        className='border p-2 rounded-lg w-full'
        value={location}
        onChange={handleChange}
      />
    </div>
  );
}
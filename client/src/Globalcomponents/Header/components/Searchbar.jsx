import React, { useState } from 'react';
import axiosInstance from '../../../Utils/axiosInstance';
import Seachicon from '../../../assets/searchicon.svg';
import { useNavigate } from 'react-router-dom';

function Searchbar() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    localStorage.setItem('searchValue', value);
  };

  const handleclick = () => {
   if (searchValue != '') {
     navigate(`/search/${searchValue}`)
   }
  };

  return (
    <div className='flex items-center bg-white px-2 rounded-lg'>
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearchChange}
        className='outline-none border-0 p-1 text-black rounded w-40'
      />
      <img onClick={handleclick} className='h-5 cursor-pointer' src={Seachicon} alt="Search" />
    </div>
  );
}

export default Searchbar;

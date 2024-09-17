import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axiosInstance from '../../Utils/axiosInstance';
import Loader from '../../Globalcomponents/Loader/Loader';

const fetchSearchData = async (query) => {
  const response = await axiosInstance.get(`/api/turf/searchturf?q=${query}`);
  return response.data;
};

function Searchpage() {
  const { query } = useParams();
  const navigate = useNavigate()
  const [turfs, setturfs] = useState([]);
  const [filteredTurfs, setFilteredTurfs] = useState([]);
  const [rentFilter, setRentFilter] = useState('All');
  const [sizeFilter, setSizeFilter] = useState('All');

  const { data, error, isLoading } = useQuery(
    ['searchData', query],
    () => fetchSearchData(query),
    {
      enabled: !!query,
      onSuccess: (data) => {
        setturfs(data);
        setFilteredTurfs(data);
        console.log(data);
        
      },
    }
  );

  useEffect(() => {
    let filtered = turfs;

    if (rentFilter !== 'All') {
      filtered = filtered.filter(turf => turf.rent <= rentFilter);
    }

    if (sizeFilter !== 'All') {
      filtered = filtered.filter(turf => turf.size === sizeFilter);
    }

    setFilteredTurfs(filtered);
  }, [rentFilter, sizeFilter, turfs]);

  if (isLoading) return <Loader />;

  const handleRentFilterChange = (e) => {
    setRentFilter(e.target.value);
  };

  const handleSizeFilterChange = (e) => {
    setSizeFilter(e.target.value);
  };


  const handleButtonClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <>
      {/* Filter section */}
      <div className="h-10 bg-secondary border-y text-accent flex gap-4 border-accent px-2 items-center">
        <div>
          <label htmlFor="rentFilter">Rent: </label>
          <select
            id="rentFilter"
            value={rentFilter}
            onChange={handleRentFilterChange}
            className="bg-secondary text-accent border outline-none rounded border-accent text-sm"
          >
            <option className='text-sm' value="All">All</option>
            <option className='text-sm' value="500">Below 500</option>
            <option className='text-sm' value="1000">Below 1000</option>
            <option className='text-sm' value="1500">Below 1500</option>
          </select>
        </div>

        <div>
          <label htmlFor="sizeFilter">Size: </label>
          <select
            id="sizeFilter"
            value={sizeFilter}
            onChange={handleSizeFilterChange}
            className="bg-secondary text-accent border outline-none rounded border-accent"
          >
            <option className='text-sm' value="All">All</option>
            <option className='text-sm' value="Small">Small</option>
            <option className='text-sm' value="Medium">Medium</option>
            <option className='text-sm' value="Large">Large</option>
          </select>
        </div>
      </div>

      {/* Turf list */}
      <div className="flex flex-wrap justify-center md:justify-evenly gap-5 p-10 text-accent font-bold mb-20 h-max">
        {filteredTurfs.length > 0 ? (
          filteredTurfs.map((turf) => (
            <div
              className="w-80 h-100 mb-5 p-1 overflow-hidden"
              key={turf._id}
              onClick={() => handleButtonClick(turf._id)}
            >
              <img className="rounded-xl h-60" src={turf.imgLink} alt={turf.name} />
              <div>
                <h2 className="text-2xl mt-3">{turf.name}</h2>
                <p className="font-normal text-sm mt-1 line-clamp-2">{turf.description}</p>
                <div className="flex justify-between items-center">
                  <p className='mt-1'>{turf.rent}/hour</p>
                  <p>{turf.city}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-accent flex justify-center mt-20 w-screen h-screen text-2xl overflow-hidden">
            No results found...
          </div>
        )}
      </div>
    </>
  );
}

export default Searchpage;

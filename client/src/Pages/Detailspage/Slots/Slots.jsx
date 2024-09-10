import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../../Utils/axiosInstance';
import { setSelectedSlots } from '../../../Utils/Redux/Features/slotSlice';

function Slots() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [slots, setSlots] = useState([]);
  const [noSlots, setNoSlots] = useState(false);
  const { id } = useParams();
  const turfId = id;
  const dispatch = useDispatch();
  const selectedSlots = useSelector(state => state.slots.selectedSlots);

  const getslot = async () => {
    try {
      const response = await axiosInstance.get(`/api/turf/getTurfSlots/${turfId}?date=${selectedDate}`);
      if (response.status === 204 || !response.data.length) {
        setNoSlots(true);
        setSlots([]);
      } else {
        setNoSlots(false);
        setSlots(response.data);
      }
    } catch (error) {
      setNoSlots(true);
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setNoSlots(false);
    localStorage.setItem('selectedDate', newDate);
  };

  const toggleSlotSelection = (slot) => {
    const updatedSlots = selectedSlots.includes(slot)
      ? selectedSlots.filter(s => s !== slot)
      : [...selectedSlots, slot];

    dispatch(setSelectedSlots(updatedSlots));
  };

  useEffect(() => {
    const storedDate = localStorage.getItem('selectedDate');
    if (storedDate) {
      setSelectedDate(storedDate);
    }
    getslot();
  }, [selectedDate]);

  return (
    <div className='font-bold text-accent'>
      <div className='flex justify-between px-4 md:px-6'>
        <h1 className='text-2xl'>Available Slots</h1>
        <input
          type="date"
          className="bg-white text-black rounded border-2 border-black px-1"
          value={selectedDate}
          onChange={handleDateChange}
          min={today}
        />
      </div>

      <div className='flex flex-wrap p-4 mt-10'>
        {noSlots ? (
          <h1>No slots available ....</h1>
        ) : (
          slots
            .filter(slot => slot.status === 'available')
            .map((slot, index) => (
              <div
                key={index}
                className={`mr-2 w-32 rounded-2xl p-2 flex justify-center text-center mb-2 cursor-pointer ${
                  selectedSlots.includes(slot) ? 'bg-gray-400 text-black' : 'bg-accent text-secondary'
                }`}
                onClick={() => toggleSlotSelection(slot)}
              >
                {slot.timeRange}
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Slots;

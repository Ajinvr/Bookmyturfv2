import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axiosInstance from '../../Utils/axiosInstance'
import Loader from '../../Globalcomponents/Loader/Loader'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddTurf() {

  let navigate = useNavigate()

  const notify = (msg, status) => {
    status === 'success' ? toast.success(msg) : toast.error(msg);
  };

  const [formData, setFormData] = useState({
    name: '',
    rent: '',
    size: '',
    description: '',
    address: '',
    pincode: '',
    slots: [],
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const timeSlots = Array.from({ length: 23 }, (_, i) => ({
    start: `${i + 1}:00`,
    end: `${i + 2}:00`,
    value: `${i + 1}:00 - ${i + 2}:00`,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSlotClick = (slotValue) => {
    setFormData((prev) => {
      const newSlots = prev.slots.includes(slotValue)
        ? prev.slots.filter((s) => s !== slotValue)
        : [...prev.slots, slotValue];
      return { ...prev, slots: newSlots };
    });
  };

  
  const mutation = useMutation(async (formData) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    const response = await axiosInstance.post('/api/turf/addTurf', formData, config);
    return response.data;
  }, {
    onSuccess: (data) => {
      console.log('Response data:', data); 
      notify(data.msg, data.ts);

      setTimeout(() => {
        navigate('/manager/assignedTurf')
      }, 1000);
    },
    onError: (error) => {
      notify(error.data.msg, error.data.ts);
      console.error('Error occurred:', error);
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('rent', formData.rent);
    newFormData.append('size', formData.size);
    newFormData.append('description', formData.description);
    newFormData.append('address', formData.address);
    newFormData.append('pincode', formData.pincode);
    newFormData.append('slots', JSON.stringify(formData.slots)); 
    if (image) {
      newFormData.append('file', image);
    }
  
    mutation.mutate(newFormData);
  };
  

  if (mutation.isLoading) {
    return( 
            <div className='text-accent text-2xl text-center mt-2 capitalize'>
              <h1>Hang on tight adding turfs Don't refresh!</h1>
               <Loader/>
            </div>
          )
  }

  return (
    <div className="mt-10 p-4 shadow-lg m-4 ">
      <h1 className="text-3xl font-bold text-accent mb-4">Add New Turf</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input accept="image/*" type="file" onChange={handleImageChange} className="border-accent w-full p-2 border rounded-md" required />

        {preview && (
          <div className="w-full h-80 my-4 overflow-hidden">
            <img src={preview} alt="Image Preview" className=" h-80  border rounded-md" />
          </div>
        )}

        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border-accent w-full p-2 border rounded-md" required />

        <input type="number" name="rent" value={formData.rent} onChange={handleChange} placeholder="Rent" className="border-accent w-full p-2 border rounded-md" required />

        <select name="size" value={formData.size} onChange={handleChange} className="w-full p-2 border border-accent rounded-md" required>
          <option value="" disabled>Select Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className=" border-accent w-full p-2 border rounded-md" required />

        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border-accent w-full p-2 border rounded-md" required />

        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="border-accent w-full p-2 border rounded-md" required />

        <h2 className="text-2xl text-accent font-bold">Select time slots you like to make available for booking</h2>

        <div className="flex flex-wrap p-4 mt-1">
          {timeSlots.map((slot) => (
            <button
              key={slot.value}
              type="button"
              onClick={() => handleSlotClick(slot.value)}
              className={`mr-2 w-32 rounded-2xl p-2 flex justify-center text-center mb-2 cursor-pointer font-bold
                ${formData.slots.includes(slot.value) ? 'bg-gray-400 text-black' : 'bg-accent text-secondary'}`}
            >
              {slot.value}
            </button>
          ))}
        </div>

        <button type="submit" className="w-full p-2 bg-accent text-secondary rounded-md font-bold">Add Turf</button>
      </form>
    </div>
  );
}

export default AddTurf;

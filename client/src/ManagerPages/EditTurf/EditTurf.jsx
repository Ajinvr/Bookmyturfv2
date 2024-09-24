import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import axiosInstance from '../../Utils/axiosInstance';
import Loader from '../../Globalcomponents/Loader/Loader';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function EditTurf() {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTurfData = async () => {
    try {
      const response = await axiosInstance.get(`/api/turf/getTurf/${id}`);
      console.log(response.data.turfs);
      return response.data.turfs;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const { data: turfData, isLoading, error } = useQuery(
    ['turf', id],
    fetchTurfData,
    {
      onError: (error) => {
        toast.error(error.message);
      }
    }
  );

  const [formData, setFormData] = useState({
    name: '',
    rent: '',
    size: '',
    description: '',
    address: '',
    pincode: '',
  });
  
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const loadImage = async (url) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setPreview(objectUrl);
      } catch (err) {
        console.error('Error fetching image:', err);
      }
    };

    if (turfData) {
      setFormData({
        name: turfData.name,
        rent: turfData.rent,
        size: turfData.size,
        description: turfData.description,
        address: turfData.address,
        pincode: turfData.pincode,
      });

      if (turfData.imgLink) {
        loadImage(turfData.imgLink);
      }
    }
  }, [turfData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateTurfData = async (formData) => {
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const response = await axiosInstance.patch(`/api/turf/editTurf/${id}`, formData, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation(updateTurfData, {
    onSuccess: (data) => {
      toast.success(data.msg);
      setTimeout(() => {
        navigate('/admin/allTurf');
      }, 1000);
    },
    onError: (error) => {
      navigate('/admin/allTurf');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('rent', formData.rent);
    newFormData.append('size', formData.size);
    newFormData.append('description', formData.description);
    newFormData.append('address', formData.address);
    newFormData.append('pincode', formData.pincode);
    
    if (image) {
      newFormData.append('file', image);
    }

    try {
      await mutation.mutateAsync(newFormData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className='text-accent text-2xl text-center mt-2 capitalize'>
        <h1>Loading turf data...</h1>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error loading turf data</div>;
  }

  return (
    <div className="mt-10 p-4 shadow-lg m-4">
      <h1 className="text-3xl font-bold text-accent mb-4">Edit Turf</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          className="border-accent w-full p-2 border rounded-md"
        />

        {preview && (
          <div className="w-full h-80 my-4 overflow-hidden">
            <img src={preview} alt="Image Preview" className="h-80 border rounded-md" />
          </div>
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border-accent w-full p-2 border rounded-md"
          required
        />

        <input
          type="number"
          name="rent"
          value={formData.rent}
          onChange={handleChange}
          placeholder="Rent"
          className="border-accent w-full p-2 border rounded-md"
          required
        />

        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          className="w-full p-2 border border-accent rounded-md"
          required
        >
          <option value="" disabled>Select Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border-accent w-full p-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="border-accent w-full p-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="border-accent w-full p-2 border rounded-md"
          required
        />

        <button type="submit" className="w-full p-2 bg-accent text-secondary rounded-md font-bold">Update Turf</button>
      </form>
    </div>
  );
}

export default EditTurf;

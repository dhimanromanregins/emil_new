import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../profile.css"
import Navbar from './Navbar';
export default function Profile() {
  const [profileData, setProfileData] = useState({
    full_name: '',
    profile_image: '',
    phone_number: '',
    profile_image_file: null, // Add profile_image_file state
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    axios.get(`http://20.235.152.209/api/profiles/${storedUserId}/?user_id=${storedUserId}`)
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    if (e.target.type === 'file') {
      // For file input, store the file itself
      setProfileData(prevData => ({
        ...prevData,
        profile_image_file: e.target.files[0],
      }));
    } else {
      // For other inputs, update the state normally
      const { name, value } = e.target;
      setProfileData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUserId = localStorage.getItem('userId');
    
    const formData = new FormData();
    formData.append('user',storedUserId )
    formData.append('full_name', profileData.full_name);
    formData.append('phone_number', profileData.phone_number);
    if (profileData.profile_image_file) {
      formData.append('profile_image', profileData.profile_image_file);
    }

    axios.put(`http://20.235.152.209/api/profiles/${storedUserId}/?user_id=${storedUserId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(response => {
        console.log('Profile data updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating profile data:', error);
      });
  };
  return (
    <>
    <Navbar />
    <div>
      <div className="profile-picture-container">
        {profileData.profile_image && (
          <img className="profile-picture" src={`http://127.0.0.1:8000${profileData.profile_image}`} alt="Profile" />

        )}
      </div>
      <div className="page-container">
  <div className="profile-container">
    <h1>Profile</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="full_name">Full Name:</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={profileData.full_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="profile_image">Profile Image:</label>
        <input
          type="file"
          id="profile_image"
          name="profile_image"
          accept="image/*"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone_number">Phone Number:</label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={profileData.phone_number}
          onChange={handleInputChange}
        />
      </div>
      <div className="text-center">
        <button type="submit">Update Profile</button>
      </div>
    </form>
  </div>
</div>

    </div>
    </>
    
  );
}

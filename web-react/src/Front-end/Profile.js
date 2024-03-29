import './Profile.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = 'http://localhost:8080/';

function Profile() {
  const user = localStorage.getItem('user');
  const [customer, setCustomer] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // console.log(user);
    axios.get(api + 'profile/'+user)
      .then(response => {
        const cusdata = response.data[0];
        // console.log(localStorage);
        // console.log(cusdata);
        setCustomer(cusdata);
      })
      .catch(error => {
        console.log(error);
      });
  }, [user]);

  const handleEditClick = () => {
    setEditMode(true);
  }

  const handleSaveClick = () => {
    axios.put(api + 'profile/'+customer.cus_id, customer)
      .then(response => {
        console.log(response);
        setEditMode(false);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleCancelClick = () => {
    setEditMode(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div>
      <div className='bannerProfile'>
        <img src='.\img\bannerProfile.png'></img>
      </div>

      {customer && (
        <div className='profile'>
          {/* <p>Username: {customer.username}</p> */}
          {editMode ? (
            <div>
              <label>First Name:</label>
              <input type="text" name="cus_fname" value={customer.cus_fname} onChange={handleInputChange} />
              <br />
              <label>Last Name:</label>
              <input type="text" name="cus_lname" value={customer.cus_lname} onChange={handleInputChange} />
              <br />
              <label>Address:</label>
              <input type="text" name="cus_address" value={customer.cus_address} onChange={handleInputChange} />
              <br />
              <label>Phone:</label>
              <input type="text" name="cus_phone" value={customer.cus_phone} onChange={handleInputChange} />
              <br />
              <label>Zipcode:</label>
              <input type="text" name="cus_zipcode" value={customer.cus_zipcode} onChange={handleInputChange} />
              <br />
              <button className='CancelButton' onClick={handleCancelClick}>Cancel</button>
              <button onClick={handleSaveClick}>Save</button>
            </div>
          ) : (
            <div className='showProfile'>
              <p>First Name: {customer.cus_fname}</p>
              <p>Last Name: {customer.cus_lname}</p>
              <p>Address: {customer.cus_address}</p>
              <p>Phone: {customer.cus_phone}</p>
              <p>Zipcode: {customer.cus_zipcode}</p>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;


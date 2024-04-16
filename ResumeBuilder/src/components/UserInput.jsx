import React from 'react';

function UserInput({ userDetails, onInputChange}) {
  return (
    <div className='p-10 w-full'>
    <div className="text-center p-10 bg-[#ADC4CE]">
        <label htmlFor="name">Enter your full name : </label>
      <input
        type="text"
        name="name"
        value={userDetails.name}
        placeholder="Name"
        onChange={onInputChange}
        className='input-field'
      />
      <br />
      <label htmlFor="email">Enter your email : </label>
      <input
        type="email"
        name="email"
        value={userDetails.email}
        placeholder="Email"
        onChange={onInputChange}
        className='input-field'
      />
      <br />
      <label htmlFor="phoneno">Enter your phone number : </label>
      <input
        type="tel"
        name="phoneno"
        value={userDetails.phoneno}
        placeholder="Phone Number"
        onChange={onInputChange}
        className='input-field'
      />
      <br />
      <label htmlFor="description">Enter your description : </label>
      <textarea
        name="description"
        value={userDetails.description}
        placeholder="Description"
        onChange={onInputChange}
        className='input-field'
      />
    </div>
    </div>
  );
}

export default UserInput;
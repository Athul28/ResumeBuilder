import React, { useState } from "react";

function UserInput({ userDetails, onInputChange, handleSubmit }) {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    description: "",
  });


  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <div className="p-10 w-full">
      <div className="text-center p-10 bg-[#ADC4CE]">
        <label htmlFor="name">Enter your full name : </label>
        <input
          type="text"
          name="name"
          value={userDetails.name}
          placeholder="Name"
          onChange={onInputChange}
          className="input-field"
        />
        <br />
        <label htmlFor="email">Enter your email : </label>
        <input
          type="email"
          name="email"
          value={userDetails.email}
          placeholder="Email"
          onChange={onInputChange}
          className="input-field"
        />
        <br />
        <label htmlFor="phoneno">Enter your phone number : </label>
        <input
          type="tel"
          name="phoneno"
          value={userDetails.phoneno}
          placeholder="Phone Number"
          onChange={onInputChange}
          className="input-field"
        />
        <br />
        <label htmlFor="description">Enter your description : </label>
        <textarea
          name="description"
          value={userDetails.description}
          placeholder="Description"
          onChange={onInputChange}
          className="input-field"
        />

        {/* Experiences input */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="jobTitle">Job Title:</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
          />
          <br />
          <label htmlFor="endDate">End Date (Optional):</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <br />
          <button type="submit">Add Experience</button>
        </form>
      </div>
    </div>
  );
}

export default UserInput;

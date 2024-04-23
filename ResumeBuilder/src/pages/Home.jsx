import React, { useState } from "react";
import UserInput from "../components/UserInput";
import UserResume from "../components/UserResume";

function Home() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phoneno: "",
    description: "",
  });

  const [experiences, setExperiences] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newExperience = {
      companyName: event.target.companyName.value, // Access from event object
      jobTitle: event.target.jobTitle.value,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      description: event.target.description.value,
    };

    setExperiences([...experiences, newExperience]);

    // Reset the form after submission
    setFormData({ // Assuming formData is not needed in Home
      companyName: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  return (
    <div>
      {/* ... */}
      <UserInput
        userDetails={userDetails}
        onInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <UserResume userDetails={userDetails} experiences={experiences} />
    </div>
  );
}


export default Home;

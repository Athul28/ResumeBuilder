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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const [experiences, setExperiences] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const newExperience = {
      companyName: event.target.companyName.value,
      jobTitle: event.target.jobTitle.value,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      description: event.target.description.value,
    };

    setExperiences([...experiences, newExperience]);

    // Reset the form after submission
    event.target.reset(); // Reset the form
  };

  return (
    <>
      <p>Resume Builder</p>
      <div className="lg:flex">
        <UserInput
          userDetails={userDetails}
          onInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <UserResume userDetails={userDetails} experiences={experiences} />
      </div>
    </>
  );
}

export default Home;

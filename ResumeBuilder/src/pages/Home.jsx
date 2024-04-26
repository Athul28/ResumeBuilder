import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import UserInput from "../components/UserInput";
import UserResume from "../components/UserResume";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { userLoggedIn } = useAuth();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phoneno: "",
    description: "",
  });
  useEffect(() => {
    if (currentUser) {
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", currentUser.uid)
      );
      const unsubscribe = onSnapshot(userQuery, (snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(usersData);
        setLoading(false);
        setUserDetails(prevUserDetails => ({
          ...prevUserDetails,
          name: currentUser.displayName,
          email: currentUser.email,
        }))
      });
      return unsubscribe;
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleExpInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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

    setFormData({
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleDelete = (index) => {
    const updatedExperiences = experiences.filter(
      (experience, i) => i !== index
    );
    setExperiences(updatedExperiences);
  };

  //Skills
  const [skills, setSkills] = useState([]);

  //Project
  const [projects, setProjects] = useState([]);

  //Education
  const [education, setEducation] = useState([]);

  return (
    <>
      <div className={`lg:flex ${userLoggedIn ? 'mt-12':'mt-6'}`}>
        <UserInput
          userDetails={userDetails}
          onInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          experiences={experiences}
          handleDelete={handleDelete}
          formData={formData}
          handleInputChange={handleExpInputChange}
          skills={skills}
          setSkills={setSkills}
          projects={projects}
          setProjects={setProjects}
          education={education}
          setEducation={setEducation}
        />
        <UserResume
          userDetails={userDetails}
          experiences={experiences}
          skills={skills}
          education={education}
          projects={projects}
        />
      </div>
    </>
  );
}

export default Home;

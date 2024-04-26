import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import UserInput from "../components/UserInput";
import UserResume from "../components/UserResume";
import { collection, updateDoc, getDocs, query, where, addDoc, onSnapshot  } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
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
        if (usersData.length > 0) {
          const firstUser = usersData[0];
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            name: currentUser.displayName,
            email: currentUser.email,
            phoneno: firstUser.phoneNo,
            description:firstUser.description
          }));
        }
      });
      return unsubscribe;
    }
  }, [currentUser]);

  const handleBackendDataSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userQuery = query(collection(db, "users"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(userQuery);
  
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        // Ensure description is defined before updating Firestore
        const updatedData = {
          phoneNo: userDetails.phoneno || "", // Use empty string if phoneno is undefined
          description: userDetails.description || "", // Use empty string if description is undefined
          createdAt: new Date(),
        };
        await updateDoc(docRef, updatedData);
      } else {
        // Create a new document with user details
        await addDoc(collection(db, "users"), {
          phoneNo: userDetails.phoneno || "", // Use empty string if phoneno is undefined
          description: userDetails.description || "", // Use empty string if description is undefined
          createdAt: new Date(),
          userId: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      }
      setError(null);
    } catch (err) {
      setError("Failed to submit: " + err.message);
    }
  };
  
  

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
          handleBackendDataSubmit={handleBackendDataSubmit}
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

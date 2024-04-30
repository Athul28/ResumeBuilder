import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import UserInput from "../components/UserInput";
import UserResume from "../components/UserResume";
import {
  collection,
  updateDoc,
  getDocs,
  query,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ThreeDots } from 'react-loading-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        setUserDetails((prevUserDetails) => ({
          ...prevUserDetails,
          name: currentUser.displayName,
          email: currentUser.email,
        }));
        if (usersData.length > 0) {
          const firstUser = usersData[0];
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            phoneno: firstUser.phoneNo,
            description: firstUser.description,
          }));
          setSkills(firstUser.skills);
          if (firstUser.experiences) {
            setExperiences(firstUser.experiences);
          }
          if (firstUser.education) {
            setEducation(firstUser.education);
          }
          if (firstUser.projects) {
            setProjects(firstUser.projects);
          }
        }
      });
      return unsubscribe;
    }else{
      setLoading(false);
    }
  }, [currentUser]);

  const notify=()=>{
    toast("Please LogIn to save",{
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  const handleBackendDataSubmit = async (e) => {
    e.preventDefault();

    if(!userLoggedIn){
      toast.warning("Please LogIn to save");
    }else{

    try {
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", currentUser.uid)
      );
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
      toast.success("Details saved")
    } catch (err) {
      setError("Failed to submit: " + err.message);
    }}
  };

  //Skills
  const [skills, setSkills] = useState([]);

  const addSkillToBackend = async () => {
    if(!userLoggedIn){
      toast.warning("Please LogIn to save");
    }else{
    try {
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        // Ensure description is defined before updating Firestore
        // console.log(skills)
        const updatedData = {
          skills: skills,
          createdAt: new Date(),
        };
        await updateDoc(docRef, updatedData);
      } else {
        // Create a new document with user details
        await addDoc(collection(db, "users"), {
          skills: skills,
          createdAt: new Date(),
          userId: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      }
      setError(null);
      toast.success("Details saved")
    } catch (err) {
      setError("Failed to submit: " + err.message);
    }}
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

  const addExperienceToBackend = async () => {
    if(!userLoggedIn){
      toast.warning("Please LogIn to save");
    }else{
    try {
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        // Ensure description is defined before updating Firestore
        // console.log(skills)
        const updatedData = {
          experiences: experiences,
          createdAt: new Date(),
        };
        await updateDoc(docRef, updatedData);
      } else {
        // Create a new document with user details
        await addDoc(collection(db, "users"), {
          experiences: experiences,
          createdAt: new Date(),
          userId: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      }
      setError(null);
      toast.success("Details saved")
    } catch (err) {
      setError("Failed to submit: " + err.message);
    }}
  };

  //Project
  const [projects, setProjects] = useState([]);

  const addProjectsToBackend = async () => {
    if(!userLoggedIn){
      toast.warning("Please LogIn to save");
    }else{
    console.log("Working");
    try {
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        // Ensure description is defined before updating Firestore
        // console.log(skills)
        const updatedData = {
          projects: projects,
          createdAt: new Date(),
        };
        await updateDoc(docRef, updatedData);
      } else {
        // Create a new document with user details
        await addDoc(collection(db, "users"), {
          projects: projects,
          createdAt: new Date(),
          userId: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      }
      setError(null);
      toast.success("Details saved")
    } catch (err) {
      setError("Failed to submit: " + err.message);
    }}
  };

  //Education
  const [education, setEducation] = useState([]);

  const addEducationToBackend = async () => {
    if(!userLoggedIn){
      toast.warning("Please LogIn to save");
    }else{
    console.log("Working");
    try {
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        // Ensure description is defined before updating Firestore
        // console.log(skills)
        const updatedData = {
          education: education,
          createdAt: new Date(),
        };
        await updateDoc(docRef, updatedData);
      } else {
        // Create a new document with user details
        await addDoc(collection(db, "users"), {
          education: education,
          createdAt: new Date(),
          userId: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      }
      setError(null);
      toast.success("Details saved")
    } catch (err) {
      setError("Failed to submit: " + err.message);
    }}
  };


  return (
    <>
      {loading ? (
        <div className="mt-[350px] text-white text-xl text-center">
          Loading...
          <ThreeDots className="m-auto"/>
          </div>
      ) : (
        <div className={`lg:flex ${userLoggedIn ? "mt-12 max-sm:mt-[55px]" : "mt-6 max-sm:mt-[65px]"}`}>
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
            addSkillToBackend={addSkillToBackend}
            addExperienceToBackend={addExperienceToBackend}
            addProjectsToBackend={addProjectsToBackend}
            addEducationToBackend={addEducationToBackend}
          />
          <UserResume
            userDetails={userDetails}
            experiences={experiences}
            skills={skills}
            education={education}
            projects={projects}
          />
          <ToastContainer className="max-sm:w-[200px] max-sm:m-5" />
        </div>
      )}
    </>
  );
}

export default Home;

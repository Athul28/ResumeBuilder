import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

function UserInput({
  userDetails,
  onInputChange,
  formData,
  handleInputChange,
  handleSubmit,
  experiences,
  handleDelete,
  skills,
  setSkills,
  projects,
  setProjects,
  education,
  setEducation,
}) {
  const [newSkill, setNewSkill] = useState("");
  const handleSkills = (e) => {
    setNewSkill(e.target.value);
  };

  const handleAddSkill = (e) => {
    setSkills((s) => [...s, newSkill]);
    setNewSkill("");
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((skill, i) => i != index);
    setSkills(updatedSkills);
  };

  //Projects

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    link: "",
  });
  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleProjectsSubmission = (e) => {
    e.preventDefault();

    const newProject = {
      name: projectData.name,
      description: projectData.description,
      link: projectData.link,
    };

    setProjects((prevProjects) => [...prevProjects, newProject]);
    setProjectData({
      name: "",
      description: "",
      link: "",
    });
  };

  const handleDeleteProject=(index)=>{
    const newProjects=projects.filter((project,i)=>{
      return i!==index
    })
    setProjects(newProjects)
  }

  //Education

  const [educationData, setEducationData] = useState({
    collegeName: "",
    degree: "",
    completionDate: "",
    marks: "",
  });
  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducationData({ ...educationData, [name]: value });
  };
  const handleEducationDataSubmission = (e) => {
    e.preventDefault();
    const newEducation = {
      collegeName: educationData.collegeName,
      degree: educationData.degree,
      completionDate: educationData.completionDate,
      marks: educationData.marks,
    };
    setEducation([...education, newEducation]);
    setEducationData({
      collegeName: "",
      degree: "",
      completionDate: "",
      marks: "",
    });
  };

  return (
    <div className="p-10 w-full">
      <div className="text-center p-10 bg-[#ADC4CE] shadow-xl">
        <p className="input-title">Enter your personal details : </p>
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
        <hr className="border-black m-4" />
        {/* Experiences input */}
        <p className="input-title">Experiences : </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="companyName">Company Name : </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <br />
          <label htmlFor="jobTitle">Job Title : </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <br />
          <label htmlFor="startDate">Start Date : </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="input-field"
          />
          <br />
          <label htmlFor="endDate">End Date (Optional) : </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="input-field"
          />
          <br />
          <label htmlFor="description">Description : </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="input-field"
          />
          <br />
          <button type="submit" className="bg-cyan-700 text-white p-2 mt-2">
            Add Experience
          </button>
        </form>
        <div>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="flex w-[250px] rounded-md mx-auto justify-between p-2 bg-cyan-700 mt-3"
            >
              <div className="text-white">
                <p className="text-xl">{experience.jobTitle}</p>
                <p>{experience.companyName}</p>
              </div>
              <div
                className="bg-red-600 h-fit my-auto text-xl text-white p-1 rounded-sm"
                onClick={() => handleDelete(index)}
              >
                <MdDelete />
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <hr className="border-black m-4" />
        <p className="input-title">Add your Projects : </p>
        <form onSubmit={handleProjectsSubmission}>
          <label htmlFor="name">Project name : </label>
          <input
            type="text"
            id="name"
            name="name"
            value={projectData.name}
            onChange={handleProjectChange}
            className="input-field"
            required
          />
          <br />
          <label htmlFor="description">Project description : </label>
          <input
            type="text"
            name="description"
            value={projectData.description}
            onChange={handleProjectChange}
            className="input-field"
            required
          />
          <br />
          <label htmlFor="link">Project link : </label>
          <input
            type="text"
            name="link"
            value={projectData.link}
            onChange={handleProjectChange}
            className="input-field"
          />
          <br />
          <button type="submit" className="bg-cyan-700 text-white p-2 mt-2">
            Add Project
          </button>
        </form>
        {projects.map((project, index) => (
          <div key={index} className="flex w-[250px] rounded-md mx-auto text-white justify-between p-2 bg-cyan-700 mt-3">
            <p>{project.name}</p>
            <div
                className="bg-red-600 h-fit my-auto text-xl text-white p-1 rounded-sm mx-2 cursor-pointer"
                onClick={() => handleDeleteProject(index)}
              >
                <MdDelete />
              </div>
          </div>
        ))}

        {/* Education */}
        <hr className="border-black m-4" />
        <p className="input-title">Enter your education details : </p>
        <form onSubmit={handleEducationDataSubmission}>
          <label htmlFor="collegename">Enter College name : </label>
          <input
            type="text"
            name="collegeName"
            value={educationData.collegeName}
            onChange={handleEducationChange}
            className="input-field"
          />
          <br />
          <label htmlFor="degreename">Enter degree name : </label>
          <input
            type="text"
            name="degree"
            value={educationData.degree}
            onChange={handleEducationChange}
            className="input-field"
          />
          <br />
          <label htmlFor="completiondate">Enter the completion Date : </label>
          <input
            type="date"
            name="completionDate"
            value={educationData.completionDate}
            onChange={handleEducationChange}
            className="input-field"
          />
          <br />
          <label htmlFor="marks">Enter your final marks : </label>
          <input
            type="number"
            name="marks"
            value={educationData.marks}
            onChange={handleEducationChange}
            className="input-field"
          />
          <br />
          <button type="submit" className="bg-cyan-700 text-white p-2 mt-2">
            Add Details
          </button>
        </form>
        {education.map((edu, index) => (
          <div key={index}>
            <p>{edu.collegeName}</p>
            {/* Display other education details */}
          </div>
        ))}

        <hr className="border-black m-4" />
        <p className="input-title">Add your skills : </p>
        <input
          type="text"
          value={newSkill}
          onChange={handleSkills}
          className="input-field"
        />
        <button
          onClick={handleAddSkill}
          className="bg-cyan-700 m-2 p-2 text-white rounded-sm"
        >
          Add
        </button>
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex w-fit bg-cyan-700 text-white px-3 py-1 m-2 rounded-xl"
            >
              <p className="text-xl">{skill}</p>
              <IoClose
                onClick={() => handleDeleteSkill(index)}
                className="my-auto text-2xl cursor-pointer ml-3"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserInput;

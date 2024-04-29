import React, { useState, useEffect } from "react";
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
  handleBackendDataSubmit,
  addSkillToBackend,
  addExperienceToBackend,
  addProjectsToBackend,
  addEducationToBackend,
}) {
  const [newSkill, setNewSkill] = useState("");
  const handleSkills = (e) => {
    setNewSkill(e.target.value);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() !== "") {
      setSkills((s) => [...s, newSkill]);
      setNewSkill("");
    }
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

  const handleDeleteProject = (index) => {
    const newProjects = projects.filter((project, i) => {
      return i !== index;
    });
    setProjects(newProjects);
  };

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

  const handleDeleteEducation = (index) => {
    const newEducation = education.filter((edu, i) => {
      return i !== index;
    });
    setEducation(newEducation);
  };

  return (
    <div className="p-10 max-sm:p-3 lg:w-3/5 w-full">
      <div className="p-10 max-sm:p-5 bg-[#ADC4CE] shadow-xl">
        <p className="input-title">Enter your personal details : </p>
        <form onSubmit={handleBackendDataSubmit}>
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
          <br />
          <button type="submit" className="bg-green-600 text-white p-2 mt-2">
            Save
          </button>
        </form>
        <hr className="border-black my-4" />
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
            placeholder="Company name"
            className="input-field"
            required
          />
          <br />
          <label htmlFor="jobTitle">Job Title : </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            placeholder="Job Title"
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
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="input-field"
          />
          <br />
          <button type="submit" className="bg-cyan-700 text-white p-2 mt-2">
            Add Experience
          </button>        <button
          onClick={addExperienceToBackend}
          className="bg-green-600 m-2 p-2 text-white rounded-sm"
          formNoValidate
        >
          Save
        </button>
        </form>

        <div>
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="flex w-[250px] rounded-md mx-auto justify-between p-2 bg-cyan-900 mt-3"
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
        <hr className="border-black my-4" />
        <p className="input-title">Add your Projects : </p>
        <form onSubmit={handleProjectsSubmission}>
          <label htmlFor="name">Project name : </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Project Name"
            value={projectData.name}
            onChange={handleProjectChange}
            className="input-field"
            required
          />
          <br />
          <label htmlFor="description">Project description : </label>
          <textarea
            name="description"
            value={projectData.description}
            placeholder="Description"
            onChange={handleProjectChange}
            className="input-field"
            required
          />
          <br />
          <label htmlFor="link">Project link : </label>
          <input
            type="text"
            name="link"
            placeholder="Link"
            value={projectData.link}
            onChange={handleProjectChange}
            className="input-field"
          />
          <br />
          <button type="submit" className="bg-cyan-700 text-white p-2 mt-2">
            Add Project
          </button>        <button
          onClick={addProjectsToBackend}
          className="bg-green-600 text-white p-2 m-2" formNoValidate
        >
          Save
        </button>
        </form>

        {projects.map((project, index) => (
          <div
            key={index}
            className="flex w-[250px] rounded-md mx-auto text-white justify-between p-2 bg-cyan-900 mt-3"
          >
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
        <hr className="border-black my-4" />
        <p className="input-title">Enter your education details : </p>
        <form onSubmit={handleEducationDataSubmission}>
          <label htmlFor="collegename">Enter College name : </label>
          <input
            type="text"
            name="collegeName"
            value={educationData.collegeName}
            placeholder="College Name"
            onChange={handleEducationChange}
            className="input-field"
          />
          <br />
          <label htmlFor="degreename">Enter degree name : </label>
          <input
            type="text"
            name="degree"
            value={educationData.degree}
            placeholder="Degree"
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
            placeholder="Percentage/CGPA"
            className="input-field"
          />
          <br />
          <button type="submit" className="bg-cyan-700 text-white p-2 mt-2">
            Add Details
          </button>        <button
          onClick={addEducationToBackend}
          className="bg-green-600 text-white p-2 m-2"
          formNoValidate
        >
          Save
        </button>
        </form>

        {education.map((edu, index) => (
          <div key={index}
          className="flex w-[250px] rounded-md mx-auto text-white justify-between p-2 bg-cyan-900 mt-3">
            <p>{edu.collegeName}</p>
            <div
              className="bg-red-600 h-fit my-auto text-xl text-white p-1 rounded-sm mx-2 cursor-pointer"
              onClick={() => handleDeleteEducation(index)}
            >
              <MdDelete />
            </div>
          </div>
        ))}

        <hr className="border-black my-4" />
        <p className="input-title">Add your skills : </p>
        <input
          type="text"
          value={newSkill}
          onChange={handleSkills}
          placeholder="Skills"
          className="input-field"
        />
        <button
          onClick={handleAddSkill}
          className="bg-cyan-700 m-2 p-2 text-white rounded-sm"
        >
          Add
        </button>
        <button
          onClick={addSkillToBackend}
          className="bg-green-600 text-white p-2 m-2"
        >
          Save
        </button>
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex w-fit bg-cyan-900 text-white px-3 py-1 m-2 rounded-xl"
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

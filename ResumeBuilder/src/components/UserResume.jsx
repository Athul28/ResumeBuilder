import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

function UserResume({ userDetails, experiences, skills, education, projects }) {
  const resumeRef = useRef(null);

  const handleDownload = () => {
    const options = {
      margin: [0, 0, 20, 0],
      filename: "cv.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(resumeRef.current).set(options).save("resume.pdf");
  };

  return (
    <div className="max-lg:p-3 p-10 w-full" id="user-resume-2">
      <div className="overflow-auto">
        <div className="p-10 bg-white shadow-xl w-[800px]" ref={resumeRef}>
          <p className="text-center text-3xl font-bold">{userDetails.name}</p>
          <br />
          <div className="flex justify-center">
            <p className="w-[50%] text-right px-2">
              Email : {userDetails.email}
            </p>
            <span>|</span>
            <p className="w-[50%] px-2">PhoneNo : {userDetails.phoneno}</p>
          </div>
          <br />
          <hr className="border border-black" />
          <div>
            <p className="resume-heading">Description</p>
            <p>{userDetails.description}</p>
          </div>
          <br />
          <hr className="border border-black" />
          <div>
            <p className="resume-heading">Experience</p>
            <ul className="list-disc">
              {experiences.map((experience, index) => (
                <li key={index}>
                  <p className="font-bold">Job Title: {experience.jobTitle}</p>
                  <p>Company Name: {experience.companyName}</p>
                  <p>Start Date: {experience.startDate}</p>
                  <p>End Date: {experience.endDate}</p>
                  <p>Description: {experience.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <br />
          <hr className="border border-black" />
          <div>
            <p className="resume-heading">Projects</p>
            <ul className="list-disc">
              {projects.map((p, index) => (
                <li key={index}>
                  <p className="font-bold">{p.name}</p>
                  <p>{p.description}</p>
                  <a href={p.link} className="text-blue-500">{p.link}</a>
                </li>
              ))}
            </ul>
          </div>
          <br />
          <hr className="border border-black" />
          <div>
            <p className="resume-heading">Education</p>
            {education.map((edu, index) => (
              <ul key={index} className="list-disc">
                <li>
                  <p className="font-bold">{edu.degree}</p>
                <p>College Name : {edu.collegeName}</p>
                <p>Completion Date : {edu.completionDate}</p>
                <p>Marks : {edu.marks}</p>
                </li>
              </ul>
            ))}
          </div>
          <br />
          <hr className="border border-black" />
          <div>
            <p className="resume-heading">Skills</p>
            {skills.map((skill, index) => (
              <div key={index}>
                <p>{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="bg-cyan-700 text-white p-2 mt-2"
      >
        Download Resume
      </button>
    </div>
  );
}

export default UserResume;

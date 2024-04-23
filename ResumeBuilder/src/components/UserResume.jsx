import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

function UserResume({ userDetails, experiences }) {
  const { companyName, jobTitle, startDate, endDate, description } =
    experiences;

  const resumeRef = useRef(null);
  const handleDownload = () => {
    console.log("Download");
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
    <div className="p-10 w-full" id="user-resume-2" ref={resumeRef}>
      <div className="p-10 bg-[#F1F0E8]">
        <p className="text-center text-3xl font-bold">{userDetails.name}</p>
        <div className="flex justify-center">
          <p className="w-full text-right px-2">Email : {userDetails.email}</p>
          <span>|</span>
          <p className="w-full px-2">PhoneNo : {userDetails.phoneno}</p>
        </div>
        <hr className="border border-black" />
        <div>
          <p className="resume-heading">Description : </p>
          <p>{userDetails.description}</p>
        </div>
        <hr className="border border-black" />
        <div>
          <div className="resume-heading">Experience : </div>
        </div>
        <hr className="border border-black" />
        <div>
          <div className="resume-heading">Projects : </div>
        </div>
        <hr className="border border-black" />
        <div>
          <div className="resume-heading">Education : </div>
        </div>
        <hr className="border border-black" />
        <div>
          <div className="resume-heading">Skills : </div>
        </div>
        <div className="experiences">
          {experiences.map((experience, index) => (
            <p key={index} experience={experience} /> // Use index as key
          ))}
        </div>
      </div>
      <button onClick={handleDownload}>Download Resume</button>
    </div>
  );
}

export default UserResume;

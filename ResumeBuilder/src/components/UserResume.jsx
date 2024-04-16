import React from "react";

function UserResume({ userDetails}) {
  return (
    <div className="p-10 w-full">
    <div className="bd p-10 bg-[#F1F0E8]">
      <p className="text-center text-3xl font-bold">{userDetails.name}</p>
      <div className="flex justify-center">
        <p className="w-full text-right px-2">
          Email : {userDetails.email}
        </p>
        <span>|</span>
        <p className="w-full px-2">PhoneNo : {userDetails.phoneno}</p>
      </div>
      <hr className="border border-black"/>
      <div>
        <p className="resume-heading">Description : </p>
        <p>{userDetails.description}</p>
      </div>
      <hr className="border border-black"/>
      <div>
        <div className="resume-heading">Experience : </div>
      </div>
      <hr className="border border-black"/>
      <div>
        <div className="resume-heading">Projects : </div>
      </div>
      <hr className="border border-black"/>
      <div>
        <div className="resume-heading">Education : </div>
      </div>
      <hr className="border border-black"/>
      <div>
        <div className="resume-heading">Skills : </div>
      </div>
    </div>
    </div>
  );
}

export default UserResume;
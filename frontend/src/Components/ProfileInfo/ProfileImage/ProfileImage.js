import "./ProfileImage.css"
import DefaultProfile from "../../Images/default-profile.png";
import React from "react";

function ProfileImage() {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
    const reader = new FileReader();
    const {current} = uploadedImage;
    current.file = file;
    reader.onload = (e) => {
      current.src = e.target.result;
    }
    reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-image">
      <img
        src={DefaultProfile}
        ref={uploadedImage}
        width="210px"
        height="210px"
        alt="profile"
        className="profile-img"
      />
      <label className="img-upload">EDIT
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          ref={imageUploader}
          multiple= "false"
        />
      </label>
    </div>
  );
}

export default ProfileImage;
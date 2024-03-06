import "./ProfileInfo.css";
import React from "react";
import ProfileImage from "./ProfileImage/ProfileImage";
import ProfileFields from "./ProfileFields/ProfileFields";

import { useEffect, useState } from 'react';

function ProfileInfo() {
    return (
    <div className="profile">
      <div className="profile-info">
        <ProfileImage/>
        <ProfileFields/>
      </div>
    </div>
  );
}

export default ProfileInfo;

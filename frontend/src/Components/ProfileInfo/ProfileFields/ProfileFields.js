import "./ProfileFields.css"
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

import { useEffect, useState } from 'react';

function ProfileFields(props) {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    async function setProps() {
	let request = await fetch("http://localhost:4000/get-user", {
	    method: "GET",
	    headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	    },
	    credentials: "include",
	}).catch((error) => {
	    console.error(error);
	    return;
	});
	let response = await request.json().catch((error) => {
	    console.error(error);
	    return;
	});
	if (response) {
	    setUsername(response.username);
	    setName(response.name);
	}

    }
    function updateNames({name, value, previousValue}) {
	console.log("setting names");
	console.log(name);
	console.log(value);
	let url = "http://localhost:4000/update-" + name;
	fetch(url, {
	    method: "POST",
	    headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	    },
	    body: JSON.stringify({value: value}),	   
	    credentials: "include",
	}).catch((error) => {
	    console.error(error);
	    return;
	});
    }
    useEffect(() => {
	setProps();
    }, []);
  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <hr/>
        <div className="field-header">PERSONAL INFO</div>
        <hr/>
      </div>
      <div className="profile-fields">
        <div className="field-wrapper">
          <div className="header">NAME</div>
          <EditText 
      className="edit-text"
      name="name"
            showEditButton 
            inline 
      defaultValue={name}
      onSave={updateNames}
          />
        </div>
        <div className="field-wrapper">
          <div className="header">USERNAME</div>
          <EditText
      name="username"
            className="edit-text" 
            showEditButton 
            inline 
      defaultValue={username}
      onSave={updateNames}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileFields;

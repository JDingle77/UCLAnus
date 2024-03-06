import "./ProfileFields.css"
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

function ProfileFields() {
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
                        showEditButton 
                        inline 
                        defaultValue="GENE BLOCK"
                    />
                </div>
                <div className="field-wrapper">
                    <div className="header">USERNAME</div>
                    <EditText 
                        className="edit-text" 
                        showEditButton 
                        inline 
                        defaultValue="@GENEBLOCK"
                    />
                </div>
            </div>
        </div>
    );
}

export default ProfileFields;
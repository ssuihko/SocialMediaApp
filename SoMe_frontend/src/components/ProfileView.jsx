import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";

function Profile() {
  const context = useContext(AppContext);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setFormData(context.loggedInUser);
  }, [context.loggedInUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to update contact information
  };

  return (
    <div>
      <h4>Profile</h4>
      {formData === null ? (
        <p>Loading...</p>
      ) : (
        <div className="profile-container">
          <img
            src={formData.profileImg}
            alt="Blank Profile"
            className="blank-profile-pic"
          />
          <div className="profile">
            {formData.firstName} {formData.lastName}
          </div>
          <hr />
          <div className="profile-section">
            <h5>Account Info</h5>
            <form className="profile-info" onSubmit={handleSubmit}>
              <label htmlFor="firstName">First Name*</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <label htmlFor="lastName">Last Name*</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="username">Username*</label>
              <input
                type="username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <button type="submit">Update</button>
            </form>
          </div>
          <div className="profile-section"></div>
        </div>
      )}
    </div>
  );
}

export default Profile;

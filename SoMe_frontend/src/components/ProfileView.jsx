import { useState } from "react";

function Profile() {
  const contacts = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john@example.com",
      image: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      email: "jane@example.com",
      image: "",
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      username: "bobjohnson",
      email: "bob@example.com",
      image: "",
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

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
      <div className="profile-container">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/534/006/original/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
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
    </div>
  );
}

export default Profile;

import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";

function Profile() {
  const context = useContext(AppContext);
  const { userId } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const thisUser = context.users.find(
      (x) => parseInt(x.userId) === parseInt(userId)
    );
    setFormData(thisUser);
  }, [context.users, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7234/users/${userId}?userId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      // Assuming the response contains the updated user data
      const updatedUser = await response.json();
      // Update the user data in the context
      context.setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === updatedUser.userId ? updatedUser : user
        )
      );
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
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

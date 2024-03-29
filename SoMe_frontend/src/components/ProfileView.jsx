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

      const updatedUser = await response.json();

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
            <form className="profile-info" onSubmit={handleSubmit}>
              <div className="grid-container">
                <div>
                  <label htmlFor="firstName">First Name*</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name*</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="username">Username*</label>
                  <input
                    type="username"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button className="Update-profile-btn" type="submit">
                Update
              </button>
            </form>
          </div>
          <div className="profile-section"></div>
        </div>
      )}
    </div>
  );
}

export default Profile;

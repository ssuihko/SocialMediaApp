import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";

const API_URL = "https://localhost:7234/users/";

function Profile() {
  const context = useContext(AppContext);
  const { userId } = useParams();
  const [formData, setFormData] = useState(null);
  // const [updateFlag, setUpdateFlag] = useState(false);

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

  // UPDATE
  const handleUpdateProfile = (formDataNew) => {
    let updatedList = context.users.map((u) => {
      if (parseInt(u.userId) === parseInt(formDataNew.userId)) {
        return { ...u, ...formDataNew };
      }
      return u;
    });

    const PUT_URL = API_URL + formDataNew.userId;

    const putOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataNew),
    };

    console.log("formData: ", formData);

    console.log("url: ", PUT_URL);

    console.log("updated list: ", updatedList);

    fetch(PUT_URL, putOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Something went wrong! Status: ${res.status}`);
      })
      .then(() => {
        context.setContacts([...updatedList]);
      })
      .catch((err) => {
        console.log("error occured: ", err);
      });

    setFormData(formDataNew);
  };

  // UpdateUserPayload(string username, string firstName, string lastName, string email, string profileImage);

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
            <form
              className="profile-info"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile(formData);
              }}
            >
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
              <label htmlFor="profileImg">Profile image*</label>
              <input
                type="profileImg"
                id="profileImg"
                name="profileImg"
                value={formData.profileImg}
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

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/Edituser.css";
import iconuser from "../Images/user.png";
import iconpass from "../Images/key.png";
import logo from "../Images/logo1.png";

function Edit() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1010/edit/${userId}`);
        const data = await response.json();

        if (data.status === "ok") {
          setUsername(data.user.username);
          setEmail(data.user.email);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error during API request:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleEdit = async () => {
    const newPassword = "123456789";

    try {
      const response = await fetch(`http://localhost:1010/edit/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "ok") {
        navigate("/users");
      } else {
        console.error("Error editing user:", data.message);
      }
    } catch (error) {
      console.error("Error during edit request:", error);
    }
  };

  return (
    <div className="Container-login">
      <div className="header">
        <div className="text">
          <img className="logologin" src={logo} alt="Logo" />
        </div>
      </div>
      <div className="headerinput">
        <div className="textinput">
          <img className="iconusers" src={iconuser} alt="User Icon" />
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="textinput">
          <img className="iconusers" src={iconpass} alt="Password Icon" />
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="textinput button">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;

import React, { useState, useEffect } from "react";
import Sidenav from "../Navigations/Sidenav";
import Navbar from "../Navigations/Navbar";
import axios from "axios";
import { BASE_URL } from "../../../utils/globals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Presenters() {
  const [presenters, setPresenters] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    nickname: "",
    bio: "",
    avatar: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingPresenterId, setEditingPresenterId] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    const fetchPresenters = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/presenters`);
        setPresenters(response.data);
      } catch (error) {
        toast.error("Error fetching presenters");
        console.error("Error fetching presenters:", error);
      }
    };

    fetchPresenters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("fullname", formData.fullname);
    form.append("nickname", formData.nickname);
    form.append("bio", formData.bio);
  
    if (formData.avatar) {
      form.append("avatar", formData.avatar);
    }
  
    try {
      if (isEditing) {
        console.log("Editing presenter with ID:", editingPresenterId); // Add this line
  
        if (!editingPresenterId) {
          toast.error("Presenter ID is missing");
          return;
        }
  
        await axios.put(`${BASE_URL}/presenters/${editingPresenterId}`, form);
        toast.success("Presenter updated successfully");
      } else {
        await axios.post(`${BASE_URL}/presenters`, form);
        toast.success("Presenter added successfully");
      }
  
      setFormData({
        fullname: "",
        nickname: "",
        bio: "",
        avatar: null,
      });
      setIsEditing(false);
      setEditingPresenterId(null);
  
      const response = await axios.get(`${BASE_URL}/presenters`);
      setPresenters(response.data);
    } catch (error) {
      toast.error(
        isEditing
          ? "Failed to update presenter. Please try again"
          : "Failed to add presenter. Please try again"
      );
      console.error(
        isEditing
          ? "Error updating presenter:"
          : "Error adding new presenter:",
        error
      );
    }
  };
  

  const handleEditPresenter = (presenter) => {
    console.log("Editing presenter:", presenter);
    setIsEditing(true);
    setEditingPresenterId(presenter._id);
  
    setFormData({
      fullname: presenter.fullname,
      nickname: presenter.nickname,
      bio: presenter.bio,
      avatar: null,
    });
  };
  
  

  return (
    <div>
      <div className="dash_board">
        <div className="dash-sidenav">
          <Sidenav />
        </div>

        <div className="dash-navbar">
          <Navbar />
          <div className="presenter-section">
            <form onSubmit={handleSubmit}>
              <label>
                Fullname:
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />

              <label>
                Nickname:
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />

              <label>
                Bio:
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />

              <label>
                Avatar:
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  onChange={handleChange}
                />
              </label>
              <br />

              <button className="presenter-btn" type="submit">
                {isEditing ? "Update Presenter" : "Add Presenter"}
              </button>
            </form>
          </div>

          <div className="presenters-list">
            <div className="presenters-imageholder">
              {presenters &&
                presenters.map((item) => (
                  <div className="presenter-one" key={item._id}>
                    <div className="presenter-border">
                      <div className="pr-bgclr">
                        <div className="presenter-img">
                          <img src={item.avatar} alt={item.fullname} />
                          <h3>{item.fullname}</h3>
                          <h4>{item.nickname}</h4>
                          <p>{item.bio}</p>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div>
                      <button
                        className="presenter-button"
                        onClick={() => handleEditPresenter(item)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Presenters;

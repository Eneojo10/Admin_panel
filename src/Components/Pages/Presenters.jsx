import React, { useState, useEffect } from "react";
import Sidenav from "../Navigations/Sidenav";
import Navbar from "../Navigations/Navbar";
import axios from "axios";
import { BASE_URL } from "../../../utils/globals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Presenters() {
  const [presenter, setPresenter] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    nickname: "",
    bio: "",
    avatar: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    const fetchPresenter = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/presenters`);
        setPresenter(response.data);
      } catch (error) {
        toast.error("Error fetching presenters");
        console.error("Error fetching presenters:", error);
      }
    };

    fetchPresenter();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("fullname", formData.fullname);
      form.append("nickname", formData.nickname);
      form.append("bio", formData.bio);
      form.append("avatar", formData.avatar);

      await axios.post(`${BASE_URL}/presenters`, form);

      toast.success("Presenter added successfully");

      setFormData({
        fullname: "",
        nickname: "",
        bio: "",
        avatar: null,
      });
    } catch (error) {
      toast.error("Failed to add presenter. Please try again");
      console.error("Error adding new presenter:", error);
    }
  };

  const handleDeletePresenter = async (presenterId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/presenters/${presenterId}`);

      if (response.status === 200) {
        toast.success("Presenter deleted successfully");

        const updatedPresenters = presenter.filter(
          (item) => item.id !== presenterId
        );
        setPresenter(updatedPresenters);
      } else {
        toast.error("Failed to delete presenter. Please try again");
      }
    } catch (error) {
      toast.error("Failed to delete presenter. Please try again");
      console.error("Error deleting presenter:", error);
    }
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
                Add Presenter
              </button>
            </form>
          </div>

          <div className="presentrs-list">
            <div className="presenters-imageholder">
              {presenter &&
                presenter.map((item) => (
                  <div className="presenter-one" key={item.id}>
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

      {/* Toast Container to display notifications */}
      <ToastContainer />
    </div>
  );
}

export default Presenters;

import React, { useState, useEffect } from "react";
import Sidenav from "../Navigations/Sidenav";
import Navbar from "../Navigations/Navbar";
import axios from "axios";
import { BASE_URL } from "../../../utils/globals";

function Informations() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    youtubeLink: "",
    avatar: null,
    categoryId: "",
  });
  const [category, setCategory] = useState([]);
  const [category_id, setCategories] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategories(event.target.value);
    setSelectedCategory(event.target.value);
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      if (e.target.name === "avatar") {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        console.log("Selected File:", selectedFile);

        return { ...prevFormData, [e.target.name]: selectedFile };
      } else {
        return { ...prevFormData, [e.target.name]: e.target.value };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();

      formPayload.append("title", formData.title);
      formPayload.append("content", formData.content);
      formPayload.append("author", formData.author);
      formPayload.append("youtubeLink", formData.youtubeLink);
      formPayload.append("avatar", formData.avatar);
      formPayload.append("category_id", selectedCategory);

      console.log("Form Data:");
      [...formPayload.entries()].forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });

      const response = await axios.post(`${BASE_URL}/posts/form`, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from server:", response.data);
      alert("Data saved successfully");

      setFormData({
        title: "",
        content: "",
        author: "",
        youtubeLink: "",
        avatar: null,
        categoryId: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);

      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        console.error("Server responded with data:", error.response.data);
      }

      alert("Failed to save data. Please check the console for details.");
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

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
                Title:
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                YouTube Video Link:
                <input
                  type="text"
                  name="youtubeLink"
                  value={formData.youtubeLink}
                  onChange={handleChange}
                />
              </label>

              <div className="video-container">
                {formData.youtubeLink && (
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${formData.youtubeLink}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
              <br />

              <div>
                <div>
                  <label>Select Category</label>
                </div>
                <div>
                  <select
                    id="selectedCategory"
                    value={category_id}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select Category</option>
                    {category &&
                      category.map((e) => (
                        <option key={e._id} value={e._id}>
                          {e.title}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <br />
              <label>
                Author:
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Content:
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Image:
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  name="avatar"
                  onChange={handleChange}
                />
              </label>
              <br />
              <button className="presenter-btn" type="submit">
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informations;

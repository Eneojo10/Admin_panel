import React, { useState } from "react";
import Sidenav from "../Navigations/Sidenav";
import Navbar from "../Navigations/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../utils/globals";

function Category() {
  const [category, setCategory] = useState("");


  let handleNewCategory = async () => {
    try {
      
      const response = await axios.post(`${BASE_URL}/categories`, {
        title: category,
      });

      
      const categoryId = response.data.category._id;

      if (!categoryId) {
        throw new Error("Category ID is undefined");
      }

      
      localStorage.setItem("category", category);
      localStorage.setItem("category_id", categoryId);

      console.log("Category:", category);
      console.log("Category ID:", categoryId);

      setCategory("");

      toast.success("Category added successfully");
    } catch (error) {
      console.error("Error adding new category:", error);
      toast.error("Failed to add category. Please try again.");
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
          <div className="category-inputfield">
            <input
              type="text"
              placeholder="Create new category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="category-button">
            <button onClick={handleNewCategory} className="cat-btn">
              Add Category
            </button>
          </div>
        </div>
      </div>

      
      <ToastContainer />
    </div>
  );
}

export default Category;

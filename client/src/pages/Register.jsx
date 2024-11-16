import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../componant/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../firebase"; // Import the Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import Firebase v9+ functions

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // New state for profile picture
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (profilePicture) {
      // Create a reference to Firebase storage
      const storageRef = ref(storage, `profilePictures/${profilePicture.name}`);
      const uploadTask = uploadBytesResumable(storageRef, profilePicture);

      // Start the upload process
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track the upload progress (optional)
        },
        (error) => {
          console.error("Error uploading profile picture: ", error);
          toast.error("Failed to upload profile picture.");
        },
        async () => {
          try {
            // Once upload is complete, get the download URL of the image
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // Corrected this line

            // Create the object with form data, including the profile picture URL
            const userData = {
              name,
              email,
              phoneNo,
              password,
              domain,
              profilePicture: downloadURL, // Include the profile picture URL from Firebase
            };
            console.log(userData);
            // Send the object to your backend
            const response = await axios.post(
              "http://localhost:3000/api/users/register",
              userData // Send the plain object directly
            );
            console.log("Response:", response.data);
            toast.success("Registration successful!");
            navigate("/login");
          } catch (error) {
            console.error("Registration failed:", error);
            toast.error("Failed to register.");
          }
        }
      );
    } else {
      toast.error("Please select a profile picture.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-blue-300">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Register
          </h2>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />

          <input
            type="number"
            placeholder="Phone no."
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />

          {/* Domain Dropdown */}
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          >
            <option value="" disabled>
              Select your domain
            </option>
            <option value="cooking">Cooking</option>
            <option value="artistry">Artistry</option>
            <option value="engineering">Engineering</option>
            <option value="reading">Reading</option>
            <option value="acting">Acting</option>
          </select>

          {/* Profile Picture Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition duration-200"
          >
            Register
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-500 hover:underline">
              Login here
            </a>
          </p>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default Register;

import React, { useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { FaUserMd } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/api/auth/signOut", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full h-[70px] bg-white shadow-md fixed top-0 z-50 flex items-center justify-between px-8">

      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-[#2563EB] cursor-pointer"
      >
        MediCare
      </h1>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">

        {/* If Admin */}
        {userData?.role === "owner" && (
          <>
            <button
              onClick={() => navigate("/add-doctor")}
              className="text-[#2563EB] font-medium hover:text-[#1E40AF]"
            >
              Add Doctor
            </button>

            <button
              onClick={() => navigate("/")}
              className="text-[#2563EB] font-medium hover:text-[#1E40AF]"
            >
              View Doctors
            </button>
          </>
        )}

        {/* If User */}
        {userData?.role === "user" && (
          <>
            <button
              onClick={() => navigate("/")}
              className="text-[#2563EB] font-medium hover:text-[#1E40AF]"
            >
              Book Appointment
            </button>

            <button
              onClick={() => navigate("/my-appointments")}
              className="text-[#2563EB] font-medium hover:text-[#1E40AF]"
            >
              My Appointments
            </button>
          </>
        )}

        {/* Profile Section */}
        <div className="relative">
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="w-[38px] h-[38px] rounded-full bg-[#2563EB] text-white flex items-center justify-center cursor-pointer"
          >
            {userData?.fullName?.charAt(0)}
          </div>

          {showMenu && (
            <div className="absolute right-0 mt-3 w-[160px] bg-white shadow-xl rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-gray-700">
                <FiUser />
                <span className="text-sm">{userData?.fullName}</span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
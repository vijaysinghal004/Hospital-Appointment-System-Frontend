import React from 'react'
import { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Signin = () => {

    // ✅ Medical Blue Theme
    const primaryColor = '#2563EB';   // Blue
    const hoverColor = '#1E40AF';     // Dark Blue
    const bgColor = '#EFF6FF';        // Light Blue Background
    const borderColor = '#E5E7EB';    // Soft Gray Border

    const [showPassword, setshowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(
                `http://localhost:8080/api/auth/signin`,
                { email, password },
                { withCredentials: true }
            );

            dispatch(setUserData(result.data.user));
            navigate("/");
            setErr("");
        } catch (err) {
            setErr(err?.response?.data?.message);
        }
    }

    const handleGoogleAuth = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        try {
            const { data } = await axios.post(
                "http://localhost:8080/api/auth/google-authlogin",
                {
                    fullName: result.user.displayName,
                    email: result.user.email,
                },
                { withCredentials: true }
            );

            dispatch(setUserData(data.user));
            navigate("/");
            setErr("");
        } catch (err) {
            setErr(err?.response?.data?.message);
        }
    }

    return (
        <div
            className='min-h-screen flex items-center justify-center p-8'
            style={{ backgroundColor: bgColor }}
        >
            <div
                className='bg-white rounded-2xl shadow-xl w-full max-w-md p-6'
                style={{ border: `1px solid ${borderColor}` }}
            >
                <h1
                    className='text-2xl font-bold mb-1'
                    style={{ color: primaryColor }}
                >
                    MediCare
                </h1>

                <p className='text-gray-600 mb-4'>
                    Sign in to manage your appointments
                </p>

                <form onSubmit={handleSignup}>

                    {/* Email */}
                    <div className='mb-3'>
                        <label className='block text-gray-700 font-medium mb-1'>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            className='w-full rounded-lg px-3 py-2 outline-none focus:border-blue-600'
                            style={{ border: `1px solid ${borderColor}` }}
                        />
                    </div>

                    {/* Password */}
                    <div className='mb-3'>
                        <label className='block text-gray-700 font-medium mb-1'>
                            Password
                        </label>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter password'
                                className='w-full rounded-lg px-3 py-2 outline-none focus:border-blue-600'
                                style={{ border: `1px solid ${borderColor}` }}
                            />
                            <button
                                type="button"
                                className='absolute right-3 top-3 text-gray-500'
                                onClick={() => setshowPassword(prev => !prev)}
                            >
                                {showPassword ? <IoMdEyeOff /> : <IoEye />}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div
                        className="text-right mb-4 font-medium underline cursor-pointer"
                        style={{ color: primaryColor }}
                        onClick={() => navigate("/forget-password")}
                    >
                        Forgot password?
                    </div>

                    {/* Signin Button */}
                    <button
                        type='submit'
                        className='w-full mt-2 px-4 py-2 rounded-lg text-white transition duration-200'
                        style={{ backgroundColor: primaryColor }}
                        onMouseOver={(e) => e.target.style.backgroundColor = hoverColor}
                        onMouseOut={(e) => e.target.style.backgroundColor = primaryColor}
                    >
                        Sign In
                    </button>

                    {err && (
                        <p className='text-red-500 text-center mt-2'>
                            {err}
                        </p>
                    )}

                    {/* Google Auth */}
                    <button
                        type="button"
                        onClick={handleGoogleAuth}
                        className='w-full mt-4 px-4 py-2 flex items-center justify-center gap-2 border rounded-lg hover:bg-gray-100 transition'
                    >
                        <FcGoogle size={20} />
                        <span>Sign in with Google</span>
                    </button>
                </form>

                <p
                    className='text-center mt-3 cursor-pointer'
                    onClick={() => navigate("/signUp")}
                >
                    Create an Account ?{" "}
                    <span className='text-blue-600 font-semibold'>
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Signin;
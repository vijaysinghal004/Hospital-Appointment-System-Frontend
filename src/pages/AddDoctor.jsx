import React, { useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaUserMd } from "react-icons/fa";
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddDoctor = () => {

    const navigate = useNavigate();

    const [doctorId, setDoctorId] = useState("");
    const [name, setName] = useState("");
    const [consultationFee, setConsultationFee] = useState("");
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [maxDailyPatients, setMaxDailyPatients] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const specializations = [
        "Cardiologist",
        "Dermatologist",
        "Orthopedic",
        "Neurologist",
        "Pediatrician",
        "Gynecologist",
        "General Physician",
        "ENT Specialist",
        "Psychiatrist"
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBackendImage(file);
            setFrontendImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!doctorId || !name || !consultationFee || !specialization || !experience || !maxDailyPatients) {
            return setError("All fields are required");
        }

        try {
            setLoading(true);
            setError("");

            const formData = new FormData();
            formData.append("doctorId", doctorId);
            formData.append("name", name);
            formData.append("consultationFee", consultationFee);
            formData.append("specialization", specialization);
            formData.append("experience", experience);
            formData.append("maxDailyPatients", maxDailyPatients);

            if (backendImage) {
                formData.append("image", backendImage);
            }

            await axios.post(
                "http://localhost:8080/api/doctor/add-doctor",
                formData,
                { withCredentials: true }
            );

            navigate("/");

        } catch (err) {
            console.log(err.message)
            setError(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-8">

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 text-blue-600"
            >
                <IoArrowBack size={28} />
            </button>

            {/* Card */}
            <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl border border-blue-100 p-8">

                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                        <FaUserMd className="text-blue-600 w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Add Doctor
                    </h2>
                </div>

                {error && (
                    <p className="text-red-500 text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Doctor ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Doctor ID
                        </label>
                        <input
                            type="text"
                            placeholder="Enter doctor ID"
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Doctor Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Doctor Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter doctor name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Doctor Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Doctor Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />

                        {frontendImage && (
                            <img
                                src={frontendImage}
                                alt="Preview"
                                className="mt-4 w-full h-48 object-cover rounded-lg border"
                            />
                        )}
                    </div>

                    {/* Consultation Fee */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Consultation Fee
                        </label>
                        <input
                            type="number"
                            placeholder="Enter consultation fee"
                            value={consultationFee}
                            onChange={(e) => setConsultationFee(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Specialization */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Specialization
                        </label>
                        <select
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Select Specialization</option>
                            {specializations.map((spec) => (
                                <option key={spec} value={spec}>
                                    {spec}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Experience (Years)
                        </label>
                        <input
                            type="number"
                            placeholder="Enter years of experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Max Daily Patients */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Daily Patients
                        </label>
                        <input
                            type="number"
                            placeholder="Enter max daily patients"
                            value={maxDailyPatients}
                            onChange={(e) => setMaxDailyPatients(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                    >
                        {loading && (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        )}
                        {loading ? "Adding..." : "Add Doctor"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddDoctor;
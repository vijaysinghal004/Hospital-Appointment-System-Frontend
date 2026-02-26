import React, { useState, useEffect } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserMd } from "react-icons/fa";
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const EditDoctor = () => {

    const navigate = useNavigate();
    const  {docId}  = useParams();

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

    // ✅ GET doctor by ID
    useEffect(() => {
        const getDoctor = async () => {
            try {
                console.log(docId)
                const res = await axios.get(
                    `http://localhost:8080/api/doctor/get-doctor/${docId}`,
                    { withCredentials: true }
                );
          console.log(res.data);
                const doctor = res.data;

                setDoctorId(doctor.doctorId);
                setName(doctor.name);
                setConsultationFee(doctor.consultationFee);
                setSpecialization(doctor.specialization);
                setExperience(doctor.experience);
                setMaxDailyPatients(doctor.maxDailyPatients);
                setFrontendImage(doctor.image);

            } catch (err) {
                setError("Failed to fetch doctor");
                console.log(err);
            }
        };

        if (docId) {
            getDoctor();
        }
    }, [docId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBackendImage(file);
            setFrontendImage(URL.createObjectURL(file));
        }
    };

    // ✅ UPDATE doctor
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
                `http://localhost:8080/api/doctor/edit-doctor/${docId}`,
                formData,
                { withCredentials: true }
            );

            navigate("/");

        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-8">

            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 text-blue-600"
            >
                <IoArrowBack size={28} />
            </button>

            <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl border border-blue-100 p-8">

                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                        <FaUserMd className="text-blue-600 w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Edit Doctor
                    </h2>
                </div>

                {error && (
                    <p className="text-red-500 text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="text"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="Doctor ID"
                    />

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="Doctor Name"
                    />

                    <input
                        type="number"
                        value={consultationFee}
                        onChange={(e) => setConsultationFee(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="Consultation Fee"
                    />

                    <select
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    >
                        <option value="">Select Specialization</option>
                        {specializations.map((spec) => (
                            <option key={spec} value={spec}>
                                {spec}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="Experience"
                    />

                    <input
                        type="number"
                        value={maxDailyPatients}
                        onChange={(e) => setMaxDailyPatients(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                        placeholder="Max Daily Patients"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border rounded-lg px-4 py-2"
                    />

                    {frontendImage && (
                        <img
                            src={frontendImage}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2"
                    >
                        {loading && (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        )}
                        {loading ? "Updating..." : "Update Doctor"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditDoctor;
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import axios from 'axios'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UserDeshboard = () => {

  const doctors = useSelector(state => state.user?.doctors) || []

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loadingId, setLoadingId] = useState(null);

  const handleBooking = async (specialization, doctorId) => {
    try {
      setLoadingId(doctorId)

      const res = await axios.post(
        "http://localhost:8080/api/doctor/book-appointment",
        { specialization },
        { withCredentials: true }
      )

      console.log(res.data); // ✅ fixed

      setSuccessMessage(res.data.message)
      setErrorMessage("")

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)

    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Booking failed")
      setSuccessMessage("")

      setTimeout(() => {
        setErrorMessage("")
      }, 3000)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className='w-screen min-h-screen bg-[#fff9f6]'>
      <Navbar />

      <div className='p-10'>
        <h1 className='text-3xl font-bold mb-6 text-center'>
          Book Appointment
        </h1>

        {successMessage && (
          <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6 text-center font-medium">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-6 text-center font-medium">
            {errorMessage}
          </div>
        )}

        {doctors.length === 0 ? (
          <p className='text-center text-gray-500'>No Doctors Found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {doctors.map((doctor) => {

              const isBusy =
                doctor.currentAppointments >= doctor.maxDailyPatients

              return (
                <div
                  key={doctor._id}
                  className='bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition'
                >
                  <img
                    src={doctor.image}
                    alt="doctor"
                    className='w-full h-48 object-cover rounded-lg mb-4'
                  />

                  <h2 className='text-xl font-semibold'>
                    Dr. {doctor.name}
                  </h2>

                  <p className='text-gray-600'>
                    {doctor.specialization}
                  </p>

                  <p className='text-gray-500 text-sm mt-1'>
                    Experience: {doctor.experience} years
                  </p>

                  <p className='text-gray-500 text-sm'>
                    Fee: ₹{doctor.consultationFee}
                  </p>

                  <p className='text-gray-500 text-sm'>
                    Appointments: {doctor.currentAppointments} / {doctor.maxDailyPatients}
                  </p>

                  <div className='mt-4'>
                    {isBusy ? (
                      <button
                        disabled
                        className='w-full bg-red-100 text-red-600 py-2 rounded-lg cursor-not-allowed'
                      >
                        Fully Booked
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleBooking(doctor.specialization, doctor._id)
                        }
                        disabled={loadingId === doctor._id}
                        className={`w-full py-2 rounded-lg text-white flex items-center justify-center gap-2 transition ${
                          loadingId === doctor._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {loadingId === doctor._id ? (
                          <>
                            <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                            Booking...
                          </>
                        ) : (
                          "Book Appointment"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDeshboard
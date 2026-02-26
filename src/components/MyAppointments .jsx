import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const MyAppointments = () => {

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/appointment/my-appointments",
          { withCredentials: true }
        )

        setAppointments(res.data.appointments)
        

      } catch (err) {
        setError("Failed to load appointments")
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  return (
    <div className='w-screen min-h-screen bg-[#fff9f6]'>
      <Navbar />

      <div className='max-w-7xl mx-auto px-6 py-20'>
        <h1 className='text-3xl font-bold mb-8 text-center'>
          My Appointments
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && appointments.length === 0 && (
          <p className="text-center text-gray-500">
            No Appointments Found
          </p>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className='bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition'
            >
              <img
                src={appointment.doctor?.image}
                alt="doctor"
                className='w-full h-48 object-cover rounded-lg mb-4'
              />

              <h2 className='text-xl font-semibold'>
                Dr. {appointment.doctor?.name}
              </h2>

              <p className='text-gray-600'>
                {appointment.specialization}
              </p>

              <p className='text-gray-500 text-sm mt-1'>
                Experience: {appointment.doctor?.experience} years
              </p>

              <p className='text-gray-500 text-sm'>
                Fee: ₹{appointment.consultationFee}
              </p>

              <p className='mt-2 text-sm'>
                Status:{" "}
                <span className={`font-semibold ${
                  appointment.status === "booked"
                    ? "text-green-600"
                    : appointment.status === "completed"
                    ? "text-blue-600"
                    : "text-red-600"
                }`}>
                  {appointment.status}
                </span>
              </p>

              <p className='text-gray-400 text-xs mt-2'>
                Booked on: {new Date(appointment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyAppointments
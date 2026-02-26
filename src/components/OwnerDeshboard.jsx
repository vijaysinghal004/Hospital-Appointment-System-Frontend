import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const OwnerDeshboard = () => {
  const navigate = useNavigate()

  // Safe access
  const doctors = useSelector(state => state.user?.doctors) || []

  return (
    <div className='w-screen min-h-screen bg-[#fff9f6]'>
      <Navbar />

      <div className='p-10'>
        <h1 className='text-3xl font-bold mb-8 text-center'>
          Manage Doctors
        </h1>

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
                  onClick={() => navigate(`/edit-doctor/${doctor._id}`)}
                  className='bg-white shadow-md rounded-xl p-5 cursor-pointer hover:shadow-xl transition'
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

                  <div className='mt-3'>
                    {isBusy ? (
                      <span className='bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm'>
                        Busy
                      </span>
                    ) : (
                      <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm'>
                        Free
                      </span>
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

export default OwnerDeshboard
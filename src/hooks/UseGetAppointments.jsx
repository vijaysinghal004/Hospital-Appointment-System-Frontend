import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppointments  } from "../redux/userSlice";


function useGetAppointments() {
    const dispatch=useDispatch();
    useEffect(() => { 
        const fetchAppointments = async () => {
            try {
                const result = await axios.get("http://localhost:8080/api/appointment/my-appointments", { withCredentials: true });
                console.log(result.data);
                dispatch(setAppointments(result.data.appointments))
            } catch (err) {
                console.log(err);
            }
        }
        fetchAppointments();
    }, [])
}

export default useGetAppointments
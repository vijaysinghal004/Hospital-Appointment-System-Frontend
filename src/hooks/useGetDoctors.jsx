import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setdoctors, setUserData } from "../redux/userSlice";


function useGetDoctors() {
    const dispatch=useDispatch();
    useEffect(() => { 
        const fetchDoctors = async () => {
            try {
                const result = await axios.get("http://localhost:8080/api/doctor/get-all-doctors", { withCredentials: true });
                console.log(result.data);
                dispatch(setdoctors(result.data))
            } catch (err) {
                console.log(err);
            }
        }
        fetchDoctors();
    }, [])
}

export default useGetDoctors
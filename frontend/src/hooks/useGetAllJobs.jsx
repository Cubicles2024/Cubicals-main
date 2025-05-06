import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const token = localStorage.getItem('authToken');  
                const res = await axios.get(`${JOB_API_END_POINT}/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`  
                    },
                    withCredentials: true
                });
                if (res.data.success) {
                    // console.log(res.data.jobs)
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchAllJobs();
    }, [dispatch]);         // [Todo, add searchedQueroy later in dependency array]
    
}

export default useGetAllJobs
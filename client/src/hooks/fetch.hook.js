import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from '../helper/apiRequest'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN || "http://localhost:8090";


/** custom hook */
export default function useFetch(query){
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true}));

                const decodedToken = !query || query.length < 6 ? await getUsername() : '';
                const { data, status } = decodedToken ? await axios.get(`/api/v1/user/${decodedToken?.user?.username}`) : await axios.get(`/api/v1/${query}`);

                if(status === 200){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}
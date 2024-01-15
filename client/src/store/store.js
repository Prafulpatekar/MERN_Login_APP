import { create } from 'zustand';
import { getUsername } from '../helper/apiRequest';

export const useAuthStore = create((reducer) => ({
    auth : {
        username : getUsername()?.user?.username || "",
        active : false
    },
    setUsername : (name) => reducer((state) => ({ auth : { ...state.auth, username : name }})) 
}))

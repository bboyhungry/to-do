import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import Spinner from "../components/Spinner";


function AuthCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            if (session) navigate('/tasks')
        })
    }, [])

    return <Spinner />;
}

export default AuthCallback
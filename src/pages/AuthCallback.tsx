import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function AuthCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.onAuthStateChange((session) => {
            if (session) navigate('/tasks')
        })
    }, [])

    return <p>Signing you in...</p>
}

export default AuthCallback
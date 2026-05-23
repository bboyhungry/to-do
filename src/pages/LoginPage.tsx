import { FcGoogle } from 'react-icons/fc'
import { supabase } from '../supabase' 

function LoginPage() {
    const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        },
    })

  if (error) console.error('OAuth error:', error.message)
}

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white border border-gray-200 rounded-2xl p-10 w-80 flex flex-col items-center gap-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Check List</h1>
                    <p className="text-gray-400 text-sm">Sign in to manage your items</p>
                </div>
                <button
                    onClick={signInWithGoogle}
                    className="flex items-center gap-3 w-full px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                    <FcGoogle size={20} />
                    Sign in with Google
                </button>
                <p className="text-xs text-black-300 text-center">
                    Your items are private and only visible to you
                </p>
            </div>
        </div>
    )
}

export default LoginPage;
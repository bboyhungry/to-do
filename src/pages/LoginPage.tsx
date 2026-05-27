import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { supabase } from '../supabase';
import Footer from '../components/Footer';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) navigate('/tasks', { replace: true });
        }
        checkSession();
    }, [navigate]);

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
        if (error) console.error('OAuth error:', error.message);
    }

    const sendMagicLink = async () => {
        const trimmed = email.trim();
        if (!trimmed) return;
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email: trimmed,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        setLoading(false);

        if (error) {
            console.error('Magic link error:', error.message);
            return;
        }
        setSent(true);
    }

    if (sent) {
        return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-white border border-gray-200 rounded-2xl p-10 w-80 flex flex-col items-center gap-4 text-center">
                    <h1 className="text-2xl font-bold">Check your email</h1>
                    <p className="text-gray-400 text-sm">
                        We sent a sign-in link to{' '}
                        <span className="text-gray-700 font-medium">{email}</span>
                    </p>
                    <button
                        onClick={() => setSent(false)}
                        className="text-xs text-gray-400 hover:text-gray-600 underline cursor-pointer"
                    >
                        Use a different email
                    </button>
                </div>
            </div>
            <Footer />
        </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-1 flex items-center justify-center">
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
                <div className="flex items-center gap-3 w-full">
                    <hr className="flex-1 border-gray-200" />
                    <span className="text-xs text-gray-400">or</span>
                    <hr className="flex-1 border-gray-200" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !loading) sendMagicLink() }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none text-sm focus:border-gray-400"
                />
                <button
                    onClick={sendMagicLink}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-xl text-sm hover:bg-gray-900 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? 'Sending...' : 'Send magic link'}
                </button>
                </div>
                    <p className="text-xs text-gray-400 text-center">
                        Your items are private and only visible to you
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginPage;
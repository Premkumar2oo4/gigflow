// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            await axios.post('https://gigflow-y1fa.onrender.com/api/auth/forgot-password', { email });
            setMessage('If an account exists with this email, you will receive reset instructions.');
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-900 to-base-950 px-4">
            <div className="card bg-base-800/80 backdrop-blur-lg border border-cyan-900/30 shadow-2xl p-8 md:p-10 rounded-2xl w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-cyan-400">Forgot Password?</h1>
                    <p className="mt-3 text-base-content/70">
                        Enter your email and we'll send reset instructions
                    </p>
                </div>

                {message && (
                    <div className="alert alert-success mb-6 shadow-lg">
                        <span>{message}</span>
                    </div>
                )}

                {error && (
                    <div className="alert alert-error mb-6 shadow-lg">
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="input input-bordered input-lg bg-base-900 border-cyan-900 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                            required
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary w-full btn-lg ${loading ? 'loading' : ''}`}
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                </form>

                <div className="mt-8 text-center space-y-3 text-sm">
                    <p>
                        Remember your password?{' '}
                        <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium underline-offset-4 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );

}

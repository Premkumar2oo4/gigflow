import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        const formData = new FormData(e.target);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const password = formData.get('password');

        if (!name || !email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            await register(name, email, password);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 1800); 
        } catch (err) {
            console.error('Registration failed:', err);
            const msg = err.response?.data?.message || 'Registration failed. Try again.';
            setError(msg.includes('duplicate') ? 'Email already in use' : msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl">
                <div className="card-body p-8 md:p-10">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Join GigFlow
                        </h1>
                        <p className="text-base-content/70 mt-2">
                            Start freelancing or hire great talent today
                        </p>
                    </div>

                  
                    {success && (
                        <div className="alert alert-success shadow-lg mb-6 animate-fade-in">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Account created! Redirecting to login...</span>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-error shadow-lg mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                className="input input-bordered input-lg focus:input-primary transition-all"
                                required
                                disabled={loading || success}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                className="input input-bordered input-lg focus:input-primary transition-all"
                                required
                                disabled={loading || success}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="input input-bordered input-lg focus:input-primary transition-all"
                                required
                                minLength={6}
                                disabled={loading || success}
                            />
                            <label className="label">
                                <span className="label-text-alt text-base-content/60">
                                    Minimum 6 characters
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary btn-lg w-full ${loading ? 'loading' : ''}`}
                            disabled={loading || success}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-base-content/70">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="link link-primary font-medium hover:no-underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
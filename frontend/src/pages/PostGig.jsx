import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostGig = () => {
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
        const title = formData.get('title')?.trim();
        const description = formData.get('description')?.trim();
        const budget = Number(formData.get('budget'));

        if (!title || !description || !budget || budget <= 0) {
            setError('Please fill in all fields with valid values');
            setLoading(false);
            return;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/gigs',
                { title, description, budget },
                { withCredentials: true }
            );

            setSuccess(true);

            setTimeout(() => {
                navigate('/gigs');
            }, 1800);
        } catch (err) {
            console.error('Failed to post gig:', err);
            const message = err.response?.data?.message || 'Failed to post gig. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 px-4 py-12">
            <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
                <div className="card-body p-8 md:p-12">
                    
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Post a New Gig
                        </h1>
                        <p className="mt-3 text-base-content/70 text-lg">
                            Describe the work you need done and set your budget
                        </p>
                    </div>

                   
                    {success && (
                        <div className="alert alert-success shadow-lg mb-8 animate-fade-in">
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
                            <span>Gig posted successfully! Redirecting to listings...</span>
                        </div>
                    )}

                    
                    {error && (
                        <div className="alert alert-error shadow-lg mb-8">
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

                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                       
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium">Gig Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Need a modern landing page with Tailwind CSS"
                                className="input input-bordered input-lg focus:input-primary transition-all duration-200"
                                required
                                disabled={loading || success}
                            />
                        </div>

                       
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium">Description</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Provide detailed information about what you need, timeline, requirements..."
                                className="textarea textarea-bordered textarea-lg min-h-[160px] focus:textarea-primary transition-all duration-200"
                                required
                                disabled={loading || success}
                            />
                        </div>

                    
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium">Budget (USD)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/60">$</span>
                                <input
                                    type="number"
                                    name="budget"
                                    placeholder="100 - 5000"
                                    min="1"
                                    step="1"
                                    className="input input-bordered input-lg pl-10 focus:input-primary transition-all duration-200 w-full"
                                    required
                                    disabled={loading || success}
                                />
                            </div>
                        </div>

                        
                        <button
                            type="submit"
                            className={`btn btn-primary btn-lg w-full mt-4 ${loading ? 'loading' : ''}`}
                            disabled={loading || success}
                        >
                            {loading ? 'Posting...' : 'Post Gig'}
                        </button>
                    </form>

                    
                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate('/gigs')}
                            className="link link-hover text-base-content/70 hover:text-primary"
                            disabled={loading}
                        >
                            ← Back to Gigs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostGig;
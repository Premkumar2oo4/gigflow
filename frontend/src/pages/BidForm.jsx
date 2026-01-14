import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BidForm = () => {
    const { gigId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        message: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        const priceNum = Number(formData.price);

      
        if (!formData.message.trim()) {
            setError('Please write a message to the client');
            setLoading(false);
            return;
        }
        if (!formData.price || priceNum <= 0) {
            setError('Please enter a valid positive price');
            setLoading(false);
            return;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/bids',
                {
                    gigId,
                    message: formData.message.trim(),
                    price: priceNum,
                },
                { withCredentials: true }
            );

            setSuccess(true);

            
            setTimeout(() => {
                navigate('/gigs');
            }, 1800);
        } catch (err) {
            console.error('Bid submission failed:', err);
            const msg = err.response?.data?.message || 'Failed to submit bid';
            setError(msg.includes('not open') ? 'This gig is no longer accepting bids' : msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-10 px-4 flex items-center justify-center">
            <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
                <div className="card-body p-8 md:p-12">
                    
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Submit Your Bid
                        </h1>
                        <p className="mt-3 text-base-content/70 text-lg">
                            Tell the client why you're the right person for this job
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
                            <span>Bid submitted successfully! Redirecting...</span>
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

                  
                    <form onSubmit={handleSubmit} className="space-y-7">
                      
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium">Your Proposal</span>
                            </label>
                            <textarea
                                name="message"
                                placeholder="Explain your approach, timeline, relevant experience, why you're a good fit..."
                                className="textarea textarea-bordered textarea-lg min-h-[180px] focus:textarea-primary transition-all"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={loading || success}
                            />
                            <label className="label">
                                <span className="label-text-alt text-base-content/60">
                                    Be detailed — clients love clear proposals
                                </span>
                            </label>
                        </div>

                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium">Your Bid (USD)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-medium text-base-content/60">
                                    $
                                </span>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="e.g. 250"
                                    min="1"
                                    step="1"
                                    className="input input-bordered input-lg pl-12 w-full focus:input-primary transition-all"
                                    value={formData.price}
                                    onChange={handleChange}
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
                            {loading ? 'Submitting Bid...' : 'Place Your Bid'}
                        </button>
                    </form>

                   
                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="link link-hover text-base-content/70 hover:text-primary"
                            disabled={loading}
                        >
                            ← Cancel & go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BidForm;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gigs = () => {
    const [gigs, setGigs] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGigs = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await axios.get(`https://gigflow-y1fa.onrender.com/api/gigs?search=${encodeURIComponent(search)}`);
                setGigs(res.data);
            } catch (err) {
                console.error('Failed to fetch gigs:', err);
                setError('Could not load gigs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchGigs();
    }, [search]);

    return (
        <div className="min-h-screen bg-base-200 py-8 px-4">
           
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Available Gigs
                        </h1>
                        <p className="mt-2 text-base-content/70 text-lg">
                            Browse open freelance opportunities or post your own project
                        </p>
                    </div>

                    <Link
                        to="/post-gig"
                        className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        + Post a New Gig
                    </Link>
                </div>

              
                <div className="mt-8 max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search gigs by title (e.g. landing page, React, design...)"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered input-lg w-full pl-12 pr-4 focus:input-primary transition-all"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-base-content/50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

     
            <div className="max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : error ? (
                    <div className="alert alert-error shadow-lg max-w-2xl mx-auto">
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
                ) : gigs.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-semibold mb-2">No gigs found</h3>
                        <p className="text-base-content/70 mb-6">
                            {search
                                ? `No results for "${search}"`
                                : "There are no open gigs at the moment"}
                        </p>
                        <Link to="/post-gig" className="btn btn-primary btn-lg">
                            Be the first to post a gig!
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gigs.map((gig) => (
                            <div
                                key={gig._id}
                                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300/50 hover:border-primary/30 group"
                            >
                                <div className="card-body p-6">
                                    <h2 className="card-title text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                                        {gig.title}
                                    </h2>

                                    <p className="text-base-content/70 line-clamp-3 min-h-[4.5rem] mt-2">
                                        {gig.description}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="badge badge-lg badge-outline badge-secondary font-semibold">
                                            ${gig.budget.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-base-content/60">
                                            Posted by {gig.ownerId?.name || 'Anonymous'}
                                        </div>
                                    </div>

                                    <div className="card-actions justify-end mt-6 gap-3">
                                        <Link
                                            to={`/gigs/${gig._id}/bid`}
                                            className="btn btn-primary btn-sm md:btn-md"
                                        >
                                            Place Bid
                                        </Link>
                                        <Link
                                            to={`/gigs/${gig._id}/bids`}
                                            className="btn btn-outline btn-info btn-sm md:btn-md"
                                        >
                                            View Bids
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default Gigs;

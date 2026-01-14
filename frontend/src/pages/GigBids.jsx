import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function GigBids() {
    const { gigId } = useParams();

    const [bids, setBids] = useState([]);
    const [gigTitle, setGigTitle] = useState('Gig');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hiringId, setHiringId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedBidId, setSelectedBidId] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError('');

        try {
            try {
                const gigRes = await axios.get(`http://localhost:5000/api/gigs/${gigId}`);
                setGigTitle(gigRes.data.title || 'Gig');
            } catch (e) {
                setGigTitle('Gig');
            }

            const bidsRes = await axios.get(`http://localhost:5000/api/bids/${gigId}`, {
                withCredentials: true,
            });
            setBids(bidsRes.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load bids');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [gigId]);

    const openHireConfirm = (bidId) => {
        setSelectedBidId(bidId);
        setShowConfirmModal(true);
    };

    const handleHire = async () => {
        setShowConfirmModal(false);
        setHiringId(selectedBidId);

        try {
            await axios.patch(`http://localhost:5000/api/bids/${selectedBidId}/hire`, {}, {
                withCredentials: true,
            });
            await fetchData();
            alert('Hired successfully!'); 
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to hire');
        } finally {
            setHiringId(null);
            setSelectedBidId(null);
        }
    };

    return (
        <div className="min-h-screen bg-base-950 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
                            Bids for: {gigTitle}
                        </h1>
                        <p className="mt-2 text-slate-400">
                            Review proposals • Select the best match
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link to={`/gigs/${gigId}`} className="btn btn-outline btn-info">
                            ← View Gig
                        </Link>
                        <Link to="/gigs" className="btn btn-ghost">
                            All Gigs
                        </Link>
                    </div>
                </div>

                {loading && <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-cyan-500"></span></div>}

                {error && <div className="alert alert-error shadow-xl"><span>{error}</span></div>}

                {!loading && !error && bids.length === 0 && (
                    <div className="text-center py-16 bg-base-900/50 rounded-2xl border border-cyan-900/30">
                        <div className="text-7xl mb-6 opacity-70">📭</div>
                        <h3 className="text-2xl font-semibold mb-3">No bids yet</h3>
                        <p className="text-slate-400">No freelancers have proposed yet.</p>
                    </div>
                )}

                {!loading && !error && bids.length > 0 && (
                    <div className="space-y-6">
                        {bids.map((bid) => (
                            <div
                                key={bid._id}
                                className={`card bg-base-900/70 border-2 p-6 transition-all ${bid.status === 'hired' ? 'border-success bg-success/10' : ''
                                    } ${bid.status === 'rejected' ? 'border-error opacity-75' : ''} ${bid.status === 'pending' ? 'hover:border-cyan-500' : ''
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-cyan-400">
                                            {bid.freelancerId?.name || 'Freelancer'}
                                        </h3>
                                        <p className="text-sm text-slate-400 mt-1">
                                            Proposed: ${bid.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className={`badge badge-lg px-5 py-3 capitalize ${bid.status === 'hired' ? 'badge-success' :
                                            bid.status === 'rejected' ? 'badge-error' : 'badge-warning'
                                        }`}>
                                        {bid.status}
                                    </div>
                                </div>

                                <p className="text-slate-300 mb-6">{bid.message}</p>

                                <div className="flex justify-end">
                                    {bid.status === 'pending' && (
                                        <button
                                            onClick={() => openHireConfirm(bid._id)}
                                            disabled={hiringId === bid._id}
                                            className={`btn btn-success btn-md ${hiringId === bid._id ? 'loading' : ''}`}
                                        >
                                            {hiringId === bid._id ? 'Hiring...' : 'Hire Freelancer'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showConfirmModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="card bg-base-100 w-full max-w-md mx-4 shadow-2xl border border-cyan-900/40">
                            <div className="card-body p-8">
                                <h3 className="text-xl font-bold text-center text-cyan-400 mb-4">
                                    Confirm Hire
                                </h3>
                                <p className="text-center text-base-content/80 mb-6">
                                    Hire this freelancer?<br />
                                    <span className="text-error font-medium">This cannot be undone.</span>
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => setShowConfirmModal(false)}
                                        className="btn btn-outline flex-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleHire}
                                        className="btn btn-success flex-1"
                                    >
                                        Hire
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
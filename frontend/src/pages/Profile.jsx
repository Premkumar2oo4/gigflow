import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Profile() {
    const { user, loading, logout } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-cyan-500"></span>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-400 mb-4">Not Logged In</h2>
                <Link to="/login" className="btn btn-primary bg-cyan-600 hover:bg-cyan-700">
                    Go to Login
                </Link>
            </div>
        )
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto space-y-10"
        >
          
            <motion.div
                variants={itemVariants}
                className="card bg-base-200/70 backdrop-blur-md border border-cyan-900/40 shadow-2xl"
            >
                <div className="card-body items-center text-center p-8 md:p-12">
                    <div className="avatar mb-6">
                        <div className="w-32 rounded-full ring ring-cyan-500 ring-offset-4 ring-offset-base-100">
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=06b6d4&color=0f172a&size=128`}
                                alt={`${user.name}'s avatar`}
                            />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
                        {user.name}
                    </h1>

                    <p className="text-lg text-slate-300 mt-2">
                        {user.email}
                    </p>

                    <div className="badge badge-outline badge-lg mt-4 px-6 py-3 text-base font-medium">
                        Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <div className="card bg-base-200/70 border border-cyan-900/30 hover:border-cyan-600/50 transition-all duration-300">
                    <div className="card-body text-center">
                        <div className="text-4xl text-cyan-400 mb-2">12</div>
                        <h3 className="text-lg font-semibold">Gigs Posted</h3>
                        <p className="text-slate-400 text-sm">as Client</p>
                    </div>
                </div>

                <div className="card bg-base-200/70 border border-cyan-900/30 hover:border-cyan-600/50 transition-all duration-300">
                    <div className="card-body text-center">
                        <div className="text-4xl text-cyan-400 mb-2">8</div>
                        <h3 className="text-lg font-semibold">Bids Placed</h3>
                        <p className="text-slate-400 text-sm">as Freelancer</p>
                    </div>
                </div>

                <div className="card bg-base-200/70 border border-cyan-900/30 hover:border-cyan-600/50 transition-all duration-300">
                    <div className="card-body text-center">
                        <div className="text-4xl text-cyan-400 mb-2">3</div>
                        <h3 className="text-lg font-semibold">Hired</h3>
                        <p className="text-slate-400 text-sm">projects completed</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
                <Link
                    to="/post-gig"
                    className="btn btn-primary bg-cyan-600 hover:bg-cyan-700 btn-lg min-w-[180px]"
                >
                    Post New Gig
                </Link>

                <Link
                    to="/gigs"
                    className="btn btn-outline border-cyan-500 text-cyan-400 hover:bg-cyan-950/40 btn-lg min-w-[180px]"
                >
                    Browse Gigs
                </Link>

                <button
                    onClick={logout}
                    className="btn btn-outline border-red-500 text-red-400 hover:bg-red-950/40 btn-lg min-w-[180px]"
                >
                    Logout
                </button>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="card bg-base-200/50 border border-cyan-900/30 p-8 text-center opacity-70"
            >
                <h3 className="text-xl font-semibold mb-3">More features coming soon</h3>
                <p className="text-slate-400">
                    Skills • Portfolio • Reviews • Payment history • Settings
                </p>
            </motion.div>
        </motion.div>
    )
}
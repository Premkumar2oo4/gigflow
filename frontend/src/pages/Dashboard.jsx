import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Dashboard() {
    const { user, notifications } = useAuth();
    useEffect(() => {
        console.log('Dashboard notifications state:', notifications);
    }, [notifications]);

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="space-y-10"
        >
            <motion.div variants={item} className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
                    Welcome{user?.name ? `, ${user.name}` : ""}!
                </h1>
                <p className="mt-3 text-lg text-slate-400">
                    Manage your gigs, bids, and activity
                </p>
            </motion.div>

            
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { to: "/gigs", icon: "🔍", label: "Find Gigs" },
                    { to: "/post-gig", icon: "📝", label: "Post Gig" },
                    { to: "/dashboard", icon: "📊", label: "Activity" },
                    { to: "/profile", icon: "👤", label: "Profile" },
                ].map((action, i) => (
                    <Link key={i} to={action.to}>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="card bg-base-200/60 border border-cyan-900/30 hover:border-cyan-600/50 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                        >
                            <div className="card-body items-center text-center">
                                <div className="text-5xl mb-3">{action.icon}</div>
                                <h3 className="font-semibold text-lg">{action.label}</h3>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </motion.div>

           
            <motion.section variants={item}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">Notifications</span>
                    {notifications.length > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="badge badge-primary badge-outline px-3 py-2 text-sm"
                        >
                            {notifications.length}
                        </motion.span>
                    )}
                </h2>

                <AnimatePresence>
                    {notifications.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16 bg-base-200/40 rounded-2xl border border-cyan-900/20"
                        >
                            <div className="text-7xl mb-4 opacity-60">🔔</div>
                            <p className="text-xl text-slate-400">No new notifications</p>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            {notifications.map((note, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    className="alert alert-info shadow-lg border-l-4 border-l-cyan-500 bg-base-200/80 backdrop-blur-sm"
                                >
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
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{note}</span>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </motion.section>
        </motion.div>
    );
}
// src/components/Navbar.jsx
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();               
        navigate("/login");     
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="navbar bg-base-200/90 backdrop-blur-lg border-b border-cyan-900/30 sticky top-0 z-50 px-4 md:px-8 shadow-lg"
        >
            <div className="flex-1">
                <Link
                    to="/"
                    className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                >
                    GigFlow
                </Link>
            </div>

            <div className="flex-none gap-4">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-cyan-500 ring-offset-base-100 ring-offset-2">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=06b6d4&color=0f172a`}
                                    alt="avatar"
                                />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-200 rounded-box w-52 border border-cyan-900/30"
                        >
                            <li>
                                <Link to="/profile" className="hover:bg-cyan-900/30">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:bg-cyan-900/30">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/post-gig" className="hover:bg-cyan-900/30">
                                    Post Gig
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-error hover:bg-red-900/30"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <Link
                            to="/login"
                            className="btn btn-outline btn-sm md:btn-md border-cyan-500 text-cyan-400 hover:bg-cyan-900/40"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="btn btn-primary btn-sm md:btn-md bg-cyan-500 hover:bg-cyan-600"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </motion.nav>
    );
}
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, duration: 0.6 },
};

export default function About() {
    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="max-w-4xl mx-auto space-y-12 py-8"
        >
            <motion.h1
                variants={item}
                className="text-4xl md:text-5xl font-bold text-center text-cyan-400"
            >
                About GigFlow
            </motion.h1>

            <motion.p variants={item} className="text-lg text-slate-300 leading-relaxed">
                GigFlow is a mini freelance marketplace built to connect clients with talented freelancers.
                Whether you need a website, design, writing, or development work — or you're a freelancer looking for exciting projects — GigFlow makes it simple and fast.
            </motion.p>

            <motion.div variants={item} className="grid md:grid-cols-2 gap-8">
                <div className="card bg-base-200/70 border border-cyan-900/40 p-8">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-4">For Clients</h2>
                    <ul className="space-y-3 text-slate-300">
                        <li>→ Post jobs with your budget and requirements</li>
                        <li>→ Receive bids from skilled freelancers</li>
                        <li>→ Review proposals and hire the best fit</li>
                        <li>→ Real-time updates when someone is hired</li>
                    </ul>
                </div>

                <div className="card bg-base-200/70 border border-cyan-900/40 p-8">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-4">For Freelancers</h2>
                    <ul className="space-y-3 text-slate-300">
                        <li>→ Browse open gigs that match your skills</li>
                        <li>→ Submit detailed bids and proposals</li>
                        <li>→ Get instant notifications when hired</li>
                        <li>→ Build your reputation through completed work</li>
                    </ul>
                </div>
            </motion.div>

            <motion.div variants={item} className="text-center">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-6">
                    Built with ❤️ using
                </h3>
                <div className="flex flex-wrap justify-center gap-6 text-lg">
                    <span className="badge badge-outline badge-lg px-6 py-3">React + Vite</span>
                    <span className="badge badge-outline badge-lg px-6 py-3">Tailwind CSS</span>
                    <span className="badge badge-outline badge-lg px-6 py-3">DaisyUI</span>
                    <span className="badge badge-outline badge-lg px-6 py-3">Node.js + Express</span>
                    <span className="badge badge-outline badge-lg px-6 py-3">MongoDB</span>
                    <span className="badge badge-outline badge-lg px-6 py-3">Socket.io</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
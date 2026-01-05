import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Code2, Database, Award } from 'lucide-react';

export default function Hero({ isVisible }) {
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const phrases = [
        "Data Scientist",
        "Full Stack Developer",
        "Problem Solver"
    ];

    // Typing effect
    useEffect(() => {
        if (!isVisible) return;

        const currentFullText = phrases[currentPhrase];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentFullText.length) {
                    setDisplayText(currentFullText.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentPhrase((prev) => (prev + 1) % phrases.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentPhrase, isVisible]);

    const highlights = [
        { icon: GraduationCap, label: "CSE @ UIU", value: "Top 15%", color: "neon-cyan" },
        { icon: Code2, label: "MERN Stack", value: "Expert", color: "electric-purple" },
        { icon: Database, label: "Data Science", value: "Specialist", color: "neon-cyan" }
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 z-30 overflow-hidden pointer-events-none flex items-center justify-center"
                >
                    <div className="w-full max-w-5xl px-4 md:px-8 -mt-10">
                        <div className="text-center">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="pointer-events-auto inline-block"
                            >
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs md:text-sm font-mono">
                                    <Award size={14} className="animate-pulse" />
                                    Available for Opportunities
                                </span>
                            </motion.div>

                            {/* Name */}
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 100 }}
                                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 tracking-tight pointer-events-none select-none"
                            >
                                <span className="text-white drop-shadow-lg">Mehedi Hassan</span>
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-electric-purple to-neon-cyan bg-[length:200%_auto] animate-gradient drop-shadow-lg">
                                    Shomik
                                </span>
                            </motion.h1>

                            {/* Typing Animation */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="h-8 md:h-10 mb-4 pointer-events-none"
                            >
                                <div className="text-lg md:text-xl lg:text-2xl font-mono text-gray-300">
                                    <span className="text-electric-purple">{'<'}</span>
                                    <span className="text-white">{displayText}</span>
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="text-neon-cyan"
                                    >
                                        |
                                    </motion.span>
                                    <span className="text-electric-purple">{' />'}</span>
                                </div>
                            </motion.div>

                            {/* Compact Info */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-6 pointer-events-none leading-relaxed"
                            >
                                Computer Science & Engineering student at <span className="text-neon-cyan font-semibold">United International University</span>
                                <br className="hidden md:block" />
                                <span className="hidden md:inline"> • </span>
                                Passionate about building intelligent solutions with <span className="text-electric-purple font-semibold">Data Science</span> & <span className="text-electric-purple font-semibold">Full Stack Development</span>
                            </motion.p>

                            {/* Compact Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto"
                            >
                                {highlights.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + i * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -3 }}
                                        className={`glass-panel p-3 md:p-4 rounded-xl border-t-2 ${item.color === 'neon-cyan' ? 'border-t-neon-cyan' : 'border-t-electric-purple'
                                            } group cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-sm`}
                                    >
                                        <item.icon
                                            className={`${item.color === 'neon-cyan' ? 'text-neon-cyan' : 'text-electric-purple'
                                                } mb-2 mx-auto group-hover:scale-110 transition-transform`}
                                            size={20}
                                        />
                                        <div className={`text-base md:text-lg font-bold ${item.color === 'neon-cyan' ? 'text-neon-cyan' : 'text-electric-purple'
                                            } mb-0.5`}>
                                            {item.value}
                                        </div>
                                        <div className="text-[10px] md:text-xs text-gray-400 font-mono">{item.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Tech Stack Pills */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="mt-6 flex flex-wrap justify-center gap-2 pointer-events-none"
                            >
                                {['Java', 'Python', 'React', 'Node.js', 'PHP', 'MySQL'].map((tech, i) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1.3 + i * 0.05 }}
                                        className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/5 text-gray-400 border border-white/10"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <style jsx>{`
                        @keyframes gradient {
                            0%, 100% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                        }
                        .animate-gradient {
                            animation: gradient 3s ease infinite;
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

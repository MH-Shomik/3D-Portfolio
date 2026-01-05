import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);
    const [phase, setPhase] = useState('initializing');

    const bootLogs = [
        "Initializing neural network...",
        "Loading WebGL context...",
        "Compiling vertex shaders...",
        "Compiling fragment shaders...",
        "Mounting file system...",
        "Connecting to quantum processors...",
        "Calibrating particle physics...",
        "System ready."
    ];

    useEffect(() => {
        let currentLogIndex = 0;

        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + Math.floor(Math.random() * 8) + 2;

                if (newProgress >= 100) {
                    clearInterval(interval);
                    setPhase('complete');
                    setTimeout(onComplete, 1000);
                    return 100;
                }

                // Update phase based on progress
                if (newProgress > 70) setPhase('finalizing');
                else if (newProgress > 40) setPhase('loading');

                return newProgress;
            });

            // Add logs occasionally
            if (Math.random() > 0.5 && currentLogIndex < bootLogs.length) {
                setLogs(prev => [...prev, bootLogs[currentLogIndex]]);
                currentLogIndex++;
            }
        }, 120);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-void-black flex flex-col items-center justify-center font-mono overflow-hidden"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)', transition: { duration: 1 } }}
        >
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                    animation: 'gridMove 20s linear infinite'
                }} />
            </div>

            {/* Glowing orb */}
            <motion.div
                className="absolute w-64 h-64 rounded-full blur-3xl"
                style={{
                    background: phase === 'complete'
                        ? 'radial-gradient(circle, rgba(0,240,255,0.3) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(189,0,255,0.2) 0%, transparent 70%)'
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <div className="relative z-10 w-80 md:w-96">
                {/* Logo/Title */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-electric-purple mb-2">
                        SHOMIK.DEV
                    </h1>
                    <p className="text-xs text-gray-500 tracking-widest">PORTFOLIO v2.0</p>
                </motion.div>

                {/* Progress section */}
                <div className="mb-6">
                    <div className="flex justify-between mb-2 text-sm">
                        <motion.span
                            className="text-neon-cyan font-semibold"
                            key={phase}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            {phase.toUpperCase().replace('_', ' ')}
                        </motion.span>
                        <motion.span
                            className="text-electric-purple font-bold"
                            key={progress}
                        >
                            {Math.min(100, progress)}%
                        </motion.span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div
                            className="h-full bg-gradient-to-r from-neon-cyan via-electric-purple to-neon-cyan rounded-full relative"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <div className="absolute inset-0 bg-white/30 animate-pulse" />
                        </motion.div>

                        {/* Scanning line effect */}
                        <motion.div
                            className="absolute top-0 bottom-0 w-1 bg-white/50 blur-sm"
                            animate={{ left: ['0%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </div>

                {/* Boot Logs */}
                <div className="h-40 flex flex-col justify-end overflow-hidden space-y-1 text-gray-400 font-mono text-[10px] md:text-xs">
                    <AnimatePresence mode="popLayout">
                        {logs.slice(-6).map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4 }}
                                className="flex items-center gap-2"
                            >
                                <span className="text-neon-cyan">{'>'}</span>
                                <span className="flex-1">{log}</span>
                                <motion.span
                                    className="text-green-500 text-[8px]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    ✓
                                </motion.span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Status indicator */}
                <motion.div
                    className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                    <span>Establishing connection...</span>
                </motion.div>
            </div>

            <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
        </motion.div>
    );
}

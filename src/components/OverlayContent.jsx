import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Code2, Cpu, Globe, Database, Smartphone } from 'lucide-react';

const Section = ({ children, title, id, activeSection }) => {
    return (
        <AnimatePresence mode="wait">
            {activeSection === id && (
                <>
                    {/* Backdrop with smooth fade */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 pointer-events-auto"
                        onClick={() => { }} // Placeholder for close handler
                    />

                    {/* Modal with spring animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 300,
                            mass: 0.8
                        }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                    >
                        <div className="w-full max-w-4xl max-h-[80vh] overflow-y-auto pointer-events-auto p-4 md:p-8 custom-scrollbar">
                            <motion.div
                                className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                {/* Decorative elements with stagger */}
                                <motion.div
                                    className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                                />
                                <motion.div
                                    className="absolute bottom-0 left-0 w-32 h-32 bg-electric-purple/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                                />

                                <motion.h2
                                    className="text-4xl md:text-5xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-8 tracking-tight"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15, duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
                                >
                                    {title}<span className="text-neon-cyan">.</span>
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default function OverlayContent({ activeSection }) {
    return (
        <div className="absolute inset-0 z-30 pointer-events-none">

            {/* About Section */}
            <Section id="about" title="<Bio />" activeSection={activeSection}>
                <div className="space-y-6 font-sans text-gray-300 leading-relaxed">
                    <motion.p
                        className="text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Hello, I'm <span className="text-white font-semibold text-xl">Mehedi Hassan Shomik</span>. A Computer Science & Engineering student at <span className="text-neon-cyan/80">United International University</span>, passionate about
                        <span className="text-neon-cyan font-semibold"> Data Science</span> and <span className="text-electric-purple font-semibold">Full Stack Development</span>.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        I specialize in building robust applications using Java, PHP, and the MERN stack. My experience spans from developing comprehensive web solutions to analyzing complex datasets.
                        <span className="inline-block px-2 py-0.5 ml-2 text-xs bg-neon-cyan/10 text-neon-cyan rounded-full border border-neon-cyan/30">Top 15% of Batch</span>
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <motion.div
                            className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(0,240,255,0.3)] cursor-pointer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                        >
                            <h3 className="text-white font-mono mb-3 flex items-center gap-2">
                                <Code2 className="text-neon-cyan group-hover:animate-pulse" size={20} /> Languages
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Java', 'Python', 'C/C++', 'PHP', 'JavaScript', 'SQL'].map((skill, i) => (
                                    <motion.span
                                        key={skill}
                                        className="px-3 py-1.5 text-xs rounded-full bg-neon-cyan/10 text-neon-cyan font-mono border border-neon-cyan/30 hover:bg-neon-cyan/20 hover:scale-110 transition-all cursor-pointer"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.7 + i * 0.05 }}
                                        whileHover={{ y: -2 }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-electric-purple/50 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(189,0,255,0.3)] cursor-pointer"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                        >
                            <h3 className="text-white font-mono mb-3 flex items-center gap-2">
                                <Globe className="text-electric-purple group-hover:animate-pulse" size={20} /> Web & Tools
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Node.js', 'HTML/CSS', 'MySQL', 'Bootstrap', 'Git'].map((skill, i) => (
                                    <motion.span
                                        key={skill}
                                        className="px-3 py-1.5 text-xs rounded-full bg-electric-purple/10 text-electric-purple font-mono border border-electric-purple/30 hover:bg-electric-purple/20 hover:scale-110 transition-all cursor-pointer"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8 + i * 0.05 }}
                                        whileHover={{ y: -2 }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-neon-cyan/30 transition-colors md:col-span-2">
                            <h3 className="text-white font-mono mb-3 flex items-center gap-2">
                                <Database className="text-white" size={20} /> Core Concepts
                            </h3>
                            <p className="text-sm text-gray-400">
                                Data Structures & Algorithms, OOP, DBMS, Statistics, Machine Learning, Data Entry
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Projects Section */}
            <Section id="projects" title="<Works />" activeSection={activeSection}>
                <div className="grid grid-cols-1 gap-6">
                    <ProjectCard
                        title="Prescribo"
                        desc="A Doctor-Patient communication application designed to manage appointments, prescriptions, and medical records efficiently."
                        tags={['Java', 'JavaFX', 'SQL', 'CSS']}
                        color="neon-cyan"
                        type="Desktop App"
                    />
                    <ProjectCard
                        title="ReportMate"
                        desc="Web-based crime reporting system featuring real-time case tracking, admin dashboards, and automated notifications."
                        tags={['PHP', 'MySQL', 'JavaScript', 'HTML/CSS']}
                        color="electric-purple"
                        type="Web App"
                    />
                    <ProjectCard
                        title="Special Child Development"
                        desc="A responsive management system for 'Inner Strength Child Development Care BD' to handle organization statistics and patient care."
                        tags={['PHP', 'Bootstrap', 'MySQL', 'JS']}
                        color="neon-cyan"
                        type="Web App"
                    />
                </div>
            </Section>

            {/* Contact Section */}
            <Section id="contact" title="{Contact}" activeSection={activeSection}>
                <div className="flex flex-col items-center justify-center py-12 space-y-8">
                    <p className="text-center text-xl text-gray-300 max-w-lg">
                        Let's build something amazing together.
                    </p>

                    <a href="mailto:mh70357@gmail.com" className="group relative px-8 py-4 bg-white/5 rounded-full overflow-hidden border border-white/10 hover:border-neon-cyan/50 transition-all">
                        <div className="absolute inset-0 bg-neon-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative font-mono text-neon-cyan group-hover:text-white transition-colors">mh70357@gmail.com</span>
                    </a>

                    <div className="font-mono text-gray-500 text-sm">
                        Dhaka, Bangladesh | +880 1778 973 299
                    </div>

                    <div className="flex gap-6">
                        <SocialLink icon={<Github />} href="https://github.com/MH-Shomik" label="Github" />
                        <SocialLink icon={<Linkedin />} href="https://www.linkedin.com/in/mehedi-hassan-shomik-08a3a7367" label="LinkedIn" />
                    </div>
                </div>
            </Section>

        </div>
    );
};

const ProjectCard = ({ title, desc, tags, color, type }) => (
    <div className="group relative p-6 bg-black/40 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer pointer-events-auto">
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-xl font-bold font-mono text-white group-hover:text-neon-cyan transition-colors">{title}</h3>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">{type}</span>
            </div>
            {/* <ExternalLink size={18} className="text-gray-500 group-hover:text-white transition-colors" /> */}
        </div>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            {desc}
        </p>
        <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
                <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                    {tag}
                </span>
            ))}
        </div>
    </div>
);

const SocialLink = ({ icon, href, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-neon-cyan transition-all"
        aria-label={label}
    >
        {icon}
    </a>
);

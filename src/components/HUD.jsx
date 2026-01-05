import React from 'react';
import { Cpu, FolderGit2, Mail, User, Terminal } from 'lucide-react';

const HUD = ({ activeSection, onNavigate }) => {
    return (
        <>
            {/* Top Left - Identity */}
            <div className="fixed top-8 left-8 z-40 hidden md:block pointer-events-auto">
                <div className="glass-panel p-4 rounded-br-2xl rounded-tl-2xl border-l-4 border-l-neon-cyan bg-black/40 backdrop-blur-md border hover:border-neon-cyan/30 transition-colors duration-300 shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                    <h1 className="font-mono text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
                        <Terminal size={24} className="text-neon-cyan" />
                        SHOMIK<span className="text-neon-cyan">.DEV</span>
                    </h1>
                    <p className="text-xs text-gray-400 font-mono mt-1 opacity-70">
                        {'>'} FULL_STACK_ENGINEER
                    </p>
                </div>
            </div>

            {/* Top Right - Status */}
            <div className="fixed top-8 right-8 z-40 hidden md:block pointer-events-auto">
                <div className="flex flex-col items-end gap-2 text-xs font-mono text-gray-400">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/5 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_10px_#00f0ff]"></span>
                        <span className="text-neon-cyan/80">SYSTEM_ONLINE</span>
                    </div>
                    <div className="opacity-50">v2.0.24</div>
                </div>
            </div>

            {/* Bottom Center - Navigation */}
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-auto">
                <div className="relative">
                    {/* Glowing Backdrop */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/40 to-neon-cyan/0 rounded-full blur-xl animate-pulse" />

                    <div className="relative glass-panel px-6 py-3 rounded-full flex justify-between items-center bg-black/80 backdrop-blur-xl border-[2px] border-neon-cyan shadow-[0_0_30px_rgba(0,240,255,0.6),inset_0_0_20px_rgba(0,240,255,0.2)]">
                        <NavItem
                            icon={<User size={20} />}
                            label="BIO"
                            isActive={activeSection === 'about'}
                            onClick={() => onNavigate('about')}
                        />
                        <div className="w-px h-8 bg-white/10 mx-2" />
                        <NavItem
                            icon={<FolderGit2 size={20} />}
                            label="WORKS"
                            isActive={activeSection === 'projects'}
                            onClick={() => onNavigate('projects')}
                        />
                        <div className="w-px h-8 bg-white/10 mx-2" />
                        <NavItem
                            icon={<Mail size={20} />}
                            label="CONTACT"
                            isActive={activeSection === 'contact'}
                            onClick={() => onNavigate('contact')}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const NavItem = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`relative flex items-center gap-3 px-4 py-2 font-mono text-sm transition-all duration-300 group cursor-pointer rounded-full overflow-hidden ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
    >
        {isActive && (
            <div className="absolute inset-0 bg-neon-cyan/10" />
        )}

        <div className={`relative z-10 p-1 rounded-md transition-all duration-300 ${isActive
            ? 'text-neon-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] scale-110'
            : 'group-hover:text-neon-cyan group-hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]'
            }`}>
            {icon}
        </div>

        <span className={`relative z-10 font-bold tracking-wider ${isActive ? 'text-neon-cyan' : ''
            }`}>
            {label}
        </span>

        {/* Underline indicator */}
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-neon-cyan shadow-[0_0_10px_#00f0ff] transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
            }`} />
    </button>
);

export default HUD;

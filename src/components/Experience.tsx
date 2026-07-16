import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Briefcase, 
  Award, 
  Linkedin, 
  Terminal, 
  Zap, 
  Shield, 
  Cpu, 
  Code, 
  CheckCircle, 
  RefreshCw 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string[];
  icon: React.ReactNode;
  tags: string[];
}

interface AchievementItem {
  title: string;
  award: string;
  organization: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

const experiences: ExperienceItem[] = [
  {
    role: 'Core Developer & Community Member',
    organization: 'Kanpur AI',
    period: 'Jul 2024 - Present',
    description: [
      'Engineered responsive web applications and landing pages for local AI developer meetups and events.',
      'Collaborated on building community platforms using modern frameworks like React and Vite.',
      'Fostered the growth of AI technologies in Kanpur by organizing hackathons, tech talks, and meetups.'
    ],
    icon: <Cpu className="w-5 h-5 text-red-500" />,
    tags: ['React.js', 'Vite', 'Tailwind CSS', 'Community Development']
  },
  {
    role: 'Technical Lead & Developer',
    organization: 'NSOC (Network Security & Open Source Club)',
    period: 'Oct 2023 - Present',
    description: [
      'Led development initiatives for security-focused and open-source applications.',
      'Conducted workshops on Git, web development, and secure coding practices for over 100+ students.',
      'Maintained internal club repositories and mentored junior web developers.'
    ],
    icon: <Shield className="w-5 h-5 text-blue-500" />,
    tags: ['Git', 'Cybersecurity', 'Open Source', 'Node.js']
  },
  {
    role: 'Freelance Full-Stack Developer',
    organization: 'Self-Employed',
    period: 'Jan 2023 - Present',
    description: [
      'Delivered 10+ custom client websites ranging from WordPress architectures to fully bespoke React applications.',
      'Designed SEO-optimized, highly responsive user interfaces with focus on user conversion rates.',
      'Managed full deployment cycles, backend logic integration, and local database storage setups.'
    ],
    icon: <Code className="w-5 h-5 text-purple-500" />,
    tags: ['WordPress', 'React', 'MongoDB', 'SEO Optimization']
  }
];

const achievements: AchievementItem[] = [
  {
    title: 'Aviothic 2.0 Hackathon',
    award: '🏆 Runner-Up (2nd Place)',
    organization: 'Aviation Tech Hackathon',
    period: 'Jan 2025',
    description: 'Designed and coded an advanced web application targeting aviation problems, finishing 2nd out of dozens of competing engineering teams in an intensive 36-hour sprint.',
    icon: <Zap className="w-5 h-5 text-yellow-500" />,
    link: 'https://www.linkedin.com/in/chiragvishnoi01/'
  },
  {
    title: 'LinkedIn Tech Community Contributor',
    award: 'Verified Accomplishments',
    organization: 'LinkedIn Insights',
    period: 'Continuous',
    description: 'Actively documenting development progress, building networks with industry leaders, and promoting technical education in AI and open-source.',
    icon: <Linkedin className="w-5 h-5 text-blue-500" />,
    link: 'https://www.linkedin.com/in/chiragvishnoi01/'
  }
];

const terminalLogs = [
  { text: 'ESTABLISHING SECURE PROTOCOL TO LINKEDIN DATABASE...', delay: 100 },
  { text: 'RESOLVING ENDPOINT: https://api.linkedin.com/v2/people/chiragvishnoi01...', delay: 300 },
  { text: 'STATUS CODE 200: CONNECTION ESTABLISHED (TLS 1.3 SECURE SHELL)', delay: 500 },
  { text: 'PARSING PROFILE: chiragvishnoi-01...', delay: 700 },
  { text: 'RETRIEVING EXPERIENCE DATASETS...', delay: 900 },
  { text: '>> Loaded: [Kanpur AI, NSOC, Freelance Projects]', delay: 1100 },
  { text: 'RETRIEVING ACHIEVEMENTS & CERTIFICATIONS...', delay: 1300 },
  { text: '>> Loaded: [Aviothic 2.0 Hackathon - Rank 2]', delay: 1500 },
  { text: 'DECRYPTING RECORD SHEETS AND COMPILING INTERACTIVE CARDS...', delay: 1700 },
  { text: 'HOLOGRAPHIC SYNC STATUS: SUCCESSFUL.', delay: 1900 }
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const termRef = useRef<HTMLDivElement>(null);
  
  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'experience' | 'achievements'>('experience');

  const startSync = () => {
    if (syncState === 'syncing') return;
    
    setSyncState('syncing');
    setLogs([]);
    
    // Animate terminal window popping up
    gsap.fromTo(termRef.current, 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)' }
    );

    // Simulate logs running
    terminalLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log.text]);
        
        // Scroll terminal to bottom
        if (termRef.current) {
          const consoleBody = termRef.current.querySelector('.term-body');
          if (consoleBody) {
            consoleBody.scrollTop = consoleBody.scrollHeight;
          }
        }
        
        // Check if last log
        if (index === terminalLogs.length - 1) {
          setTimeout(() => {
            // Transition out of terminal and reveal content
            setSyncState('synced');
          }, 600);
        }
      }, log.delay);
    });
  };

  // Trigger sync on scroll trigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        onEnter: () => {
          if (syncState === 'idle') {
            startSync();
          }
        },
        once: true
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards on sync or tab change
  useEffect(() => {
    if (syncState === 'synced') {
      const ctx = gsap.context(() => {
        gsap.fromTo('.reveal-card', 
          { opacity: 0, y: 35, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.05 }
        );
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [activeTab, syncState]);

  // Card hover 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.3
    });
    
    const glow = card.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      gsap.to(glow, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        opacity: 0.15,
        duration: 0.3
      });
    }
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      ease: 'power3.out',
      duration: 0.8
    });
    
    const glow = card.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.8
      });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="experience" 
      className="relative min-h-screen py-32 px-4 md:px-20 overflow-hidden bg-black"
    >
      {/* Background Tech Grids */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[2px] w-12 bg-red-500" aria-hidden="true" />
          <h2 className="text-sm md:text-base font-mono text-red-500 uppercase tracking-[0.3em]">
            JOURNEY ARCHIVES
          </h2>
          <div className="h-[2px] flex-grow bg-gradient-to-r from-red-500 to-transparent"></div>
        </div>

        {/* Title and Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <h3 className="text-4xl md:text-6xl font-black font-display text-white uppercase tracking-tighter">
              XP & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">ACCOMPLISHMENTS</span>
            </h3>
            <p className="text-gray-400 font-mono text-sm mt-3 max-w-xl leading-relaxed">
              Archiving professional development milestones, open-source intelligence, and competitive engineering records synced directly with LinkedIn databases.
            </p>
          </div>
          
          {/* Sync indicator */}
          <div className="flex items-center gap-4">
            <button 
              onClick={startSync}
              disabled={syncState === 'syncing'}
              className="flex items-center gap-2 px-5 py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 text-xs font-mono tracking-widest text-white uppercase transition-colors rounded-lg hover-target hover:border-red-500/40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncState === 'syncing' ? 'animate-spin text-red-500' : ''}`} />
              {syncState === 'syncing' ? 'Syncing...' : 'Sync LinkedIn Data'}
            </button>
            
            <div className="flex items-center gap-2 font-mono text-xs text-gray-500">
              <span className={`w-2.5 h-2.5 rounded-full ${syncState === 'synced' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`}></span>
              <span>{syncState === 'synced' ? 'LIVE SYNC ACTIVE' : 'DATABASE OFFLINE'}</span>
            </div>
          </div>
        </div>

        {/* Terminal Loading Screen */}
        {syncState !== 'synced' && (
          <div 
            ref={termRef} 
            className="w-full max-w-3xl mx-auto border border-white/15 bg-black/80 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(237,29,36,0.15)] backdrop-blur-md"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[#0f0f0f] border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <Terminal className="w-3.5 h-3.5" />
                <span>LINKEDIN_SYNC_HELPER.EXE</span>
              </div>
              <div className="w-12"></div>
            </div>
            
            <div className="term-body p-6 h-64 overflow-y-auto font-mono text-xs text-green-400 space-y-2.5 scrollbar-thin select-none">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-gray-600">&gt;</span>
                  <span className={log.startsWith('HOLOGRAPHIC') || log.startsWith('STATUS') ? 'text-blue-400' : log.includes('SUCCESSFUL') || log.includes('Loaded') ? 'text-green-300 font-bold' : ''}>
                    {log}
                  </span>
                </div>
              ))}
              {syncState === 'syncing' && (
                <div className="flex items-center gap-2 mt-4 text-gray-500">
                  <span className="animate-ping w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  <span>FETCHING METADATA PROTOCOLS...</span>
                </div>
              )}
              {syncState === 'idle' && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-8">
                  <p className="text-gray-500 uppercase tracking-widest text-xs">
                    Ready to load secure resume achievements
                  </p>
                  <button 
                    onClick={startSync}
                    className="px-6 py-2.5 bg-red-600 text-white hover:bg-red-700 transition-colors uppercase tracking-widest font-black text-xs skew-x-[-10deg] hover-target"
                  >
                    <span className="block skew-x-[10deg]">Connect Database</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Synced Content Dashboard */}
        {syncState === 'synced' && (
          <div className="space-y-12">
            
            {/* Desktop Tabs / Mobile Selector */}
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setActiveTab('experience')}
                className={`pb-4 px-6 font-display text-2xl uppercase tracking-wider relative transition-colors hover-target ${activeTab === 'experience' ? 'text-red-500' : 'text-gray-500 hover:text-white'}`}
              >
                <span>Mission Logs (Experience)</span>
                {activeTab === 'experience' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 shadow-[0_0_10px_#ef4444]"></div>
                )}
              </button>
              <button 
                onClick={() => setActiveTab('achievements')}
                className={`pb-4 px-6 font-display text-2xl uppercase tracking-wider relative transition-colors hover-target ${activeTab === 'achievements' ? 'text-blue-500' : 'text-gray-500 hover:text-white'}`}
              >
                <span>Tactical Triumphs (Achievements)</span>
                {activeTab === 'achievements' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                )}
              </button>
            </div>

            {/* Experience Panel */}
            {activeTab === 'experience' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {experiences.map((xp, index) => (
                  <div
                    key={index}
                    ref={el => { cardsRef.current[index] = el; }}
                    onMouseMove={e => cardsRef.current[index] && handleMouseMove(e, cardsRef.current[index]!)}
                    onMouseLeave={() => cardsRef.current[index] && handleMouseLeave(cardsRef.current[index]!)}
                    className="reveal-card group relative p-8 rounded-2xl bg-zinc-950/60 border border-white/10 overflow-hidden backdrop-blur-sm transition-transform duration-200"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Hover radial glow */}
                    <div className="card-glow absolute top-1/2 left-1/2 w-64 h-64 bg-red-500/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none transition-opacity duration-300"></div>
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl group-hover:border-red-500/40 group-hover:bg-red-500/20 transition-all duration-300">
                        {xp.icon}
                      </div>
                      <span className="font-mono text-xs text-gray-500 font-bold uppercase tracking-wider">
                        {xp.period}
                      </span>
                    </div>

                    <h4 className="text-2xl font-black font-display text-white uppercase tracking-tight mb-1 group-hover:text-red-400 transition-colors">
                      {xp.role}
                    </h4>
                    <p className="text-red-500 font-mono text-sm tracking-wide mb-6">
                      @{xp.organization}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-3 mb-8 text-gray-400 font-mono text-xs leading-relaxed">
                      {xp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-3.5 h-3.5 text-red-500/50 mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mt-auto">
                      {xp.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2 py-0.5 text-[10px] font-bold bg-white/5 border border-white/10 text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements Panel */}
            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {achievements.map((ach, index) => (
                  <div
                    key={index}
                    ref={el => { cardsRef.current[index + 10] = el; }} // separate index spacer
                    onMouseMove={e => cardsRef.current[index + 10] && handleMouseMove(e, cardsRef.current[index + 10]!)}
                    onMouseLeave={() => cardsRef.current[index + 10] && handleMouseLeave(cardsRef.current[index + 10]!)}
                    className="reveal-card group relative p-8 rounded-2xl bg-zinc-950/60 border border-white/10 overflow-hidden backdrop-blur-sm transition-transform duration-200"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Hover radial glow */}
                    <div className="card-glow absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none transition-opacity duration-300"></div>
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl group-hover:border-blue-500/40 group-hover:bg-blue-500/20 transition-all duration-300">
                        {ach.icon}
                      </div>
                      <span className="font-mono text-xs text-gray-500 font-bold uppercase tracking-wider">
                        {ach.period}
                      </span>
                    </div>

                    <h4 className="text-3xl font-black font-display text-white uppercase tracking-tight mb-1 group-hover:text-blue-400 transition-colors">
                      {ach.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-blue-500 font-mono text-xs font-bold uppercase tracking-wider">
                        {ach.award}
                      </span>
                      <span className="text-gray-600 font-mono text-xs">•</span>
                      <span className="text-gray-400 font-mono text-xs">
                        {ach.organization}
                      </span>
                    </div>

                    <p className="text-gray-400 font-mono text-xs leading-relaxed mb-8">
                      {ach.description}
                    </p>

                    {ach.link && (
                      <a
                        href={ach.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-white group-hover:text-blue-400 transition-colors border-t border-white/5 pt-4 w-full"
                      >
                        Verify Accomplishment
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

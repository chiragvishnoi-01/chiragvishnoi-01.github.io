import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { label: 'React.js', level: 90 },
  { label: 'Node.js', level: 85 },
  { label: 'WordPress', level: 92 },
  { label: 'TypeScript', level: 80 },
  { label: 'Three.js', level: 75 },
  { label: 'MongoDB', level: 82 },
];

const facts = [
  { value: '3+', label: 'Years Building' },
  { value: '20+', label: 'Projects Shipped' },
  { value: '10+', label: 'Tech Stacks' },
  { value: '∞', label: 'Lines of Code' },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      // Card reveal
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 60, rotationY: 15 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      // Skill bars animation
      if (barsRef.current) {
        const bars = barsRef.current.querySelectorAll('.skill-bar-fill');
        bars.forEach((bar) => {
          const target = (bar as HTMLElement).dataset.level || '0';
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: `${target}%`,
              duration: 1.4,
              ease: 'power2.out',
              scrollTrigger: { trigger: barsRef.current, start: 'top 80%' },
            }
          );
        });
      }

      // 3D Tilt on ID card
      if (cardRef.current) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = cardRef.current!.getBoundingClientRect();
          const rotateX = (((e.clientY - rect.top) / rect.height) - 0.5) * -20;
          const rotateY = (((e.clientX - rect.left) / rect.width) - 0.5) * 20;
          gsap.to(cardRef.current, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, ease: 'power1.out', duration: 0.3 });
          const glare = cardRef.current!.querySelector('.glare');
          if (glare) gsap.to(glare, { x: e.clientX - rect.left - rect.width / 2, y: e.clientY - rect.top - rect.height / 2, opacity: 0.8, duration: 0.3 });
        };
        const handleMouseLeave = () => {
          gsap.to(cardRef.current, { rotationX: 0, rotationY: 0, ease: 'power3.out', duration: 0.8 });
          const glare = cardRef.current!.querySelector('.glare');
          if (glare) gsap.to(glare, { opacity: 0, duration: 0.8 });
        };
        cardRef.current.addEventListener('mousemove', handleMouseMove);
        cardRef.current.addEventListener('mouseleave', handleMouseLeave);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-32 px-4 md:px-20 overflow-hidden"
      aria-label="About Chirag Vishnoi"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[2px] w-12 bg-red-500" aria-hidden="true" />
          <h2 className="text-sm md:text-base font-mono text-red-500 uppercase tracking-[0.3em]">
            Origin Story
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── LEFT — Text ── */}
          <div ref={textRef} className="z-10">
            {/* Semantic article for Google crawler */}
            <article
              itemScope
              itemType="https://schema.org/Person"
            >
              {/* Hidden machine-readable identity fields for Google */}
              <meta itemProp="name" content="Chirag Vishnoi" />
              <meta itemProp="alternateName" content="chirag.dev" />
              <meta itemProp="jobTitle" content="Full Stack Developer & WordPress Wizard" />
              <meta itemProp="url" content="https://chiragvishnoi-01.github.io/" />
              <meta itemProp="image" content="https://github.com/chiragvishnoi-01.png" />
              <meta itemProp="nationality" content="India" />
              <link itemProp="sameAs" href="https://www.linkedin.com/in/chiragvishnoi01/" />
              <link itemProp="sameAs" href="https://github.com/chiragvishnoi-01" />
              <link itemProp="sameAs" href="https://instagram.com/chiragvishnoi01" />

              <h3 className="text-4xl md:text-6xl font-black font-display text-white uppercase tracking-tighter mb-8">
                Meet the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
                  Developer
                </span>
              </h3>

              <div className="space-y-5 text-gray-400 font-mono text-sm md:text-base leading-relaxed">
                <p itemProp="description">
                  I'm <strong className="text-white">Chirag Vishnoi</strong>, a B.Tech (Computer Science) student
                  and an ambitious <strong className="text-white">Full Stack Developer</strong> from India.
                  I specialize in crafting modern, scalable, and visually stunning web applications using the
                  latest technologies.
                </p>
                <p>
                  As a <strong className="text-white">React Developer</strong> and{' '}
                  <strong className="text-white">Node.js Developer</strong>, I build high-performance
                  client-server applications end-to-end. My expertise as a{' '}
                  <strong className="text-white">WordPress Wizard</strong> lets me deliver powerful CMS solutions
                  while my passion for <strong className="text-white">Three.js</strong> and{' '}
                  <strong className="text-white">AI integration</strong> keeps my work ahead of the curve.
                </p>
                <p className="text-white border-l-2 border-red-500 pl-4 italic">
                  "Building the future of the web, one mission at a time."
                </p>
              </div>

              {/* Quick facts */}
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center hover:border-red-500/40 transition-colors"
                  >
                    <div className="text-2xl font-black font-display text-red-500">{f.value}</div>
                    <div className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">{f.label}</div>
                  </div>
                ))}
              </div>
            </article>

            {/* Skill bars */}
            <div ref={barsRef} className="mt-12 space-y-4">
              <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-6">Core Skills</h4>
              {skills.map((skill) => (
                <div key={skill.label}>
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-xs text-gray-300 uppercase tracking-wider">{skill.label}</span>
                    <span className="font-mono text-xs text-red-400">{skill.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="skill-bar-fill h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                      data-level={skill.level}
                      style={{ width: 0 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex gap-4 flex-wrap">
              <a
                href="/myresume.docx"
                download
                className="px-8 py-3 bg-red-600 text-white font-black uppercase tracking-wider hover:bg-red-700 transition-colors hover-target skew-x-[-10deg]"
                aria-label="Download Chirag Vishnoi's Resume"
              >
                <span className="block skew-x-[10deg]">Download Resume</span>
              </a>
              <a
                href="https://www.linkedin.com/in/chiragvishnoi01/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-white/20 text-white font-black uppercase tracking-wider hover:border-red-500 hover:text-red-400 transition-colors hover-target skew-x-[-10deg]"
                aria-label="Chirag Vishnoi on LinkedIn"
              >
                <span className="block skew-x-[10deg]">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* ── RIGHT — ID Card ── */}
          <div className="relative z-10 flex justify-center perspective-1000">
            <div
              ref={cardRef}
              className="relative w-full max-w-md aspect-[2/3] rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md overflow-hidden shadow-[0_0_60px_rgba(237,29,36,0.25)]"
              role="img"
              aria-label="Chirag Vishnoi developer ID card"
            >
              {/* Holographic glare */}
              <div className="glare absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none mix-blend-overlay z-50" />

              {/* Card header */}
              <div className="h-24 bg-gradient-to-r from-red-700 to-red-950 flex items-center justify-between px-6 border-b border-white/20">
                <div className="font-black font-display text-white text-2xl tracking-tighter">CHIRAG.DEV</div>
                <div className="text-xs font-mono text-white/60 uppercase tracking-widest text-right">
                  <div>Portfolio</div>
                  <div>2024–Present</div>
                </div>
              </div>

              {/* Profile image */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-black bg-zinc-800 overflow-hidden shadow-2xl z-10">
                <div
                  role="img"
                  aria-label="Chirag Vishnoi profile photo"
                  className="w-full h-full bg-[url('https://github.com/chiragvishnoi-01.png')] bg-cover bg-center opacity-90"
                />
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none" />
              </div>

              {/* Card body */}
              <div className="pt-28 px-8 pb-8 flex flex-col items-center text-center">
                <h4 className="text-2xl font-black font-display text-white uppercase tracking-tighter mb-1">
                  Chirag Vishnoi
                </h4>
                <p className="text-red-400 font-mono text-xs tracking-widest mb-2">chirag.dev</p>
                <p className="text-gray-400 font-mono text-[10px] tracking-widest mb-6">ID: SPDR-001 · INDIA</p>

                <div className="w-full space-y-4 text-left">
                  {[
                    { label: 'Role', value: 'Full Stack Developer' },
                    { label: 'Stack', value: 'React · Node · WP · Three.js' },
                    { label: 'Education', value: 'B.Tech (CS)' },
                    { label: 'Clearance', value: 'Level 8 (Avenger)' },
                    { label: 'Status', value: '🟢 Open to Work' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-gray-400 font-mono text-xs uppercase">{row.label}</span>
                      <span className="text-white font-mono text-xs font-bold text-right max-w-[55%]">{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Barcode */}
                <div className="mt-auto pt-8 w-full flex justify-center opacity-40">
                  <div className="h-10 w-full bg-[repeating-linear-gradient(90deg,white,white_2px,transparent_2px,transparent_4px,white_4px,white_5px,transparent_5px,transparent_8px)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

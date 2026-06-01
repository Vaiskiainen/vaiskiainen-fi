import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { CanvasRevealEffect } from './components/CanvasRevealEffect';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import TechStack from './components/TechStack';
import Stats from './components/Stats';
import Contributions from './components/Contributions';
import Socials from './components/Socials';
import NotFound from './components/NotFound';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-200 z-[100] shadow-[0_0_10px_rgba(255,255,255,0.3)]"
    />
  );
}

function GlobalLoader() {
  return (
    <div className="bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 min-h-screen flex items-center justify-center font-sans">
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-zinc-500 text-sm tracking-[0.3em] uppercase font-medium"
      >
        Loading
      </motion.p>
    </div>
  );
}

import { Moon, Sun, Menu, X } from 'lucide-react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    setIsDark(isCurrentlyDark);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full ml-1 sm:ml-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800/50 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
    </button>
  );
}

function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/statistics', label: 'Statistics' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed left-1/2 transform -translate-x-1/2 z-[60] flex items-center justify-between backdrop-blur-xl rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'top-3 sm:top-4 px-4 py-2 sm:px-6 sm:py-2.5 bg-white/80 dark:bg-[#0a0a0a]/80 border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-zinc-800/5 dark:shadow-black/20 w-[calc(100%-2rem)] sm:w-auto' : 'top-4 sm:top-8 px-5 py-3 sm:px-8 sm:py-4 bg-white/40 dark:bg-zinc-900/40 border-transparent shadow-none w-[calc(100%-1rem)] sm:w-auto'}`}>
        <div className="flex items-center gap-x-4 sm:gap-x-12 w-full justify-between transition-all duration-500">
          <div className="flex items-center">
            <Link to="/" className={`flex items-center justify-center overflow-hidden rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-10 h-10 sm:w-12 sm:h-12'}`}>
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" onError={(e) => {
                // Fallback if logo not yet uploaded
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>';
              }}/>
            </Link>
          </div>
          <div className={`hidden sm:flex items-center font-sans         transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'gap-6 text-sm' : 'gap-8 text-base'}`}>
            {links.map(link => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative flex items-center transition-colors hover:text-zinc-900 dark:hover:text-white ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'} ${isScrolled ? 'h-5' : 'h-6'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -inset-x-3.5 -inset-y-2 bg-zinc-100 dark:bg-zinc-800/60 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className={`relative z-10 overflow-hidden ${isScrolled ? 'h-5' : 'h-6'}`}>
                    <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:-translate-y-1/2">
                      <span className={`flex items-center ${isScrolled ? 'h-5' : 'h-6'}`}>{link.label}</span>
                      <span className={`text-zinc-900 dark:text-white flex items-center ${isScrolled ? 'h-5' : 'h-6'}`}>{link.label}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
            <a
              href="https://status.vaiskiainen.fi"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center group transition-colors hover:text-zinc-900 dark:hover:text-white text-zinc-500 dark:text-zinc-400 ml-2 relative ${isScrolled ? 'h-5' : 'h-6'}`}
            >
              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -inset-x-3.5 -inset-y-2 bg-zinc-100/50 dark:bg-zinc-800/30 rounded-full" />
              <div className={`relative z-10 overflow-hidden ${isScrolled ? 'h-5' : 'h-6'}`}>
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:-translate-y-1/2">
                  <span className={`flex items-center ${isScrolled ? 'h-5' : 'h-6'}`}>Status</span>
                  <span className={`text-zinc-900 dark:text-white flex items-center ${isScrolled ? 'h-5' : 'h-6'}`}>Status</span>
                </div>
              </div>
            </a>
            <div className="ml-2 z-10">
              <ThemeToggle />
            </div>
          </div>
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="flex items-center justify-center p-1 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <Menu size={20} className={`transition-transform duration-300 ${isMobileMenuOpen ? 'scale-0 opacity-0 absolute' : 'scale-100 opacity-100 relative'}`} />
              <X size={20} className={`transition-transform duration-300 ${isMobileMenuOpen ? 'scale-100 opacity-100 relative' : 'scale-0 opacity-0 absolute'}`} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl sm:hidden pt-[110px] px-6 pb-6 flex flex-col h-[100dvh]"
          >
            <div className="flex flex-col gap-6 text-xl mt-4">
              {links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors ${location.pathname === link.path ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://status.vaiskiainen.fi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-500 dark:text-zinc-400 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                Status
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />
      <Projects limit={6} showGithubLink={true} />
      <Socials />
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col flex-grow w-full h-full text-zinc-900 dark:text-zinc-50 transition-colors duration-300"
    >
      {children}
    </motion.div>
  );
}

function ProjectsPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <Projects showSearch={true} showGithubLink={true} />
      <TechStack />
    </div>
  );
}

function StatisticsPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <Stats />
      <Contributions />
    </div>
  );
}

function ContactPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <Socials />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
        <Route path="/projects/:id" element={<PageWrapper><ProjectDetails /></PageWrapper>} />
        <Route path="/statistics" element={<PageWrapper><StatisticsPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {

    const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));
    

    const prefetchData = fetch('https://github-contributions-api.jogruber.de/v4/vaiskiainen?y=last')
      .then(res => res.json())
      .catch(err => {
        console.error("Github prefetch failed", err);
      });

    Promise.all([minLoadTime, prefetchData]).then(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return <GlobalLoader />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 min-h-screen selection:bg-zinc-200 selection:text-zinc-800 dark:selection:bg-zinc-800 dark:selection:text-zinc-200 font-sans flex flex-col relative overflow-x-hidden transition-colors duration-300">
        <ScrollProgress />
        <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300">
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-transparent dark:bg-black"
            colors={isDark ? [
              [200, 200, 200],
              [200, 200, 200],
            ] : [
              [0, 0, 0],
              [0, 0, 0],
            ]}
            dotSize={4}
            reverse={false}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_100%)] dark:bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.8)_0%,_transparent_100%)] pointer-events-none transition-colors duration-300" />
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-zinc-50 dark:from-black to-transparent pointer-events-none transition-colors duration-300" />
        </div>
        
        <Navigation />
        <main className="relative z-10 pt-24 flex-grow flex flex-col items-center justify-center">
          <AnimatedRoutes />
        </main>
        <footer className="relative z-10 py-8 text-center text-sm text-zinc-500 dark:text-zinc-600 mt-auto border-t border-zinc-200 dark:border-zinc-900/50 transition-colors duration-300">
           <p>© {new Date().getFullYear()} vaiskiainen. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

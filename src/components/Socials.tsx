import { useState } from 'react';
import { Github, Mail, Code2, TerminalSquare, Copy, Check } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Parallax } from './Parallax';
import { AnimatedHeading } from './AnimatedHeading';

function XIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="none" 
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      stroke="none" 
      className={className}
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 1-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const socials = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/vaiskiainen', highlight: true },
  { name: 'Twitter', icon: XIcon, href: 'https://x.com/vaiskiainen' },
  { name: 'Discord', icon: DiscordIcon, href: 'https://discordapp.com/users/1205851726586970125' },
];

export default function Socials() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('vaiskiainen@vaiskiainen.fi');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-3xl mx-auto text-center">
      <Parallax offset={25}>
        <FadeIn>
          <div className="inline-flex items-center justify-center p-3 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-2xl mb-6 sm:mb-8 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
            <TerminalSquare className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 dark:text-zinc-400 transition-colors duration-300" />
          </div>
          <div className="flex justify-center flex-wrap">
            <AnimatedHeading text="Contact me" className="text-3xl sm:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300" delay={0.1} />
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg mb-8 transition-colors duration-300">
            Have a question or want to talk? Contact me:
          </p>
          <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-10">
            <a href="mailto:vaiskiainen@vaiskiainen.fi" className="inline-flex items-center gap-2 text-xl sm:text-2xl font-display font-medium text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors pb-1 border-b border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 duration-300">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 dark:text-zinc-400 transition-colors duration-300" />
              vaiskiainen@vaiskiainen.fi
            </a>
            <button
              onClick={handleCopy}
              className={`p-2.5 rounded-full border transition-all duration-300 group relative flex items-center justify-center ${
                copied 
                  ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 shadow-sm' 
                  : 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white shadow-sm hover:shadow hover:-translate-y-0.5'
              }`}
              aria-label="Copy email address"
            >
              {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" />}
              <span className={`absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs sm:text-sm font-medium px-2 py-1 rounded-md transition-all duration-200 pointer-events-none whitespace-nowrap shadow-md ${
                copied ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0'
              }`}>
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>
        </FadeIn>
      </Parallax>
      
      <Parallax offset={15}>
        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a 
                  key={s.name} 
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  className={`flex items-center justify-center gap-3 px-6 py-4 rounded-full border transition-all duration-300 font-medium hover:scale-105 hover:-translate-y-1 w-full sm:w-auto ${
                    s.highlight 
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-zinc-900 dark:border-white hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:border-zinc-800 dark:hover:border-zinc-200 shadow-xl shadow-black/10 dark:shadow-white/10' 
                      : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{s.name}</span>
                </a>
              )
            })}
          </div>
        </FadeIn>
      </Parallax>
    </section>
  );
}


import { FadeIn } from './FadeIn';
import { Parallax } from './Parallax';

const technologies = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML/CSS', 'Python', 'Java', 'Kotlin'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vite'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'GraphQL'] },
  { category: 'Other', items: ['Git', 'Docker', 'Discord', 'Electron', 'VSCode', 'Linux'] },
];

export default function TechStack() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <Parallax offset={15}>
        <FadeIn>
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">Tech Stack</h2>
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-grow rounded-full transition-colors duration-300"></div>
          </div>
        </FadeIn>
      </Parallax>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {technologies.map((tech, index) => (
          <Parallax offset={10} key={tech.category}>
            <FadeIn delay={index * 0.1}>
              <div className="p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200 dark:border-zinc-800 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300 h-full">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-6 font-display tracking-wide uppercase transition-colors duration-300">
                  {tech.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tech.items.map((item) => (
                    <span 
                      key={item} 
                      className="px-4 py-2 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-sm font-medium rounded-full border border-zinc-200/80 dark:border-zinc-800/80 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-all duration-300 cursor-default hover:scale-105 shadow-sm dark:shadow-none"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </Parallax>
        ))}
      </div>
    </section>
  );
}

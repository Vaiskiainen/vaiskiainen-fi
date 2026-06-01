import { GitHubCalendar } from 'react-github-calendar';
import { FadeIn } from './FadeIn';
import { Parallax } from './Parallax';
import { AnimatedHeading } from './AnimatedHeading';

export default function Contributions() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <Parallax offset={20}>
        <FadeIn>
          <div className="mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <AnimatedHeading text="Activity" className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-2 transition-colors duration-300" delay={0.1} />
              <p className="text-sm sm:text-base text-zinc-500 font-sans transition-colors duration-300">My recent github contributions</p>
            </div>
          </div>
        </FadeIn>
      </Parallax>
      <Parallax offset={10}>
        <FadeIn delay={0.2} className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 shadow-sm dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] w-full overflow-hidden transition-all duration-300">
          <div className="w-full overflow-x-auto overflow-y-hidden pb-4">
            <div className="min-w-max text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
              <div className="dark:block hidden">
                <GitHubCalendar 
                  username="vaiskiainen" 
                  colorScheme="dark"
                  theme={{
                    dark: ['#18181b', '#3f3f46', '#71717a', '#a1a1aa', '#e4e4e7'],
                  }}
                  blockSize={14}
                  blockMargin={6}
                  fontSize={12}
                />
              </div>
              <div className="block dark:hidden">
                <GitHubCalendar 
                  username="vaiskiainen" 
                  colorScheme="light"
                  theme={{
                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  }}
                  blockSize={14}
                  blockMargin={6}
                  fontSize={12}
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </Parallax>
    </section>
  );
}


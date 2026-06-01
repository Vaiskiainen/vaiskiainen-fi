import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Parallax } from './Parallax';

export default function Hero() {
  const { scrollY } = useScroll();
  const textOpacity = useTransform(scrollY, [100, 450], [1, 0]);
  const textBlur = useTransform(scrollY, [100, 450], ["blur(0px)", "blur(12px)"]);
  const textY = useTransform(scrollY, [100, 450], [0, -50]);
  
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center overflow-hidden px-6">
      <motion.div style={{ opacity: textOpacity, filter: textBlur, y: textY }} className="flex flex-col items-center justify-center w-full">
        <Parallax offset={20}>
          <FadeIn delay={0.1} className="mb-8 relative flex justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-zinc-100 text-zinc-950 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center shadow-[0_0_80px_rgba(0,0,0,0.15)] dark:shadow-[0_0_80px_rgba(255,255,255,0.15)] relative z-10 overflow-hidden">
              <img src="https://github.com/vaiskiainen.png" alt="vaiskiainen" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black dark:bg-white blur-3xl opacity-10 dark:opacity-20 -z-10 rounded-full scale-150 transition-colors duration-300"></div>
          </FadeIn>
        </Parallax>
        
        <Parallax offset={40}>
          <FadeIn delay={0.2} className="text-center">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold tracking-tight text-zinc-900 dark:text-white mb-2 shadow-zinc-200/50 dark:shadow-zinc-900/50 drop-shadow-lg transition-colors duration-300">
              vaiskiainen
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-zinc-500 font-display uppercase tracking-widest font-medium mb-4 sm:mb-6 transition-colors duration-300">
              Developer
            </h2>
          </FadeIn>
        </Parallax>
        
        <Parallax offset={60}>
          <FadeIn delay={0.3} className="max-w-xl text-center px-4 sm:px-0">
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans transition-colors duration-300">
              I build stuff
            </p>
          </FadeIn>
        </Parallax>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity: textOpacity }}
        className="absolute bottom-12 flex justify-center w-full"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-zinc-400 dark:text-zinc-600 transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}


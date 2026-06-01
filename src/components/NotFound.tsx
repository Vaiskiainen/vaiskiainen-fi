import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { FadeIn } from './FadeIn';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 w-full text-center">
      <FadeIn delay={0.1} className="flex flex-col items-center gap-6">
        <h1 className="text-8xl sm:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
          404
        </h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-medium text-zinc-800 dark:text-zinc-200">
            Page not found
          </h2>
          <p className="max-w-md text-zinc-500 dark:text-zinc-400">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4"
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-zinc-50 dark:text-zinc-900 font-medium transition-transform hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </FadeIn>
    </div>
  );
}

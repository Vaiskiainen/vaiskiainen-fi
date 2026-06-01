import { useEffect, useState } from 'react';
import { BookMarked, Users, Code, Activity } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Parallax } from './Parallax';
import { AnimatedHeading } from './AnimatedHeading';

interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

interface StatsData {
  repos: number;
  followers: number;
  topLanguage: string;
  languageStats: LanguageStat[];
}

// Map common languages to colors
const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
};

export default function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const userRes = await fetch('https://api.github.com/users/vaiskiainen');
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();

        const reposRes = await fetch('https://api.github.com/users/vaiskiainen/repos?per_page=100');
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposRes.json();

        const languages: Record<string, number> = {};
        let totalReposWithLang = 0;
        
        reposData.forEach((repo: any) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
            totalReposWithLang++;
          }
        });

        let topLanguage = 'Unknown';
        let maxCount = 0;
        for (const [lang, count] of Object.entries(languages)) {
          if (count > maxCount) {
            maxCount = count;
            topLanguage = lang;
          }
        }

        // Convert to percentage array and sort
        const languageStats: LanguageStat[] = Object.entries(languages)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / totalReposWithLang) * 100) || 1,
            color: languageColors[name] || '#8b949e'
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 5); // top 5

        setStats({
          repos: userData.public_repos,
          followers: userData.followers,
          topLanguage,
          languageStats
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statItems = [
    { label: 'Public Repositories', value: stats?.repos ?? '-', icon: BookMarked },
    { label: 'Followers', value: stats?.followers ?? '-', icon: Users },
    { label: 'Primary Language', value: stats?.topLanguage ?? '-', icon: Code },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <Parallax offset={15}>
        <FadeIn>
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <AnimatedHeading text="Statistics" className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100 transition-colors duration-300" delay={0.1} />
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-grow rounded-full transition-colors duration-300"></div>
          </div>
        </FadeIn>
      </Parallax>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-32 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-2xl animate-pulse border border-zinc-200/50 dark:border-zinc-800/50 transition-colors duration-300" />
          ))
        ) : (
          statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Parallax offset={10} key={item.label}>
                <FadeIn delay={0.1 * index}>
                  <div className="flex flex-col p-6 bg-zinc-50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-2xl transition-all duration-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200 dark:hover:shadow-zinc-900/20 group">
                    <div className="flex items-center gap-4 mb-4 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
                      <div className="p-2.5 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-xl group-hover:bg-zinc-300/50 dark:group-hover:bg-zinc-700/50 transition-colors">
                        <Icon className="w-5 h-5 flex-shrink-0" />
                      </div>
                      <span className="font-medium text-sm sm:text-base">{item.label}</span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-display font-bold text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
                      {item.value}
                    </div>
                  </div>
                </FadeIn>
              </Parallax>
            );
          })
        )}
      </div>

      {!loading && stats && stats.languageStats.length > 0 && (
        <Parallax offset={10}>
          <FadeIn delay={0.4}>
            <div className="p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-8">
                <Activity className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 transition-colors duration-300">Language Distribution</h3>
              </div>
              
              <div className="w-full h-3 sm:h-4 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full overflow-hidden flex mb-8 transition-colors duration-300">
                {stats.languageStats.map((lang, idx) => (
                  <div 
                    key={lang.name}
                    className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-1000 ease-out hover:opacity-80"
                    style={{ 
                      width: `${lang.percentage}%`, 
                      backgroundColor: lang.color,
                    }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {stats.languageStats.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: lang.color }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 transition-colors duration-300">{lang.name}</span>
                      <span className="text-xs text-zinc-500 font-mono transition-colors duration-300">{lang.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Parallax>
      )}
    </section>
  );
}

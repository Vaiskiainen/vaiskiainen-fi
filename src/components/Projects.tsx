import { ExternalLink, Github, Search } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Parallax } from './Parallax';
import { Link, useNavigate } from 'react-router-dom';
import projectsData from '../data/projects.json';
import { useState } from 'react';
import { AnimatedHeading } from './AnimatedHeading';

interface Project {
  id: number;
  name: string;
  description: string;
  github_url?: string;
  website_url?: string;
  tags?: string[];
}

interface ProjectsProps {
  showSearch?: boolean;
  limit?: number;
  showGithubLink?: boolean;
}

export default function Projects({ showSearch = false, limit, showGithubLink = false }: ProjectsProps) {
  const allProjects: Project[] = projectsData;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  let projects = allProjects.filter((project) => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (limit) {
    projects = projects.slice(0, limit);
  }

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <Parallax offset={15}>
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
            <div className="flex items-center gap-4 flex-grow">
              <AnimatedHeading text="Selected Projects" className="text-2xl sm:text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100 transition-colors duration-300 whitespace-nowrap" delay={0.1} />
              <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-grow rounded-full transition-colors duration-300 hidden sm:block"></div>
            </div>
            
            {showSearch && (
              <div className="relative group w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-500 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-200 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full leading-5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:border-zinc-900 dark:focus:border-white transition-all duration-300 sm:text-sm"
                />
              </div>
            )}
          </div>
        </FadeIn>
      </Parallax>
      
      {projects.length === 0 ? (
        <FadeIn>
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 dark:text-zinc-400 mb-2">No projects found matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline"
            >
              Clear search
            </button>
          </div>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
              <div
                onClick={() => navigate(`/projects/${project.id}`)}
                className="h-full animate-float flex flex-col group p-6 bg-zinc-50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-2xl transition-all duration-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl hover:shadow-zinc-200 dark:hover:shadow-zinc-900/20 cursor-pointer"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-xl text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex gap-3">
                    {project.github_url && (
                      <a 
                        href={project.github_url} 
                        target="_blank" 
                        rel="noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors z-10"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.website_url && (
                      <a 
                        href={project.website_url} 
                        target="_blank" 
                        rel="noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors z-10"
                        aria-label="Open Website"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8 line-clamp-3 leading-relaxed flex-grow transition-colors duration-300">
                  {project.description}
                </p>
                <div className="flex items-center flex-wrap gap-2 text-xs font-mono text-zinc-500 mt-auto pt-5 border-t border-zinc-200 dark:border-zinc-800/50 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors">
                  {project.tags?.map((tag, idx) => (
                    <span key={idx} className="bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-1 rounded-md transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}

      {showGithubLink && (
        <FadeIn delay={0.3}>
          <div className="mt-12 flex justify-center">
            <a
              href="https://github.com/vaiskiainen"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-zinc-50 dark:text-zinc-900 font-medium transition-all hover:scale-105"
            >
              <Github className="w-4 h-4" />
              See all projects on GitHub
            </a>
          </div>
        </FadeIn>
      )}
    </section>
  );
}

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Share2, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { FadeIn } from './FadeIn';
import projectsData from '../data/projects.json';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const currentIndex = projectsData.findIndex(p => p.id === Number(id));
  const project = currentIndex !== -1 ? projectsData[currentIndex] : undefined;

  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.name,
          text: project?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 w-full max-w-4xl mx-auto text-center gap-6">
        <Helmet>
          <title>Project Not Found</title>
        </Helmet>
        <h2 className="text-2xl font-bold">Project not found</h2>
        <button 
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
      <Helmet>
        <title>{project.name} | vaiskiainen</title>
        <meta name="description" content={project.description} />
      </Helmet>
      <FadeIn>
        <button 
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8 sm:mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-12">
          {project.image_url && (
            <div className="w-full aspect-[21/9] sm:aspect-[21/10] overflow-hidden rounded-3xl mb-12 shadow-xl border border-zinc-200 dark:border-zinc-800">
              <img 
                src={project.image_url} 
                alt={project.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-4 transition-colors">
                {project.name}
              </h1>
              <div className="flex items-center flex-wrap gap-2 text-sm font-mono text-zinc-500 transition-colors">
                {project.tags?.map((tag, idx) => (
                  <span key={idx} className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-md text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 transition-colors duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={handleShare}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-all hover:scale-105"
                aria-label="Share Project"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
              </button>
              {project.github_url && (
                <a 
                  href={project.github_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-all hover:scale-105"
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition-all hover:scale-105 shadow-md"
                  aria-label="Open Website"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-16">
            <p>
              {project.full_description || project.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            {prevProject ? (
              <button 
                onClick={() => navigate(`/projects/${prevProject.id}`)}
                className="flex flex-col items-start w-full sm:w-1/2 group text-left"
              >
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-300">
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Previous Project
                </div>
                <div className="font-medium text-lg text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {prevProject.name}
                </div>
              </button>
            ) : <div className="hidden sm:block sm:w-1/2" />}

            {nextProject ? (
              <button 
                onClick={() => navigate(`/projects/${nextProject.id}`)}
                className="flex flex-col items-end w-full sm:w-1/2 group text-right"
              >
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-300">
                  Next Project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="font-medium text-lg text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {nextProject.name}
                </div>
              </button>
            ) : <div className="hidden sm:block sm:w-1/2" />}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

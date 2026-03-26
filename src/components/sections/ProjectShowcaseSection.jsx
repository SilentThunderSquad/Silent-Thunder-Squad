import { useRef } from 'react'
import SplitType from 'split-type'
import { useGSAP } from '../../hooks/useGSAP'
import { useThunderSounds } from '../../hooks/useSounds'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  Users,
  Zap,
  ArrowRight
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ThunderCard } from '../ui/card'

gsap.registerPlugin(ScrollTrigger)

const ProjectShowcaseSection = () => {
  const sectionRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const projectsRef = useRef()

  const { playClick, playHover } = useThunderSounds()

  // Text animation with SplitType
  useGSAP(() => {
    // Split title text
    const titleSplit = new SplitType(titleRef.current, { types: 'chars,words' })
    const descSplit = new SplitType(descriptionRef.current, { types: 'words' })

    // Animate title characters
    gsap.fromTo(titleSplit.chars,
      {
        opacity: 0,
        y: 100,
        rotationX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          once: true
        }
      }
    )

    // Animate description words
    gsap.fromTo(descSplit.words,
      {
        opacity: 0,
        y: 30,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 75%",
          once: true
        }
      }
    )

    // Animate project cards with stagger
    gsap.fromTo(projectsRef.current.querySelectorAll('.project-card'),
      {
        opacity: 0,
        y: 80,
        scale: 0.8,
        rotationY: -10
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
          once: true
        }
      }
    )

  }, [])

  // Mock project data (replace with real projects)
  const projects = [
    {
      id: 1,
      title: "EcoTrack",
      description: "A comprehensive environmental monitoring platform that tracks carbon footprint, energy consumption, and sustainability metrics for businesses and individuals.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
      category: "Environmental",
      featured: true,
      status: "Completed",
      stats: { stars: 45, forks: 12, contributors: 4 },
      links: {
        github: "https://github.com/silent-thunder-squad/ecotrack",
        demo: "https://ecotrack-demo.vercel.app"
      },
      completedAt: "2024-02"
    },
    {
      id: 2,
      title: "StudySync",
      description: "AI-powered collaborative learning platform that helps students organize study sessions, share resources, and track academic progress with intelligent recommendations.",
      image: "/api/placeholder/600/400",
      technologies: ["Next.js", "Python", "TensorFlow", "PostgreSQL"],
      category: "Education",
      featured: true,
      status: "In Progress",
      stats: { stars: 32, forks: 8, contributors: 3 },
      links: {
        github: "https://github.com/silent-thunder-squad/studysync",
        demo: "https://studysync-beta.vercel.app"
      },
      completedAt: "2024-03"
    },
    {
      id: 3,
      title: "CryptoVault",
      description: "Secure cryptocurrency portfolio management tool with real-time tracking, advanced analytics, and automated trading alerts for crypto enthusiasts.",
      image: "/api/placeholder/600/400",
      technologies: ["Vue.js", "Express", "Redis", "WebSocket"],
      category: "Finance",
      featured: false,
      status: "Completed",
      stats: { stars: 28, forks: 15, contributors: 2 },
      links: {
        github: "https://github.com/silent-thunder-squad/cryptovault",
        demo: "https://cryptovault-app.vercel.app"
      },
      completedAt: "2024-01"
    },
    {
      id: 4,
      title: "DevFlow",
      description: "Project management and workflow automation tool specifically designed for development teams, featuring code review integration and automated deployment pipelines.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "FastAPI", "Docker", "GitHub API"],
      category: "DevTools",
      featured: false,
      status: "Planning",
      stats: { stars: 15, forks: 5, contributors: 5 },
      links: {
        github: "https://github.com/silent-thunder-squad/devflow",
        demo: null
      },
      completedAt: "2024-04"
    },
    {
      id: 5,
      title: "HealthHub",
      description: "Telemedicine platform connecting patients with healthcare providers, featuring appointment scheduling, symptom tracking, and secure video consultations.",
      image: "/api/placeholder/600/400",
      technologies: ["React Native", "Node.js", "WebRTC", "AWS"],
      category: "Healthcare",
      featured: true,
      status: "In Progress",
      stats: { stars: 67, forks: 23, contributors: 6 },
      links: {
        github: "https://github.com/silent-thunder-squad/healthhub",
        demo: "https://healthhub-demo.vercel.app"
      },
      completedAt: "2024-05"
    },
    {
      id: 6,
      title: "CodeMentor AI",
      description: "AI-powered coding assistant that provides personalized learning paths, code reviews, and real-time debugging help for programming students.",
      image: "/api/placeholder/600/400",
      technologies: ["Python", "OpenAI API", "Flask", "React"],
      category: "AI/Education",
      featured: false,
      status: "Completed",
      stats: { stars: 89, forks: 34, contributors: 3 },
      links: {
        github: "https://github.com/silent-thunder-squad/codementor-ai",
        demo: "https://codementor-ai.vercel.app"
      },
      completedAt: "2023-12"
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'tech'
      case 'In Progress': return 'thunder'
      case 'Planning': return 'glass'
      default: return 'glass'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return '✅'
      case 'In Progress': return '🚧'
      case 'Planning': return '📋'
      default: return '📋'
    }
  }

  const handleProjectClick = (project) => {
    playClick()
    if (project.links.demo) {
      window.open(project.links.demo, '_blank')
    } else if (project.links.github) {
      window.open(project.links.github, '_blank')
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 lg:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <Badge variant="thunder" className="text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Our Work
            </Badge>
          </div>

          <h2
            ref={titleRef}
            className="text-5xl lg:text-7xl font-black mb-8 text-white leading-tight"
          >
            Project <span className="text-gradient-primary">Showcase</span>
          </h2>

          <p
            ref={descriptionRef}
            className="text-xl lg:text-2xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed"
          >
            Explore our portfolio of innovative projects that showcase our expertise in
            modern technologies and our commitment to solving real-world problems through code.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={projectsRef}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ThunderCard
              key={project.id}
              className="project-card group cursor-pointer overflow-hidden transition-all duration-500 hover:scale-105"
              onMouseEnter={() => playHover()}
              onClick={() => handleProjectClick(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-30">
                    {project.category === 'Environmental' && '🌱'}
                    {project.category === 'Education' && '📚'}
                    {project.category === 'Finance' && '💰'}
                    {project.category === 'DevTools' && '🛠️'}
                    {project.category === 'Healthcare' && '🏥'}
                    {project.category === 'AI/Education' && '🤖'}
                  </div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="thunder" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant={getStatusColor(project.status)} className="text-xs">
                    {getStatusIcon(project.status)} {project.status}
                  </Badge>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* Quick actions on hover */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {project.links.demo && (
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        playClick()
                        window.open(project.links.demo, '_blank')
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </Button>
                  )}
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      playClick()
                      window.open(project.links.github, '_blank')
                    }}
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </Button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Title and Category */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-gradient-primary transition-all duration-300">
                    {project.title}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="tech" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="glass" className="text-xs">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {project.stats.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {project.stats.forks}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {project.stats.contributors}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.completedAt}
                  </span>
                </div>
              </div>

              {/* Bottom border effect */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500" />
            </ThunderCard>
          ))}
        </div>

        {/* View More Section */}
        <div className="text-center mt-16">
          <div className="glass-card max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to See More?
            </h3>
            <p className="text-gray-400 mb-6">
              Visit our GitHub organization to explore all our open-source projects and contributions.
            </p>
            <Button
              variant="thunder"
              size="lg"
              onClick={() => {
                playClick()
                window.open('https://github.com/silent-thunder-squad', '_blank')
              }}
              onMouseEnter={() => playHover()}
            >
              <Github className="mr-2 w-5 h-5" />
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/4 right-10 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 left-12 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  )
}

export default ProjectShowcaseSection
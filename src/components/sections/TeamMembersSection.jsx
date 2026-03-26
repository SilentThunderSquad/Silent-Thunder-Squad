import { useRef } from 'react'
import SplitType from 'split-type'
import { useGSAP } from '../../hooks/useGSAP'
import { useThunderSounds } from '../../hooks/useSounds'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Github,
  Linkedin,
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  Award,
  Code,
  Coffee
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ThunderCard } from '../ui/card'

gsap.registerPlugin(ScrollTrigger)

const TeamMembersSection = () => {
  const sectionRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const membersRef = useRef()

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

    // Animate team member cards with stagger
    gsap.fromTo(membersRef.current.querySelectorAll('.member-card'),
      {
        opacity: 0,
        y: 80,
        scale: 0.8,
        rotationY: -15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: membersRef.current,
          start: "top 80%",
          once: true
        }
      }
    )

  }, [])

  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Full-Stack Developer",
      specialization: "React & Node.js",
      avatar: "👨‍💻",
      location: "San Francisco, CA",
      joinedDate: "2023-01",
      experience: "3 years",
      skills: ["React", "Node.js", "TypeScript", "AWS", "GraphQL"],
      bio: "Passionate about building scalable web applications and creating intuitive user experiences. Loves working with modern JavaScript frameworks.",
      achievements: ["🏆 Hackathon Winner", "🚀 10+ Projects", "⭐ 500+ GitHub Stars"],
      links: {
        github: "https://github.com/alexchen",
        linkedin: "https://linkedin.com/in/alexchen",
        portfolio: "https://alexchen.dev",
        email: "alex@silentthundersquad.com"
      },
      gradient: "from-blue-500 to-cyan-500",
      isLead: true
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      role: "AI/ML Engineer",
      specialization: "Machine Learning & Data Science",
      avatar: "👩‍🔬",
      location: "Boston, MA",
      joinedDate: "2023-02",
      experience: "4 years",
      skills: ["Python", "TensorFlow", "PyTorch", "Data Analysis", "Computer Vision"],
      bio: "AI enthusiast with a strong background in machine learning and data science. Focused on developing intelligent solutions for real-world problems.",
      achievements: ["🎓 PhD Researcher", "📊 15+ ML Models", "🏅 Research Publications"],
      links: {
        github: "https://github.com/mayarodriguez",
        linkedin: "https://linkedin.com/in/mayarodriguez",
        portfolio: "https://mayarodriguez.ai",
        email: "maya@silentthundersquad.com"
      },
      gradient: "from-purple-500 to-pink-500",
      isLead: false
    },
    {
      id: 3,
      name: "Jordan Kim",
      role: "DevOps Engineer",
      specialization: "Cloud Infrastructure & Automation",
      avatar: "👨‍🚀",
      location: "Seattle, WA",
      joinedDate: "2023-03",
      experience: "5 years",
      skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
      bio: "Cloud architecture specialist with expertise in designing and maintaining scalable infrastructure. Passionate about automation and best practices.",
      achievements: ["☁️ AWS Certified", "🔧 50+ Deployments", "🛡️ Zero Downtime Record"],
      links: {
        github: "https://github.com/jordankim",
        linkedin: "https://linkedin.com/in/jordankim",
        portfolio: "https://jordankim.cloud",
        email: "jordan@silentthundersquad.com"
      },
      gradient: "from-green-500 to-emerald-500",
      isLead: false
    },
    {
      id: 4,
      name: "Samira Patel",
      role: "Mobile Developer",
      specialization: "React Native & Flutter",
      avatar: "👩‍💻",
      location: "Austin, TX",
      joinedDate: "2023-04",
      experience: "3 years",
      skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
      bio: "Mobile development expert creating cross-platform applications that deliver exceptional user experiences across all devices.",
      achievements: ["📱 20+ Apps", "⭐ 4.8 App Store Rating", "🚀 1M+ Downloads"],
      links: {
        github: "https://github.com/samirapatel",
        linkedin: "https://linkedin.com/in/samirapatel",
        portfolio: "https://samirapatel.apps",
        email: "samira@silentthundersquad.com"
      },
      gradient: "from-orange-500 to-red-500",
      isLead: false
    },
    {
      id: 5,
      name: "David Thompson",
      role: "Backend Developer",
      specialization: "Microservices & Database Design",
      avatar: "👨‍🔧",
      location: "Denver, CO",
      joinedDate: "2023-05",
      experience: "6 years",
      skills: ["Java", "Spring", "PostgreSQL", "Microservices", "Kafka"],
      bio: "Backend architecture specialist focused on building robust, scalable systems. Expert in database design and microservices architecture.",
      achievements: ["🏗️ System Architect", "⚡ 99.9% Uptime", "📈 Scaled to 1M+ Users"],
      links: {
        github: "https://github.com/davidthompson",
        linkedin: "https://linkedin.com/in/davidthompson",
        portfolio: "https://davidthompson.dev",
        email: "david@silentthundersquad.com"
      },
      gradient: "from-indigo-500 to-purple-500",
      isLead: false
    },
    {
      id: 6,
      name: "Elena Vasquez",
      role: "UI/UX Designer",
      specialization: "Product Design & User Research",
      avatar: "👩‍🎨",
      location: "Los Angeles, CA",
      joinedDate: "2023-06",
      experience: "4 years",
      skills: ["Figma", "Adobe CC", "Prototyping", "User Research", "Design Systems"],
      bio: "Creative designer with a passion for user-centered design. Specializes in creating beautiful, functional interfaces that users love.",
      achievements: ["🎨 Design Awards", "👥 User-Centered Design", "💡 50+ Prototypes"],
      links: {
        github: "https://github.com/elenavasquez",
        linkedin: "https://linkedin.com/in/elenavasquez",
        portfolio: "https://elenavasquez.design",
        email: "elena@silentthundersquad.com"
      },
      gradient: "from-pink-500 to-rose-500",
      isLead: false
    }
  ]

  const handleMemberClick = (member) => {
    playClick()
    if (member.links.portfolio) {
      window.open(member.links.portfolio, '_blank')
    }
  }

  const handleSocialClick = (e, url) => {
    e.stopPropagation()
    playClick()
    window.open(url, '_blank')
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 lg:py-32 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="mb-6">
            <Badge variant="thunder" className="text-sm px-4 py-2">
              <Code className="w-4 h-4 mr-2" />
              Meet the Squad
            </Badge>
          </div>

          <h2
            ref={titleRef}
            className="text-5xl lg:text-7xl font-black mb-8 leading-tight"
          >
            Our <span className="text-gradient-primary">Team</span>
          </h2>

          <p
            ref={descriptionRef}
            className="text-xl lg:text-2xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed"
          >
            Meet the brilliant minds behind Silent Thunder Squad. Our diverse team of passionate
            developers, designers, and innovators brings together unique skills and perspectives
            to create extraordinary solutions.
          </p>
        </div>

        {/* Team Members Grid */}
        <div
          ref={membersRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member) => (
            <ThunderCard
              key={member.id}
              className="member-card group cursor-pointer overflow-hidden transition-all duration-500 hover:scale-105 hover:rotate-1"
              onMouseEnter={() => playHover()}
              onClick={() => handleMemberClick(member)}
            >
              {/* Member Header */}
              <div className={`relative p-6 bg-gradient-to-br ${member.gradient} overflow-hidden`}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                        radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  />
                </div>

                {/* Lead badge */}
                {member.isLead && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="glass" className="text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      Lead
                    </Badge>
                  </div>
                )}

                {/* Avatar and Basic Info */}
                <div className="relative text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-white/80 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-white/60 text-sm">
                    {member.specialization}
                  </p>
                </div>
              </div>

              {/* Member Details */}
              <div className="p-6">
                {/* Bio */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                  {member.bio}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{member.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    <span>Joined {member.joinedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coffee className="w-3 h-3 flex-shrink-0" />
                    <span>{member.experience} exp</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Code className="w-3 h-3 flex-shrink-0" />
                    <span>{member.skills.length} skills</span>
                  </div>
                </div>

                {/* Top Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="tech" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 3 && (
                      <Badge variant="glass" className="text-xs">
                        +{member.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 text-xs">
                    {member.achievements.map((achievement, index) => (
                      <span key={index} className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-2">
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={(e) => handleSocialClick(e, member.links.github)}
                    className="flex-1"
                  >
                    <Github className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={(e) => handleSocialClick(e, member.links.linkedin)}
                    className="flex-1"
                  >
                    <Linkedin className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={(e) => handleSocialClick(e, member.links.portfolio)}
                    className="flex-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={(e) => handleSocialClick(e, `mailto:${member.links.email}`)}
                    className="flex-1"
                  >
                    <Mail className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Hover effect line */}
              <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${member.gradient} group-hover:w-full transition-all duration-500`} />
            </ThunderCard>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "6+", label: "Team Members", icon: "👥" },
            { number: "25+", label: "Years Combined Experience", icon: "⏱️" },
            { number: "15+", label: "Technologies Mastered", icon: "🚀" },
            { number: "100%", label: "Collaborative Spirit", icon: "🤝" }
          ].map((stat, index) => (
            <div key={index} className="group">
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl lg:text-4xl font-black text-gradient-primary mb-1">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Join the Team CTA */}
        <div className="text-center mt-20">
          <div className="glass-card max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to Join Our Squad?
            </h3>
            <p className="text-gray-400 mb-6">
              We're always looking for passionate developers and designers who share our vision
              of building innovative solutions for real-world problems.
            </p>
            <Button
              variant="thunder"
              size="lg"
              onClick={() => {
                playClick()
                document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
              }}
              onMouseEnter={() => playHover()}
            >
              Get In Touch
              <Mail className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/3 right-16 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-20 w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  )
}

export default TeamMembersSection
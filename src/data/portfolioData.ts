export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  status: 'In Production' | 'Active Development' | 'Completed' | 'Research Prototype';
  isReal: boolean;
  demoBadge?: string;
  technologies: string[];
  shortDescription: string;
  detailedOverview: string;
  architecturalHighlights: string[];
  keyChallenges: string;
  liveUrl?: string;
  sourceUrl?: string;
  visualTheme: {
    accentColor: string;
    geometryType: 'grid' | 'waveform' | 'matrix' | 'monolith';
    specularIntensity: number;
  };
}

export interface SkillCategory {
  id: string;
  discipline: string;
  code: string;
  description: string;
  skills: {
    name: string;
    focus: string;
    tags: string[];
  }[];
}

export interface PhilosophyItem {
  number: string;
  title: string;
  summary: string;
  status?: string;
}

export interface CareerGoalItem {
  id: string;
  title: string;
  percentage: number;
  focus: string;
  currentFoundation: string;
  categoryCode: string;
  statusBadge: string;
  iconName: 'Layout' | 'Code2' | 'BarChart3' | 'Cpu' | 'Smartphone';
}

export interface CareerGoalsSectionConfig {
  eyebrow: string;
  heading: string;
  subtitle: string;
  progressDisclaimer: string;
  goals: CareerGoalItem[];
  vision: {
    eyebrow: string;
    heading: string;
    text: string;
    badge: string;
    pathway: { step: string; label: string }[];
  };
}

export interface PortfolioConfig {
  personal: {
    name: string;
    monogram: string;
    title: string;
    academicField: string;
    institution: string;
    location: string;
    availabilityStatus: string;
    availabilitySub: string;
    email: string;
    phone: string;
    photoUrl?: string;
    socials: {
      github?: string;
      linkedin?: string;
    };
  };
  intro: {
    eyebrow?: string;
    headline: string;
    descriptor: string;
    secondaryLine: string;
    sequenceDurationMs: number;
  };
  hero: {
    badge: string;
    headlineLine1: string;
    headlineLine2: string;
    subline: string;
    primaryActionText: string;
    secondaryActionText: string;
  };
  about: {
    eyebrow: string;
    manifestoHeadline: string;
    paragraphs: string[];
    pillars: PhilosophyItem[];
    currentFocus: {
      title: string;
      description: string;
      tags: string[];
    };
  };
  skillsSection: {
    eyebrow: string;
    headline: string;
    description: string;
    categories: SkillCategory[];
  };
  careerGoals: CareerGoalsSectionConfig;
  projects: ProjectItem[];
  contact: {
    eyebrow: string;
    headline: string;
    subline: string;
    directEmailLabel: string;
    responseTime: string;
    footerDisclaimer: string;
  };
}

export const PORTFOLIO_DATA: PortfolioConfig = {
  personal: {
    name: "Thiruppathi Raja",
    monogram: "TR",
    title: "Student Developer",
    academicField: "B.Tech in Artificial Intelligence & Data Science",
    institution: "Rathinam Technical Campus",
    location: "Coimbatore, Tamil Nadu, India",
    availabilityStatus: "Student Developer · Open to Learning & Projects",
    availabilitySub: "Building fundamentals · Working toward web development",
    email: "thiruppathikannan23@gmail.com",
    phone: "+91 9562374789",
    photoUrl: "/images/profile-cutout.png",
    socials: {
      github: "https://github.com/thiruppathikannan23",
      linkedin: "https://www.linkedin.com/in/thiruppathi-raja-11a457424"
    }
  },
  intro: {
    headline: "THIRUPPATHI RAJA",
    eyebrow: "STUDENT DEVELOPER · PERSONAL JOURNEY",
    descriptor: "STUDENT · ASPIRING DEVELOPER · CREATIVE THINKER · FUTURE ENTREPRENEUR",
    secondaryLine: "B.TECH STUDENT · RATHINAM TECHNICAL CAMPUS",
    sequenceDurationMs: 5000
  },
  hero: {
    badge: "STUDENT DEVELOPER PORTFOLIO",
    headlineLine1: "LEARNING, BUILDING,",
    headlineLine2: "SHAPING WHAT'S NEXT.",
    subline: "I am a student developer, creative thinker, and future entrepreneur learning programming, exploring web development fundamentals, and building projects with curiosity and purpose.",
    primaryActionText: "Explore My Projects",
    secondaryActionText: "Get in Touch"
  },
  about: {
    eyebrow: "01 · ABOUT & LEARNING JOURNEY",
    manifestoHeadline: "Curious about technology, dedicated to learning fundamentals, and building for the future.",
    paragraphs: [
      "I am a student developer with a genuine interest in programming and technology. I have started learning the fundamentals of programming and web development, taking deliberate steps to understand how software works from the core up.",
      "I enjoy exploring new development tools and discovering creative ways to bring digital projects to life. Currently, I am exploring AI-assisted development using Google Antigravity to build websites while continuously improving my technical and creative abilities."
    ],
    pillars: [
      {
        number: "01",
        title: "Stage 1 — Early Project Experience",
        summary: "Completed a Smart Irrigation System project during my 12th grade and secured 1st place."
      },
      {
        number: "02",
        title: "Stage 2 — Programming Learning",
        summary: "Learned C programming and the basics of Java."
      },
      {
        number: "03",
        title: "Stage 3 — Web Development Fundamentals",
        summary: "Learned the basics of HTML and CSS."
      },
      {
        number: "04",
        title: "Stage 4 — Exploring AI-Assisted Development (Current)",
        summary: "Currently exploring Google Antigravity and learning how AI-assisted tools can help with website development."
      }
    ],
    currentFocus: {
      title: "Current Learning Exploration",
      description: "Actively exploring Google Antigravity for AI-assisted website development while practicing fundamentals in C, Java, HTML, and CSS.",
      tags: ["C Programming", "Java Basics", "HTML Basics", "CSS Basics", "Google Antigravity"]
    }
  },
  skillsSection: {
    eyebrow: "02 · LEARNING PROGRESSION",
    headline: "Technologies & Tools I Am Learning.",
    description: "An honest record of my current programming learning journey, tools I have explored, and technologies I am currently learning without exaggerated claims.",
    categories: [
      {
        id: "programming",
        discipline: "Programming Languages",
        code: "DEV-01",
        description: "Core programming fundamentals, syntax structure, and logical problem-solving.",
        skills: [
          {
            name: "C Programming",
            focus: "Learned — Core programming foundations, syntax, loops, functions, and structured problem-solving.",
            tags: ["Learned", "Fundamentals", "Problem Solving"]
          },
          {
            name: "Java",
            focus: "Learning the basics — Object-oriented programming concepts, basic syntax, and classes.",
            tags: ["Learning the basics", "OOP Fundamentals"]
          }
        ]
      },
      {
        id: "web-fundamentals",
        discipline: "Web Development Fundamentals",
        code: "WEB-02",
        description: "Foundational building blocks of web page structure and visual styling.",
        skills: [
          {
            name: "HTML",
            focus: "Learning the basics — Page structure, semantic tags, headers, paragraphs, and web layouts.",
            tags: ["Learning the basics", "Page Structure"]
          },
          {
            name: "CSS",
            focus: "Learning the basics — Styling fundamentals, color schemes, typography, and basic layouts.",
            tags: ["Learning the basics", "Styling & Design"]
          }
        ]
      },
      {
        id: "exploration",
        discipline: "Modern Tool Exploration",
        code: "EXP-03",
        description: "Hands-on exploration of modern development platforms and AI-assisted workflows.",
        skills: [
          {
            name: "Google Antigravity",
            focus: "Currently exploring — Learning AI-assisted website development workflows, code structuring, and interactive tooling.",
            tags: ["Currently exploring", "AI-Assisted Web Dev"]
          }
        ]
      }
    ]
  },
  projects: [
    {
      id: "agrinilo-platform",
      title: "Agrinilo",
      tagline: "An agriculture-focused platform project developed as part of my technology and innovation journey.",
      category: "Agricultural Platform Project",
      year: "Project Concept",
      status: "Active Development",
      isReal: true,
      technologies: ["HTML Basics", "CSS Basics", "Web Interface Design", "Concept Architecture"],
      shortDescription: "An agriculture-focused platform project developed as part of my technology and innovation journey to explore how digital interfaces can assist regional farming workflows.",
      detailedOverview: "Agrinilo is an agriculture-focused project conceptualized to explore solutions for local farmers. It was created as part of my technology and innovation learning journey to understand how user interfaces, structured categories, and regional languages can make digital information more accessible to agricultural communities. This project is currently in the prototype and development phase, with certain interface components implemented and additional agricultural services planned for future iterations.",
      architecturalHighlights: [
        "IMPLEMENTED: Bilingual interface concept with English and Tamil language navigation.",
        "IMPLEMENTED: Structured multi-category dashboard layout for agricultural topics.",
        "IMPLEMENTED: Responsive layout design created for readability on mobile screens.",
        "PROPOSED / PLANNED [FLAGGED FOR REVIEW]: Local crop health advisory modules and disease detection guide.",
        "PROPOSED / PLANNED [FLAGGED FOR REVIEW]: Direct farmer-to-buyer produce marketplace directory.",
        "PROPOSED / PLANNED [FLAGGED FOR REVIEW]: Regional cold-storage facility availability tracking."
      ],
      keyChallenges: "Designing an interface that remains simple, clear, and easy to navigate for non-technical users while learning web development fundamentals.",
      liveUrl: undefined,
      sourceUrl: "https://github.com/thiruppathikannan23/agrinilo",
      visualTheme: {
        accentColor: "#D1D5DB",
        geometryType: "grid",
        specularIntensity: 0.85
      }
    },
    {
      id: "smart-irrigation-system",
      title: "Smart Irrigation System",
      tagline: "Automated and mobile-controlled irrigation project completed in 12th grade (1st Place Achievement).",
      category: "Early Project Experience · 1st Place",
      year: "12th Grade",
      status: "Completed",
      isReal: true,
      technologies: ["Hardware Microcontroller", "Soil Moisture Sensing", "Relay Control", "Bluetooth Remote Control"],
      shortDescription: "A smart irrigation project completed during my 12th grade that secured 1st place, featuring dual-mode automated moisture-triggered watering and mobile remote control.",
      detailedOverview: "Developed during 12th grade schooling, this Smart Irrigation System was an early milestone in my practical technology journey that secured 1st place. The project was designed to automate plant watering through two distinct operational modes: an automatic closed-loop mode that triggers a water pump when soil moisture drops below a calibrated threshold, and a manual remote mode allowing an operator to command the pump on or off via mobile control.",
      architecturalHighlights: [
        "Automatic Mode: Continual soil moisture sampling that activates the water pump when moisture is low and turns it off once hydrated.",
        "Manual Remote Mode: Command recognition allowing direct pump start and stop control from a mobile device.",
        "Hardware Integration: Built around a dedicated microcontroller coordinating moisture sensors and power relays.",
        "Achievement: Secured 1st place recognition during 12th grade early project work."
      ],
      keyChallenges: "Calibrating sensor threshold levels for reliable moisture readings and ensuring consistent relay response between automatic and remote commands.",
      liveUrl: undefined,
      sourceUrl: undefined,
      visualTheme: {
        accentColor: "#38BDF8",
        geometryType: "waveform",
        specularIntensity: 0.85
      }
    }
  ],
  careerGoals: {
    eyebrow: "03 · CAREER GOALS & PROGRESS",
    heading: "Where I'm Heading",
    subtitle: "I'm building my skills step by step, exploring different fields of technology and working towards my future career.",
    progressDisclaimer: "Self-assessed initial learning progression based on current fundamentals and exploratory practice · Not a professional proficiency score or completed career rating.",
    goals: [
      {
        id: "website-designer",
        title: "Website Designer",
        percentage: 20,
        focus: "Website layouts, visual design, UI/UX, HTML and CSS.",
        currentFoundation: "HTML and CSS basics.",
        categoryCode: "GOAL 01",
        statusBadge: "Active Foundation",
        iconName: "Layout"
      },
      {
        id: "web-developer",
        title: "Web Developer",
        percentage: 15,
        focus: "Frontend development, backend development, and building functional websites.",
        currentFoundation: "C, Java basics, HTML and CSS basics, and exploring Google Antigravity.",
        categoryCode: "GOAL 02",
        statusBadge: "Active Exploration",
        iconName: "Code2"
      },
      {
        id: "data-analyst",
        title: "Data Analyst",
        percentage: 5,
        focus: "Data analysis, data visualization, statistics, and working with datasets.",
        currentFoundation: "Early exploration; no advanced data-analysis skills claimed.",
        categoryCode: "GOAL 03",
        statusBadge: "Early Exploration",
        iconName: "BarChart3"
      },
      {
        id: "data-scientist",
        title: "Data Scientist",
        percentage: 2,
        focus: "Statistics, mathematics, Python, machine learning, and predictive analysis.",
        currentFoundation: "Beginner stage; still a future learning goal.",
        categoryCode: "GOAL 04",
        statusBadge: "Future Learning Goal",
        iconName: "Cpu"
      },
      {
        id: "app-developer",
        title: "App Developer",
        percentage: 3,
        focus: "Mobile application development, app interfaces, programming, and application functionality.",
        currentFoundation: "Beginner stage; still a future learning goal.",
        categoryCode: "GOAL 05",
        statusBadge: "Future Learning Goal",
        iconName: "Smartphone"
      }
    ],
    vision: {
      eyebrow: "CAREER ASPIRATION",
      heading: "My Long-Term Vision",
      text: "My goal is to grow into a skilled technology professional, begin my journey as a freelance web developer, gain real-world experience, and eventually establish my own website development company.",
      badge: "Personal Career Ambition · Future Aspiration",
      pathway: [
        { step: "01", label: "Master Core Fundamentals" },
        { step: "02", label: "Freelance Web Developer" },
        { step: "03", label: "Real-World Experience" },
        { step: "04", label: "Website Development Company" }
      ]
    }
  },
  contact: {
    eyebrow: "04 · INITIATE DIALOGUE",
    headline: "LET'S CONNECT & BUILD.",
    subline: "I am a student developer always enthusiastic to learn, connect with other builders, and explore student internship and learning opportunities. Feel free to reach out directly!",
    directEmailLabel: "Direct Electronic Mail",
    responseTime: "Responds promptly",
    footerDisclaimer: "Personal journey website of Thiruppathi Raja. Built with genuine project work and honest learning milestones."
  }
};

import { AnalysisResult } from "@/types/analyzer";

export const SAMPLE_RESUMES = [
  {
    title: "Alex Morgan - Senior Full-Stack Engineer",
    role: "Senior Full-Stack Engineer",
    text: `Alex Morgan
San Francisco, CA | alex.morgan.dev@email.com | (555) 349-2810 | github.com/alexmorgan | linkedin.com/in/alexmorgan

PROFESSIONAL SUMMARY
Senior Full-Stack Software Engineer with 6+ years of experience engineering high-performance web applications, distributed backend microservices, and modern UI architectures. Proven track record of scaling Next.js and React frontends to 1.5M+ monthly active users, architecting fault-tolerant Node.js & Go REST/GraphQL APIs, and reducing cloud infrastructure costs by 32% using Docker and AWS.

CORE SKILLS
- Frontend: TypeScript, React 18, Next.js (App Router), Vue.js, Tailwind CSS, Redux Toolkit, React Query, WebSockets
- Backend & DBs: Node.js, Express, Go (Golang), Python, PostgreSQL, Redis, MongoDB, GraphQL, REST APIs
- DevOps & Cloud: AWS (ECS, S3, CloudFront, Lambda), Docker, Kubernetes, CI/CD (GitHub Actions), Terraform, Datadog
- Architecture & Practices: Microservices, Event-Driven Systems, System Design, Unit/Integration Testing (Jest, Playwright), Agile

PROFESSIONAL EXPERIENCE

Senior Full-Stack Engineer | Nexus Cloud Systems, San Francisco, CA
March 2022 - Present
- Architected the redesign of customer analytics dashboard using Next.js 14, TypeScript, and Tailwind CSS, improving Core Web Vitals (LCP from 3.8s to 1.1s) and lifting conversion by 24%.
- Engineered asynchronous data ingestion pipeline handling 45M daily events using Node.js, Kafka, and Redis caching, cutting P99 latency by 58%.
- Led cloud migration from monolithic EC2 instances to AWS ECS Fargate container clusters, achieving 99.98% service uptime and saving $68,000 annually.
- Mentored 5 mid-level engineers, introduced TypeScript strict mode across 4 repositories, and established automated end-to-end testing with Playwright.

Software Engineer | Veloce Digital, Austin, TX
July 2019 - February 2022
- Developed scalable React and Redux web apps for enterprise fintech clients, implementing secure OAuth2 authentication and bank data sync.
- Designed PostgreSQL schema with indexing and partitioned tables, optimizing query response times by 40% across 10M+ transaction rows.
- Built reusable component design system adopted by 14 product teams, reducing frontend feature delivery cycles from 3 weeks to 8 days.
- Implemented robust CI/CD pipelines via GitHub Actions, decreasing production deployment rollout time from 45 minutes to 7 minutes.

EDUCATION
Bachelor of Science in Computer Science | University of Texas at Austin (2015 - 2019)
- Dean's Honor Roll, President of ACM Student Chapter

CERTIFICATIONS
- AWS Certified Solutions Architect - Associate (2023)
- Certified Kubernetes Application Developer (CKAD) (2024)`
  },
  {
    title: "Jordan Lee - AI / ML Engineer",
    role: "AI / ML Engineer",
    text: `Jordan Lee
Seattle, WA | jordan.lee.ai@email.com | (555) 782-9901 | github.com/jordanlee-ai

PROFESSIONAL SUMMARY
AI/ML Engineer with 4+ years of hands-on experience building, fine-tuning, and deploying generative AI agents and deep learning models into production. Specialized in LLM orchestration (LangChain, LlamaIndex), RAG architectures, model quantization, and scalable inference with FastAPI and PyTorch.

TECHNICAL SKILLS
- Machine Learning & AI: PyTorch, TensorFlow, Hugging Face Transformers, LangChain, LlamaIndex, vLLM, TensorRT-LLM, scikit-learn
- Languages & Frameworks: Python (FastAPI, Flask, Celery), TypeScript, SQL, C++
- Data & Vector Stores: Pinecone, Qdrant, ChromaDB, PostgreSQL (pgvector), Apache Spark
- MLOps & Cloud: AWS (SageMaker, S3), Docker, Kubernetes, Weights & Biases, MLflow, Ray Serve

EXPERIENCE
Machine Learning Engineer | Synthetix AI, Seattle, WA
January 2023 - Present
- Architected enterprise multi-agent RAG pipeline using LangChain, pgvector, and Claude 3.5 Sonnet, supporting 100K+ daily knowledge queries with 94% retrieval accuracy.
- Optimized local LLM inference latency by 3.2x using vLLM and 4-bit AWQ quantization, saving $12,000 monthly in GPU compute costs.
- Designed evaluation framework with Ragas and Weights & Biases, reducing hallucinations in clinical summarization workflows by 41%.

Data Scientist / ML Engineer | Apex Analytics, Boston, MA
June 2020 - December 2022
- Built end-to-end customer churn prediction pipelines using XGBoost and PyTorch, improving retention intervention efficacy by 19%.
- Automated feature store management with Feast and Apache Spark, shortening model retraining cycle from bi-weekly to daily automated jobs.`
  }
];

export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: "Staff / Senior Full-Stack Engineer (Next.js, Node, Cloud)",
    company: "Stripe / Vercel style Tech Scaleup",
    text: `About the Role:
We are looking for a Senior Full-Stack Software Engineer to build world-class user experiences and mission-critical cloud infrastructure. You will own features from ideation to production, designing high-throughput APIs, architecting resilient frontend applications, and driving technical excellence.

Key Responsibilities:
- Build high-performance web applications using Next.js (App Router), TypeScript, and modern styling libraries.
- Architect, maintain, and scale distributed backend services with Node.js, Go, or Python.
- Optimize web performance, accessibility, and Core Web Vitals across diverse browser environments.
- Design resilient database schemas and caching strategies with PostgreSQL, Redis, and event streaming (Kafka/RabbitMQ).
- Drive cloud infrastructure automation using AWS (ECS, Lambda, Terraform) and Docker.
- Collaborate closely with Product, Design, and Security teams to deliver delighting customer experiences.
- Champion code quality through automated testing (Jest, Cypress, or Playwright) and rigorous code reviews.

Required Qualifications:
- 5+ years of software engineering experience building production web applications.
- Strong proficiency in modern TypeScript, React, Next.js, and Node.js.
- Solid understanding of distributed systems, RESTful and GraphQL APIs, and asynchronous message queues.
- Demonstrated experience optimizing database performance (PostgreSQL or MySQL) at scale.
- Hands-on experience with cloud platforms (AWS or GCP), Docker containerization, and CI/CD automation.
- Proven leadership in mentoring colleagues, establishing architecture guidelines, and cross-functional communication.

Bonus Points:
- Experience with Kubernetes, micro-frontends, or serverless architectures.
- Experience with real-time systems (WebSockets, WebRTC, Server-Sent Events).
- Contributions to open-source software.`
  },
  {
    title: "AI Solutions Engineer (LLMs, Python, RAG)",
    company: "NextGen AI Labs",
    text: `Job Description:
Join our fast-growing AI engineering team building production-ready generative AI applications. We are seeking an AI Engineer who bridges the gap between state-of-the-art foundation models and scalable software engineering.

Responsibilities:
- Build and deploy production RAG pipelines, semantic search, and autonomous agents.
- Benchmark and optimize LLM inference latency using tools like vLLM, TensorRT, or Groq LPU inference.
- Integrate vector databases (Pinecone, pgvector, Qdrant) with backend APIs built in FastAPI and Python.
- Implement continuous evaluation, guardrails, and telemetry for generative AI systems.
- Work with product teams to build clean full-stack interfaces in Next.js and TypeScript.

Requirements:
- 3+ years experience with Python, PyTorch, Hugging Face, and modern LLM frameworks (LangChain or LlamaIndex).
- Deep understanding of embeddings, vector similarity search, prompt engineering, and fine-tuning.
- Experience deploying Docker containers to AWS or GCP.`
  }
];

export const MOCK_ANALYSIS_RESULT: AnalysisResult = {
  candidateName: "Alex Morgan",
  targetRole: "Senior Full-Stack Software Engineer",
  atsCompatibilityScore: 88,
  overallScore: 89,
  skillMatchPercentage: 86,
  experienceRelevanceScore: 92,
  resumeSummary:
    "Alex Morgan presents an exceptionally strong profile for the Senior Full-Stack Engineer position. With 6+ years of full-stack engineering experience, verified leadership in scaling Next.js and Node.js systems to millions of users, and strong cloud infrastructure accomplishments, the candidate closely mirrors the core requirements of this role.",
  skillsIdentified: {
    technical: [
      "TypeScript",
      "React 18",
      "Next.js",
      "Node.js",
      "Go (Golang)",
      "Python",
      "PostgreSQL",
      "Redis",
      "GraphQL",
      "REST APIs",
      "Kafka",
      "WebSockets"
    ],
    soft: [
      "Engineering Leadership & Mentorship",
      "System Design & Architecture",
      "Cross-functional Collaboration",
      "Agile Development",
      "Root Cause Analysis"
    ],
    toolsAndFrameworks: [
      "AWS (ECS, S3, CloudFront, Lambda)",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Playwright",
      "Jest",
      "Datadog"
    ]
  },
  matchedKeywords: [
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Docker",
    "CI/CD",
    "Core Web Vitals",
    "Microservices",
    "Playwright",
    "Mentoring"
  ],
  missingKeywords: [
    {
      keyword: "GraphQL Schema Stitching / Federation",
      importance: "medium",
      context:
        "The job emphasizes distributed API layers; mentioning federated GraphQL or Apollo Gateway would solidify architectural scope."
    },
    {
      keyword: "Cypress / Integration Testing Matrix",
      importance: "low",
      context:
        "Playwright is strongly highlighted, but adding mention of cross-browser test suites or contract testing enhances test coverage depth."
    },
    {
      keyword: "Micro-frontends / Module Federation",
      importance: "low",
      context:
        "Mentioned in the job description bonus criteria as an advantage for enterprise scale frontend modularity."
    }
  ],
  strengths: [
    "Quantified business and engineering metrics throughout all work experiences (e.g., LCP reduction to 1.1s, conversion lift of 24%, $68k cloud savings).",
    "Strong direct stack alignment with Next.js App Router, TypeScript, Node.js, and AWS.",
    "Demonstrated engineering leadership through mentoring 5 junior/mid engineers and driving company-wide testing standards.",
    "Modern devops proficiency backed by formal CKAD and AWS certifications."
  ],
  weaknesses: [
    "Summary section is slightly dense; could lead with immediate impact metrics and specific architectural specialties.",
    "Limited detail on collaboration with Product and UX/UI design partners.",
    "Could clarify experience with message queue failover mechanisms alongside the Kafka pipeline."
  ],
  actionableSuggestions: [
    {
      category: "Metrics & Impact",
      impact: "high",
      suggestion:
        "Highlight the business context of your 45M event pipeline (e.g. revenue impact or fraud prevention) to demonstrate end-to-end commercial awareness.",
      exampleBeforeAfter: {
        before:
          "Engineered asynchronous data ingestion pipeline handling 45M daily events using Node.js, Kafka, and Redis caching.",
        after:
          "Engineered asynchronous data pipeline processing 45M daily events with Node.js and Kafka, ensuring zero message loss and unlocking real-time billing analytics for $14M in ARR."
      }
    },
    {
      category: "Keyword Optimization",
      impact: "high",
      suggestion:
        "Integrate keywords related to cross-functional leadership, such as 'Product Roadmapping' and 'Sprint Planning' to align with Staff/Senior role expectations.",
      exampleBeforeAfter: {
        before: "Led cloud migration from monolithic EC2 instances to AWS ECS Fargate container clusters...",
        after:
          "Partnered with Product and DevOps stakeholders to lead zero-downtime migration to AWS ECS Fargate, cutting infrastructure spend by 32% ($68K/yr)."
      }
    },
    {
      category: "ATS Structure & Formatting",
      impact: "medium",
      suggestion:
        "Ensure bullet points start consistently with past-tense action verbs ('Architected', 'Spearheaded', 'Optimized') and avoid repeating 'Developed'."
    }
  ],
  professionalSummaryReview: {
    currentAssessment:
      "Good technical overview, but reads slightly generic. Lacks the crisp executive punch expected for a top-tier Senior role.",
    improvedVersion:
      "Senior Full-Stack Engineer with 6+ years specializing in Next.js/React enterprise platforms and resilient Node.js microservices. Scaled web systems to 1.5M+ MAU, eliminated $68K in cloud overhead via AWS containerization, and cut P99 latency by 58%. Passionate about developer velocity, automated testing, and building intuitive user interfaces.",
    keyChangesMade: [
      "Front-loaded quantified accomplishments and latency reductions",
      "Emphasized modern Next.js ecosystem focus immediately in first sentence",
      "Removed passive filler words to maximize ATS keyword density"
    ]
  },
  sectionScores: {
    impactAndMetrics: 94,
    formattingAndClarity: 90,
    keywordOptimization: 86,
    brevityAndRelevance: 88
  },
  analyzedAt: new Date().toISOString()
};

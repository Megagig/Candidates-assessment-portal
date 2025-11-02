export interface AssessmentQuestion {
  id: string;
  category: 'html-css-js' | 'react-nextjs' | 'crud' | 'auth' | 'database' | 'backend' | 'laravel' | 'golang' | 'deployment';
  question: string;
  type: 'experience-level' | 'yes-no' | 'multiple-choice';
  options?: Array<{ value: string; label: string }>;
  helpText?: string;
  required: boolean;
  tierRelevance: number[]; // Which tiers (0-5) does this question affect
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // HTML/CSS/JavaScript
  {
    id: 'htmlCssJsKnowledge',
    category: 'html-css-js',
    question: 'What is your proficiency level with HTML, CSS, and JavaScript?',
    type: 'experience-level',
    options: [
      { value: 'none', label: 'None - I have no experience' },
      { value: 'basic', label: 'Basic - I understand the fundamentals' },
      { value: 'intermediate', label: 'Intermediate - I can build complete web pages' },
      { value: 'advanced', label: 'Advanced - I have deep expertise and best practices' },
    ],
    helpText: 'This assesses your foundational web development knowledge',
    required: true,
    tierRelevance: [0, 1, 2, 3, 4, 5],
  },

  // React/Next.js
  {
    id: 'reactNextJsKnowledge',
    category: 'react-nextjs',
    question: 'What is your experience level with React or Next.js?',
    type: 'experience-level',
    options: [
      { value: 'none', label: 'None - I have never used them' },
      { value: 'basic', label: 'Basic - I know the basics and can follow tutorials' },
      { value: 'intermediate', label: 'Intermediate - I can build applications independently' },
      { value: 'advanced', label: 'Advanced - I have extensive experience with complex projects' },
    ],
    helpText: 'React/Next.js is essential for modern frontend development',
    required: true,
    tierRelevance: [0, 1, 2, 3, 4, 5],
  },

  // CRUD Capability
  {
    id: 'canBuildCrudApp',
    category: 'crud',
    question: 'Can you build a CRUD (Create, Read, Update, Delete) application with a database?',
    type: 'yes-no',
    options: [
      { value: 'false', label: 'No, I cannot build CRUD applications yet' },
      { value: 'true', label: 'Yes, I can build CRUD applications' },
    ],
    helpText: 'CRUD operations are fundamental to most web applications',
    required: true,
    tierRelevance: [1, 2, 3, 4, 5],
  },

  // Database Knowledge
  {
    id: 'databaseKnowledge',
    category: 'database',
    question: 'What is your experience with databases (SQL, NoSQL, MongoDB, PostgreSQL, etc.)?',
    type: 'experience-level',
    options: [
      { value: 'none', label: 'None - I have no database experience' },
      { value: 'basic', label: 'Basic - I can perform simple queries' },
      { value: 'intermediate', label: 'Intermediate - I can design schemas and optimize queries' },
      { value: 'advanced', label: 'Advanced - I have expertise in database architecture' },
    ],
    helpText: 'Database knowledge is crucial for building data-driven applications',
    required: true,
    tierRelevance: [1, 2, 3, 4, 5],
  },

  // Password Authentication
  {
    id: 'canImplementAuth',
    category: 'auth',
    question: 'Can you implement password-based authentication in your applications?',
    type: 'yes-no',
    options: [
      { value: 'false', label: 'No, I cannot implement authentication' },
      { value: 'true', label: 'Yes, I can implement password authentication' },
    ],
    helpText: 'Authentication is critical for securing applications',
    required: true,
    tierRelevance: [2, 3, 4, 5],
  },

  // Google OAuth
  {
    id: 'canImplementGoogleAuth',
    category: 'auth',
    question: 'Can you implement OAuth authentication (e.g., Google Sign-In)?',
    type: 'yes-no',
    options: [
      { value: 'false', label: 'No, I have not implemented OAuth' },
      { value: 'true', label: 'Yes, I can implement OAuth (Google, GitHub, etc.)' },
    ],
    helpText: 'OAuth enables users to sign in with their existing accounts',
    required: true,
    tierRelevance: [2, 3, 4, 5],
  },

  // Express/Hono Knowledge
  {
    id: 'expressHonoKnowledge',
    category: 'backend',
    question: 'What is your experience with backend frameworks like Express or Hono?',
    type: 'experience-level',
    options: [
      { value: 'none', label: 'None - I have no backend framework experience' },
      { value: 'basic', label: 'Basic - I have tried building simple APIs' },
      { value: 'intermediate', label: 'Intermediate - I can build complete REST APIs' },
      { value: 'advanced', label: 'Advanced - I can build complex, scalable APIs' },
    ],
    helpText: 'Backend frameworks are essential for building server-side applications',
    required: true,
    tierRelevance: [2, 3, 4, 5],
  },

  // Authenticated API
  {
    id: 'canBuildAuthenticatedApi',
    category: 'backend',
    question: 'Can you build an authenticated CRUD API with proper documentation?',
    type: 'yes-no',
    options: [
      { value: 'false', label: 'No, I cannot build authenticated APIs yet' },
      { value: 'true', label: 'Yes, I can build authenticated APIs with documentation' },
    ],
    helpText: 'This involves JWT/sessions, route protection, and API documentation',
    required: true,
    tierRelevance: [3, 4, 5],
  },

  // API Documentation
  {
    id: 'canDocumentApi',
    category: 'backend',
    question: 'Can you document your APIs (Swagger, Postman, OpenAPI)?',
    type: 'yes-no',
    options: [
      { value: 'false', label: 'No, I do not document my APIs' },
      { value: 'true', label: 'Yes, I document my APIs professionally' },
    ],
    helpText: 'API documentation is crucial for team collaboration',
    required: true,
    tierRelevance: [3, 4, 5],
  },

  // Laravel Knowledge
  {
    id: 'laravelKnowledge',
    category: 'laravel',
    question: 'What is your experience with Laravel (PHP framework)?',
    type: 'experience-level',
    options: [
      { value: 'none', label: 'None - I have no Laravel experience' },
      { value: 'basic', label: 'Basic - I have tried Laravel' },
      { value: 'intermediate', label: 'Intermediate - I can build CRUD apps with Laravel' },
      { value: 'advanced', label: 'Advanced - I am proficient with Laravel' },
    ],
    helpText: 'Laravel is a popular PHP framework (alternative to Express/Hono)',
    required: true,
    tierRelevance: [3, 4],
  },

  // Deployment
  {
    id: 'canDeployApps',
    category: 'deployment',
    question: 'Can you deploy applications to production (Vercel, Netlify, AWS, etc.)?',
    type: 'yes-no',
    options: [
      { value: 'false', label: 'No, I have not deployed applications' },
      { value: 'true', label: 'Yes, I can deploy applications to production' },
    ],
    helpText: 'Deployment skills are important for shipping applications',
    required: true,
    tierRelevance: [2, 3, 4, 5],
  },

  // Golang Knowledge
  {
    id: 'golangKnowledge',
    category: 'golang',
    question: 'What is your experience with Golang (Go programming language)?',
    type: 'experience-level',
    options: [
      { value: 'none', label: 'None - I do not know Golang' },
      { value: 'basic', label: 'Basic - I am learning Golang' },
      { value: 'intermediate', label: 'Intermediate - I can build applications with Go' },
      { value: 'advanced', label: 'Advanced - I am proficient in Golang' },
    ],
    helpText: 'Golang is a powerful language for building high-performance APIs',
    required: true,
    tierRelevance: [4, 5],
  },

  // Golang API
  {
    id: 'canBuildGoApi',
    category: 'golang',
    question: 'Can you build a simple API with Golang and integrate it with a frontend?',
    type: 'yes-no',
    options: [
      { value: 'false', label: 'No, I cannot build Go APIs yet' },
      { value: 'true', label: 'Yes, I can build Go APIs and integrate them' },
    ],
    helpText: 'This demonstrates practical Golang skills',
    required: true,
    tierRelevance: [4, 5],
  },
];

// Helper function to get questions by category
export const getQuestionsByCategory = (category: AssessmentQuestion['category']) => {
  return ASSESSMENT_QUESTIONS.filter((q) => q.category === category);
};

// Helper function to get required questions
export const getRequiredQuestions = () => {
  return ASSESSMENT_QUESTIONS.filter((q) => q.required);
};

// Categories for organizing the assessment
export const ASSESSMENT_CATEGORIES = [
  { id: 'html-css-js', name: 'HTML, CSS & JavaScript', icon: '🌐' },
  { id: 'react-nextjs', name: 'React & Next.js', icon: '⚛️' },
  { id: 'crud', name: 'CRUD Applications', icon: '📝' },
  { id: 'database', name: 'Database', icon: '🗄️' },
  { id: 'auth', name: 'Authentication', icon: '🔐' },
  { id: 'backend', name: 'Backend Frameworks', icon: '⚙️' },
  { id: 'laravel', name: 'Laravel (Optional)', icon: '🐘' },
  { id: 'deployment', name: 'Deployment', icon: '🚀' },
  { id: 'golang', name: 'Golang', icon: '🔷' },
] as const;

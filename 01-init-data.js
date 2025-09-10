// MongoDB initialization script with sample data
db = db.getSiblingDB('gamified-education');

// Create sample achievements
db.achievements.insertMany([
  {
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    color: "#22c55e",
    category: "Academic",
    type: "completion",
    criteria: {
      lessonsRequired: 1,
      pointsRequired: 0,
      streakRequired: 0
    },
    rewards: {
      points: 50,
      badge: {
        name: "Beginner",
        icon: "🌟",
        color: "#22c55e"
      }
    },
    difficulty: "Easy",
    rarity: "Common",
    isActive: true,
    isHidden: false,
    unlockLevel: 1,
    stats: {
      totalEarned: 0
    }
  },
  {
    name: "Learning Streak",
    description: "Learn for 7 consecutive days",
    icon: "🔥",
    color: "#f97316",
    category: "Engagement",
    type: "streak",
    criteria: {
      streakRequired: 7,
      pointsRequired: 0,
      lessonsRequired: 0
    },
    rewards: {
      points: 100,
      badge: {
        name: "Streak Master",
        icon: "🔥",
        color: "#f97316"
      }
    },
    difficulty: "Medium",
    rarity: "Rare",
    isActive: true,
    isHidden: false,
    unlockLevel: 1,
    stats: {
      totalEarned: 0
    }
  },
  {
    name: "Point Master",
    description: "Earn your first 1000 points",
    icon: "💰",
    color: "#ffd700",
    category: "Milestone",
    type: "points",
    criteria: {
      pointsRequired: 1000,
      streakRequired: 0,
      lessonsRequired: 0
    },
    rewards: {
      points: 200,
      badge: {
        name: "Gold Collector",
        icon: "💰",
        color: "#ffd700"
      }
    },
    difficulty: "Hard",
    rarity: "Epic",
    isActive: true,
    isHidden: false,
    unlockLevel: 5,
    stats: {
      totalEarned: 0
    }
  }
]);

// Create sample courses
db.courses.insertMany([
  {
    title: "Introduction to JavaScript",
    description: "Learn the fundamentals of JavaScript programming language. This comprehensive course covers variables, functions, loops, and basic DOM manipulation.",
    shortDescription: "Master JavaScript basics in this beginner-friendly course.",
    category: "Programming",
    level: "Beginner",
    price: 0,
    duration: 480, // 8 hours in minutes
    pointsPerLesson: 10,
    pointsPerQuiz: 20,
    completionPoints: 100,
    prerequisites: [],
    requirements: [
      "Basic computer knowledge",
      "Text editor or IDE",
      "Web browser"
    ],
    learningObjectives: [
      "Understand JavaScript syntax and basics",
      "Work with variables and data types",
      "Create and use functions",
      "Manipulate DOM elements",
      "Handle events in web pages"
    ],
    stats: {
      totalEnrollments: 0,
      totalCompletions: 0,
      averageRating: 0,
      totalRatings: 0
    },
    isPublished: true,
    isActive: true,
    allowComments: true,
    allowRatings: true,
    tags: ["javascript", "programming", "web-development", "beginner"]
  },
  {
    title: "React Fundamentals",
    description: "Build modern web applications with React. Learn components, state management, hooks, and how to create dynamic user interfaces.",
    shortDescription: "Build dynamic UIs with React components and hooks.",
    category: "Programming",
    level: "Intermediate",
    price: 0,
    duration: 720, // 12 hours in minutes
    pointsPerLesson: 15,
    pointsPerQuiz: 25,
    completionPoints: 150,
    prerequisites: [
      "JavaScript fundamentals",
      "HTML and CSS knowledge"
    ],
    requirements: [
      "Node.js installed",
      "Code editor",
      "JavaScript knowledge"
    ],
    learningObjectives: [
      "Create React components",
      "Manage component state",
      "Use React hooks effectively",
      "Handle user interactions",
      "Build complete React applications"
    ],
    stats: {
      totalEnrollments: 0,
      totalCompletions: 0,
      averageRating: 0,
      totalRatings: 0
    },
    isPublished: true,
    isActive: true,
    allowComments: true,
    allowRatings: true,
    tags: ["react", "javascript", "frontend", "components", "hooks"]
  },
  {
    title: "Data Structures and Algorithms",
    description: "Master fundamental data structures and algorithms. Essential knowledge for technical interviews and efficient programming.",
    shortDescription: "Essential data structures and algorithms for programmers.",
    category: "Programming",
    level: "Advanced",
    price: 0,
    duration: 960, // 16 hours in minutes
    pointsPerLesson: 20,
    pointsPerQuiz: 30,
    completionPoints: 200,
    prerequisites: [
      "Programming experience in any language",
      "Basic mathematics knowledge"
    ],
    requirements: [
      "Programming language knowledge",
      "IDE or text editor",
      "Problem-solving mindset"
    ],
    learningObjectives: [
      "Understand time and space complexity",
      "Implement common data structures",
      "Master sorting and searching algorithms",
      "Solve coding interview problems",
      "Optimize algorithm performance"
    ],
    stats: {
      totalEnrollments: 0,
      totalCompletions: 0,
      averageRating: 0,
      totalRatings: 0
    },
    isPublished: true,
    isActive: true,
    allowComments: true,
    allowRatings: true,
    tags: ["algorithms", "data-structures", "programming", "interviews", "computer-science"]
  }
]);

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ totalPoints: -1 });
db.users.createIndex({ level: -1 });
db.courses.createIndex({ title: "text", description: "text" });
db.courses.createIndex({ category: 1 });
db.courses.createIndex({ isPublished: 1, isActive: 1 });
db.achievements.createIndex({ category: 1, type: 1 });

print("✅ Database initialized with sample data!");

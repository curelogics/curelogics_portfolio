import { link } from "framer-motion/client";
import { GrTechnology } from "react-icons/gr";

const projects = [
  {
    title: "COTD.AI – AI-Powered Trading Intelligence Platform",
    link: "https://cotd.ai",
    technologies: [
      "React.js",
      "Nest.js",
      "Node.js",
      "Blockchain",
      "Netlify",
      "TypeScript",
      "AWS Lambda",
      "MongoDB",
      "WebSockets",
      "REST APIs",
      "Docker",
      "GraphQL",
      "TensorFlow",
      "Python",
      "Redis",
      "PostgreSQL",
      "Jest"
    ],
    description:
      "Developed COTD.AI, an AI-powered trading intelligence platform delivering 10K+ daily sentiment signals for global traders. Implemented full-stack architecture using React for frontend and Nest.js/Node.js for backend. Integrated blockchain for secure transaction tracking and real-time WebSocket APIs for live market data. Built AI models using TensorFlow and Python to generate trading signals, optimized database performance with MongoDB and PostgreSQL, and deployed scalable serverless functions on AWS Lambda. Ensured seamless user experience with responsive UI and fast, secure APIs.",
    image: "/images/cotd.png"
  },
  {
    title: "HIMS(Hospital Information Management System)",
    link: "https://pakhims.com/login",
    technologies: [
      "Node.js",
      "MongoDB",
      "Express.js",
      "AWS S3",
      "AWS EC2",
      "Microsoft Azure",
      "Docker",
      "Next.js",
      "SQL Server",
      "TypeScript",
      "Nest.js",
      "Memcached",
      "ElasticSearch",
      "Lambda Functions",
      "React.js",
      "Google Extensions",
    ],
    description:
      "Developed the HIMS project using MERN technologies, encompassing both front-end and back-end development. Implemented modules for appointments, insurance, financial reporting, access configuration, employees, OPD, IPD, pathology, radiology, pharmacy, and blood bank management. Ensured seamless user experience and efficient data handling by integrating robust APIs and optimizing database performance.",
    image: "/images/pakhims.png",
  },
  {
    title: "Sportecolytics – Sports Sustainability Dashboard",
    link: "https://sportecolytics.com",
    technologies: [
      "React.js",
      "Next.js",
      "Node.js",
      "Supabase",
      "Vercel",
      "TypeScript",
      "PostgreSQL",
      "REST APIs",
      "Chart.js",
      "D3.js",
      "Docker",
      "AWS S3",
      "Jest",
      "Tailwind CSS",
      "Redux"
    ],
    description:
      "Developed Sportecolytics, a comprehensive dashboard that enables sports organizations to track, analyze, and reduce over 100K tons of CO₂ emissions annually. Implemented the frontend using React and Next.js with responsive, interactive charts powered by Chart.js and D3.js. Built backend services with Node.js and Supabase for secure user authentication, real-time data management, and optimized database queries. Deployed the platform on Vercel for high performance and scalability. Integrated analytics modules to provide actionable insights and sustainability metrics for sports organizations worldwide.",
    image: "/images/sportecolytics.png"
  },
  {
    title: "TapMeSaveMe – NFC-based eCommerce Platform",
    link: "https://tapmesaveme.com",
    technologies: [
      "Next.js",
      "React.js",
      "Firebase",
      "Shopify API",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "Firestore",
      "Vercel",
      "Docker"
    ],
    description:
      "Developed TapMeSaveMe, an NFC-based eCommerce platform that enables seamless shopping experiences and powers over 50K product scans monthly. Integrated Shopify for product management and Firebase for authentication, real-time database updates, and analytics tracking. Built a responsive and modern frontend using Next.js and React.js, ensuring smooth user interactions across devices. Implemented secure payment flows, order tracking, and analytics dashboards to provide actionable insights to merchants and optimize customer experience.",
    image: "/images/tapmesaveme.png"
  }
];

export default projects;

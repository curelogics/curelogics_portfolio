import { link } from "framer-motion/client";
import { GrTechnology } from "react-icons/gr";

const projects = [
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
    image: "https://usmankhalid.me/portfolio/hims.png",
  },
  {
    title: "Cyara/TestRTC",
    link: "https://videotest.testrtc.com/",
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
      "Developed the TestRTC project utilizing Express.js with Typescript, React.js, MongoDB, WebRTC, AWS, and Lambda Functions. Created a robust backend using Express.js, ensuring type safety and efficient server-side operations. Implemented a dynamic frontend with React.js to provide a seamless user interface and interactive user experience. Utilized MongoDB for efficient, scalable database management, handling large volumes of real-time data.",
    image: "	https://usmankhalid.me/portfolio/cyara.png",
  },
  {
    title: "SIRA's Regulatory Skills Self-Assessment Tool",
    link: "https://siracld.visualmetrics.io/",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "OKTA",
      "TypeScript",
    ],
    description:
      "SIRA is a regulatory self-assessment platform developed to help organizations evaluate their compliance posture effectively. The application is built using React.js for the frontend and Node.js for the backend, with PostgreSQL as the primary database. We used TypeScript throughout the stack to ensure type safety and maintainable code. For user interface design, we implemented Tailwind CSS to create an attractive, modern, and fully responsive layout. To ensure secure user authentication and authorization, Okta was integrated, providing robust identity management and access control.",
    image: "images/sira.png",
  },
  // {
  //   title: "GotStuck Mobile Application (Recovery / Car Transportation)",
  //   link: "https://gotstuck.co.uk/applaunch/",
  //   technologies: ["Angular", "Spring Boot", "MySQL", "Kubernetes"],
  //   description:
  //     "Developed the TestRTC project utilizing Express.js with Typescript, React.js, MongoDB, WebRTC, AWS, and Lambda Functions. Created a robust backend using Express.js, ensuring type safety and efficient server-side operations. Implemented a dynamic frontend with React.js to provide a seamless user interface and interactive user experience. Utilized MongoDB for efficient, scalable database management, handling large volumes of real-time data.",
  //   image: "https://usmankhalid.me/portfolio/got.png",
  // },
];

export default projects;

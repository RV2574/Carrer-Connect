/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { QRCodeCanvas } from "qrcode.react";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  User, 
  LogOut, 
  PlusCircle, 
  CheckCircle, 
  Bookmark, 
  ChevronRight,
  Filter,
  Building2,
  Users,
  ArrowLeft,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ROADMAPS = [
  {
    category: "Frontend",
    items: [
      { title: "Frontend", link: "https://roadmap.sh/frontend" },
      { title: "React", link: "https://roadmap.sh/react" },
      { title: "Vue", link: "https://roadmap.sh/vue" },
      { title: "Angular", link: "https://roadmap.sh/angular" },
      { title: "JavaScript", link: "https://roadmap.sh/javascript" },
      { title: "TypeScript", link: "https://roadmap.sh/typescript" },
      { title: "Next.js", link: "https://roadmap.sh/nextjs" },
      { title: "HTML", link: "https://roadmap.sh/html" },
      { title: "CSS", link: "https://roadmap.sh/css" }
    ]
  },

  {
    category: "Backend",
    items: [
      { title: "Backend", link: "https://roadmap.sh/backend" },
      { title: "Node.js", link: "https://roadmap.sh/nodejs" },
      { title: "Java", link: "https://roadmap.sh/java" },
      { title: "Spring Boot", link: "https://roadmap.sh/spring-boot" },
      { title: "ASP.NET Core", link: "https://roadmap.sh/aspnet-core" },
      { title: "Django", link: "https://roadmap.sh/django" },
      { title: "Laravel", link: "https://roadmap.sh/laravel" },
      { title: "Ruby on Rails", link: "https://roadmap.sh/ruby-on-rails" },
      { title: "PHP", link: "https://roadmap.sh/php" }
    ]
  },

  {
    category: "DevOps & Cloud",
    items: [
      { title: "Docker", link: "https://roadmap.sh/docker" },
      { title: "Kubernetes", link: "https://roadmap.sh/kubernetes" },
      { title: "AWS", link: "https://roadmap.sh/aws" },
      { title: "Terraform", link: "https://roadmap.sh/terraform" },
      { title: "Linux", link: "https://roadmap.sh/linux" },
      { title: "Cloudflare", link: "https://roadmap.sh/cloudflare" }
    ]
  },

  {
    category: "Programming Languages",
    items: [
      { title: "Python", link: "https://roadmap.sh/python" },
      { title: "C++", link: "https://roadmap.sh/cpp" },
      { title: "Go", link: "https://roadmap.sh/golang" },
      { title: "Rust", link: "https://roadmap.sh/rust" },
      { title: "Kotlin", link: "https://roadmap.sh/kotlin" },
      { title: "Swift", link: "https://roadmap.sh/swift" },
      { title: "Scala", link: "https://roadmap.sh/scala" },
      { title: "Ruby", link: "https://roadmap.sh/ruby" }
    ]
  },

  {
    category: "Data & CS",
    items: [
      { title: "SQL", link: "https://roadmap.sh/sql" },
      { title: "MongoDB", link: "https://roadmap.sh/mongodb" },
      { title: "Redis", link: "https://roadmap.sh/redis" },
      { title: "Computer Science", link: "https://roadmap.sh/computer-science" },
      { title: "System Design", link: "https://roadmap.sh/system-design" },
      { title: "DSA", link: "https://roadmap.sh/dsa" }
    ]
  },

  {
    category: "Mobile Development",
    items: [
      { title: "Flutter", link: "https://roadmap.sh/flutter" },
      { title: "React Native", link: "https://roadmap.sh/react-native" },
      { title: "Android", link: "https://roadmap.sh/android" }
    ]
  },

  {
    category: "Other Skills",
    items: [
      { title: "Git & GitHub", link: "https://roadmap.sh/git-github" },
      { title: "API Design", link: "https://roadmap.sh/api-design" },
      { title: "GraphQL", link: "https://roadmap.sh/graphql" },
      { title: "Design System", link: "https://roadmap.sh/design-system" },
      { title: "Code Review", link: "https://roadmap.sh/code-review" },
      { title: "Shell/Bash", link: "https://roadmap.sh/bash" },
      { title: "Elasticsearch", link: "https://roadmap.sh/elasticsearch" }
    ]
  },

  {
    category: "AI & Future",
    items: [
      { title: "Prompt Engineering", link: "https://roadmap.sh/prompt-engineering" },
      { title: "AI Agents", link: "https://roadmap.sh/ai-agents" },
      { title: "AI Red Teaming", link: "https://roadmap.sh/ai-red-teaming" },
      { title: "Vibe Coding", link: "https://roadmap.sh/vibe-coding" },
      { title: "Claude Code", link: "https://roadmap.sh/claude-code" }
    ]
  }
];

// --- Types ---
type UserRole = 'seeker' | 'lister' | 'admin';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Private' | 'Government';
  description: string;
  listerId: string;
  postedAt: string;
}

interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  seekerName: string;
  seekerEmail: string;
  jobTitle: string;
  appliedAt: string;
}

// --- Initial Data ---
const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'Vercel',
    location: 'Remote',
    salary: '$140k - $180k',
    type: 'Private',
    description: 'We are looking for an experienced Frontend Engineer to join our core team. You will be responsible for building high-performance web applications using React and Next.js.',
    listerId: 'admin',
    postedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Administrative Assistant',
    company: 'Department of Education',
    location: 'Sacramento, CA',
    salary: '$55k - $75k',
    type: 'Government',
    description: 'The Department of Education is seeking a dedicated Administrative Assistant to support our regional office operations. This role involves managing schedules, coordinating meetings, and handling public inquiries.',
    listerId: 'admin',
    postedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Product Designer',
    company: 'Airbnb',
    location: 'San Francisco, CA',
    salary: '$130k - $160k',
    type: 'Private',
    description: 'Join our design team to create beautiful and functional experiences for millions of travelers worldwide. You will work closely with product managers and engineers to bring ideas to life.',
    listerId: 'admin',
    postedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'National Science Foundation',
    location: 'Arlington, VA',
    salary: '$110k - $140k',
    type: 'Government',
    description: 'The NSF is looking for a Data Scientist to analyze research trends and help inform funding decisions. Experience with Python, R, and large-scale data analysis is required.',
    listerId: 'admin',
    postedAt: new Date().toISOString()
  },
{
  id: '5',
  title: 'Full Stack Developer',
  company: 'DevSphere',
  location: 'Bangalore, India',
  salary: '₹10L - ₹18L',
  type: 'Private',
  description: 'Develop and maintain full stack web applications using modern technologies.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '6',
  title: 'Junior Accountant',
  company: 'Finance Department',
  location: 'Jaipur, India',
  salary: '₹4L - ₹6L',
  type: 'Government',
  description: 'Handle financial records and assist in budgeting processes.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '7',
  title: 'UI Developer',
  company: 'PixelCraft',
  location: 'Delhi, India',
  salary: '₹6L - ₹10L',
  type: 'Private',
  description: 'Create responsive UI components using modern frontend tools.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '8',
  title: 'Clerk',
  company: 'Railway Department',
  location: 'Lucknow, India',
  salary: '₹3L - ₹5L',
  type: 'Government',
  description: 'Perform clerical duties including data entry and record keeping.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '9',
  title: 'Mobile App Developer',
  company: 'Appify Tech',
  location: 'Remote',
  salary: '₹8L - ₹15L',
  type: 'Private',
  description: 'Develop cross-platform mobile applications.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '10',
  title: 'Police Constable',
  company: 'State Police',
  location: 'Bhopal, India',
  salary: '₹3L - ₹4.5L',
  type: 'Government',
  description: 'Maintain law and order and ensure public safety.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '11',
  title: 'DevOps Engineer',
  company: 'CloudNet',
  location: 'Hyderabad, India',
  salary: '₹12L - ₹20L',
  type: 'Private',
  description: 'Manage CI/CD pipelines and cloud infrastructure.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '12',
  title: 'Teacher (Primary)',
  company: 'Government School',
  location: 'Udaipur, India',
  salary: '₹3L - ₹5L',
  type: 'Government',
  description: 'Teach primary school students and manage classroom activities.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '13',
  title: 'QA Engineer',
  company: 'Testify Labs',
  location: 'Pune, India',
  salary: '₹5L - ₹9L',
  type: 'Private',
  description: 'Test software products to ensure quality and performance.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '14',
  title: 'Bank Clerk',
  company: 'Public Sector Bank',
  location: 'Mumbai, India',
  salary: '₹4L - ₹6L',
  type: 'Government',
  description: 'Handle customer transactions and banking operations.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '15',
  title: 'Graphic Designer',
  company: 'DesignHub',
  location: 'Remote',
  salary: '₹4L - ₹8L',
  type: 'Private',
  description: 'Create visual designs for branding and marketing.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '16',
  title: 'Forest Officer',
  company: 'Forest Department',
  location: 'Dehradun, India',
  salary: '₹5L - ₹8L',
  type: 'Government',
  description: 'Protect forests and wildlife resources.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '17',
  title: 'Backend Developer',
  company: 'DataCore',
  location: 'Chennai, India',
  salary: '₹9L - ₹14L',
  type: 'Private',
  description: 'Develop APIs and backend services.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '18',
  title: 'Postal Assistant',
  company: 'India Post',
  location: 'Kota, India',
  salary: '₹3L - ₹5L',
  type: 'Government',
  description: 'Manage postal operations and customer service.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '19',
  title: 'Digital Marketing Executive',
  company: 'MarketGrow',
  location: 'Gurgaon, India',
  salary: '₹5L - ₹9L',
  type: 'Private',
  description: 'Plan and execute digital marketing campaigns.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '20',
  title: 'Sub Inspector',
  company: 'Police Department',
  location: 'Indore, India',
  salary: '₹6L - ₹8L',
  type: 'Government',
  description: 'Investigate criminal cases and maintain law enforcement.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '21',
  title: 'Sales Executive',
  company: 'Reliance Retail',
  location: 'Mumbai, India',
  salary: '₹3L - ₹6L',
  type: 'Private',
  description: 'Drive in-store sales and manage customer relations.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '22',
  title: 'HR Recruiter',
  company: 'Randstad',
  location: 'Gurgaon, India',
  salary: '₹4L - ₹7L',
  type: 'Private',
  description: 'Source and screen candidates for client roles.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '23',
  title: 'Accountant',
  company: 'KPMG',
  location: 'Delhi, India',
  salary: '₹5L - ₹9L',
  type: 'Private',
  description: 'Handle financial statements and audits.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '24',
  title: 'Mechanical Engineer',
  company: 'L&T',
  location: 'Chennai, India',
  salary: '₹6L - ₹10L',
  type: 'Private',
  description: 'Design and maintain mechanical systems.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '25',
  title: 'Civil Engineer',
  company: 'Shapoorji Pallonji',
  location: 'Kolkata, India',
  salary: '₹5L - ₹9L',
  type: 'Private',
  description: 'Oversee construction projects and site operations.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '26',
  title: 'Pharmacist',
  company: 'Apollo Pharmacy',
  location: 'Hyderabad, India',
  salary: '₹3L - ₹5L',
  type: 'Private',
  description: 'Dispense medicines and advise customers.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '27',
  title: 'Hotel Manager',
  company: 'Taj Hotels',
  location: 'Goa, India',
  salary: '₹8L - ₹14L',
  type: 'Private',
  description: 'Manage hotel operations and guest experience.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '28',
  title: 'Chef',
  company: 'ITC Hotels',
  location: 'Bangalore, India',
  salary: '₹4L - ₹8L',
  type: 'Private',
  description: 'Prepare cuisine and manage kitchen staff.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '29',
  title: 'Journalist',
  company: 'Times Group',
  location: 'Delhi, India',
  salary: '₹4L - ₹7L',
  type: 'Private',
  description: 'Report news and create editorial content.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '30',
  title: 'Photographer',
  company: 'Wedding Bells',
  location: 'Jaipur, India',
  salary: '₹3L - ₹6L',
  type: 'Private',
  description: 'Shoot and edit event photographs.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '31',
  title: 'Fitness Trainer',
  company: 'Gold’s Gym',
  location: 'Pune, India',
  salary: '₹2.5L - ₹5L',
  type: 'Private',
  description: 'Train clients and design fitness plans.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '32',
  title: 'Retail Store Manager',
  company: 'Pantaloons',
  location: 'Ahmedabad, India',
  salary: '₹5L - ₹8L',
  type: 'Private',
  description: 'Manage store operations and sales team.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '33',
  title: 'Content Writer',
  company: 'Pepper Content',
  location: 'Remote',
  salary: '₹3L - ₹6L',
  type: 'Private',
  description: 'Write blogs, SEO content, and articles.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '34',
  title: 'Customer Support Executive',
  company: 'Teleperformance',
  location: 'Noida, India',
  salary: '₹2.5L - ₹4.5L',
  type: 'Private',
  description: 'Handle customer queries via calls and chat.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '35',
  title: 'Electrician',
  company: 'Urban Company',
  location: 'Delhi, India',
  salary: '₹2L - ₹4L',
  type: 'Private',
  description: 'Perform residential electrical repairs.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '36',
  title: 'Delivery Executive',
  company: 'Zomato',
  location: 'Lucknow, India',
  salary: '₹2L - ₹3.5L',
  type: 'Private',
  description: 'Deliver orders and manage routes.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '37',
  title: 'Driver',
  company: 'Ola',
  location: 'Mumbai, India',
  salary: '₹2.5L - ₹5L',
  type: 'Private',
  description: 'Provide ride-hailing services.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '38',
  title: 'Teacher (Private School)',
  company: 'Delhi Public School',
  location: 'Indore, India',
  salary: '₹3L - ₹6L',
  type: 'Private',
  description: 'Teach secondary school subjects.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '39',
  title: 'Nurse',
  company: 'Fortis Hospital',
  location: 'Chandigarh, India',
  salary: '₹3L - ₹5L',
  type: 'Private',
  description: 'Assist doctors and care for patients.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '40',
  title: 'Lab Technician',
  company: 'SRL Diagnostics',
  location: 'Bhopal, India',
  salary: '₹2.5L - ₹4L',
  type: 'Private',
  description: 'Conduct lab tests and maintain equipment.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '41',
  title: 'Warehouse Supervisor',
  company: 'Flipkart Logistics',
  location: 'Patna, India',
  salary: '₹3L - ₹6L',
  type: 'Private',
  description: 'Oversee warehouse operations.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '42',
  title: 'Field Sales Officer',
  company: 'HUL',
  location: 'Kanpur, India',
  salary: '₹4L - ₹7L',
  type: 'Private',
  description: 'Expand market reach and sales.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '43',
  title: 'Insurance Advisor',
  company: 'LIC (Agency)',
  location: 'Ranchi, India',
  salary: '₹2L - ₹6L',
  type: 'Private',
  description: 'Sell insurance policies and advise clients.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '44',
  title: 'Event Coordinator',
  company: 'Eventify',
  location: 'Jaipur, India',
  salary: '₹3L - ₹6L',
  type: 'Private',
  description: 'Plan and execute events.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '45',
  title: 'Real Estate Agent',
  company: 'MagicBricks',
  location: 'Gurgaon, India',
  salary: '₹3L - ₹8L',
  type: 'Private',
  description: 'Manage property listings and client deals.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},

// ----------- GOVERNMENT (46–70) -----------
{
  id: '46',
  title: 'Railway Clerk',
  company: 'Indian Railways',
  location: 'Delhi, India',
  salary: '₹3L - ₹5L',
  type: 'Government',
  description: 'Clerical railway operations.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '47',
  title: 'Police Constable',
  company: 'UP Police',
  location: 'Lucknow, India',
  salary: '₹3L - ₹4.5L',
  type: 'Government',
  description: 'Maintain law and order.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '48',
  title: 'Teacher',
  company: 'Gov School',
  location: 'Jaipur, India',
  salary: '₹3L - ₹6L',
  type: 'Government',
  description: 'Teach students.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '49',
  title: 'Bank PO',
  company: 'SBI',
  location: 'Patna, India',
  salary: '₹6L - ₹10L',
  type: 'Government',
  description: 'Bank operations.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '50',
  title: 'Forest Guard',
  company: 'Forest Department',
  location: 'Dehradun, India',
  salary: '₹3L - ₹5L',
  type: 'Government',
  description: 'Protect forest resources.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '51',
  title: 'Municipal Officer',
  company: 'Municipal Corporation',
  location: 'Ahmedabad, India',
  salary: '₹5L - ₹8L',
  type: 'Government',
  description: 'Manage city administration.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '52',
  title: 'Postal Assistant',
  company: 'India Post',
  location: 'Kolkata, India',
  salary: '₹3L - ₹5L',
  type: 'Government',
  description: 'Handle postal services.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '53',
  title: 'Revenue Officer',
  company: 'State Revenue Dept',
  location: 'Chennai, India',
  salary: '₹6L - ₹9L',
  type: 'Government',
  description: 'Manage land and revenue records.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '54',
  title: 'Sub Inspector',
  company: 'Delhi Police',
  location: 'Delhi, India',
  salary: '₹6L - ₹8L',
  type: 'Government',
  description: 'Investigate criminal cases.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '55',
  title: 'Nurse',
  company: 'AIIMS',
  location: 'Bhopal, India',
  salary: '₹4L - ₹7L',
  type: 'Government',
  description: 'Assist in patient care.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '56',
  title: 'Junior Engineer',
  company: 'PWD',
  location: 'Lucknow, India',
  salary: '₹5L - ₹9L',
  type: 'Government',
  description: 'Oversee public works.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '57',
  title: 'Agriculture Officer',
  company: 'Agri Dept',
  location: 'Nagpur, India',
  salary: '₹5L - ₹8L',
  type: 'Government',
  description: 'Support farmers and schemes.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '58',
  title: 'Clerk',
  company: 'District Court',
  location: 'Indore, India',
  salary: '₹3L - ₹5L',
  type: 'Government',
  description: 'Handle court documentation.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '59',
  title: 'Fireman',
  company: 'Fire Department',
  location: 'Surat, India',
  salary: '₹3L - ₹5L',
  type: 'Government',
  description: 'Emergency fire services.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '60',
  title: 'Tax Assistant',
  company: 'Income Tax Dept',
  location: 'Pune, India',
  salary: '₹4L - ₹7L',
  type: 'Government',
  description: 'Assist in tax processing.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '61',
  title: 'Librarian',
  company: 'Gov Library',
  location: 'Varanasi, India',
  salary: '₹3L - ₹5L',
  type: 'Government',
  description: 'Manage library resources.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '62',
  title: 'Transport Inspector',
  company: 'RTO',
  location: 'Bangalore, India',
  salary: '₹5L - ₹8L',
  type: 'Government',
  description: 'Vehicle inspection and regulation.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '63',
  title: 'Health Inspector',
  company: 'Health Dept',
  location: 'Kochi, India',
  salary: '₹4L - ₹7L',
  type: 'Government',
  description: 'Ensure public health standards.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '64',
  title: 'Village Development Officer',
  company: 'Rural Dev Dept',
  location: 'Alwar, India',
  salary: '₹4L - ₹6L',
  type: 'Government',
  description: 'Implement rural schemes.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '65',
  title: 'Electricity Board Technician',
  company: 'State Electricity Board',
  location: 'Raipur, India',
  salary: '₹3L - ₹5L',
  type: 'Government',
  description: 'Maintain electrical infrastructure.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '66',
  title: 'Water Supply Officer',
  company: 'Jal Board',
  location: 'Delhi, India',
  salary: '₹5L - ₹8L',
  type: 'Government',
  description: 'Manage water distribution.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '67',
  title: 'Metro Staff',
  company: 'DMRC',
  location: 'Delhi, India',
  salary: '₹3L - ₹6L',
  type: 'Government',
  description: 'Assist metro operations.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '68',
  title: 'Court Assistant',
  company: 'High Court',
  location: 'Chandigarh, India',
  salary: '₹4L - ₹6L',
  type: 'Government',
  description: 'Support judicial processes.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '69',
  title: 'Fisheries Officer',
  company: 'Fisheries Dept',
  location: 'Visakhapatnam, India',
  salary: '₹5L - ₹7L',
  type: 'Government',
  description: 'Promote fisheries sector.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
},
{
  id: '70',
  title: 'Postal Officer',
  company: 'India Post',
  location: 'Chandigarh, India',
  salary: '₹3L - ₹5L',
  type: 'Government',
  description: 'Manage postal services.',
  listerId: 'admin',
  postedAt: new Date().toISOString()
}
];
// --- Components ---
const JobCard = ({ job, currentUser, savedJobs, applications, onSave, onViewDetails, onViewApplicants, onDelete, onEdit }: { 
  job: Job, 
  currentUser: UserProfile | null, 
  savedJobs: string[], 
  applications: Application[],
  onSave: (id: string) => void,
  onViewDetails: (job: Job) => void,
  onViewApplicants: (job: Job) => void,
  onDelete: (id: string) => void,
  onEdit: (job: Job) => void,
  key?: string | number
}) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
          {job.type === 'Government' ? <Building2 className="text-gray-400 group-hover:text-indigo-600" /> : <Briefcase className="text-gray-400 group-hover:text-indigo-600" />}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.type === 'Government' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
        {job.type}
      </span>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="flex items-center text-sm text-gray-500">
        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
        {job.location}
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
        {job.salary}
      </div>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
      
      <button 
        onClick={() => onViewDetails(job)}
        className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center"
      >
        View Details <ChevronRight className="w-4 h-4 ml-1" />
      </button>

      {/* Seeker */}
      {currentUser?.role === 'seeker' && (
        <button 
          onClick={() => onSave(job.id)}
          className={`p-2 rounded-lg transition-colors ${savedJobs.includes(job.id) ? 'bg-indigo-50 text-indigo-600' : 'text-gray-300 hover:text-indigo-600 hover:bg-indigo-50'}`}
        >
          <Bookmark className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
        </button>
      )}

      {/* Lister */}
      {currentUser?.role === 'lister' && currentUser.id === job.listerId && (
        <button 
          onClick={() => onViewApplicants(job)}
          className="text-xs font-bold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center"
        >
          <Users className="w-3 h-3 mr-1.5" />
          Applicants ({applications.filter(a => a.jobId === job.id).length})
        </button>
      )}

      {/* ✅ ADMIN CONTROLS */}
      {currentUser?.role === 'admin' && (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(job)}
            className="text-xs font-bold bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-lg hover:bg-yellow-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="text-xs font-bold bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      )}

    </div>
  </motion.div>
);

// --- Main Component ---
export default function App() {
  // --- State ---
 const [view, setView] = useState<
  'home' | 'login' | 'signup' | 'dashboard' | 'post-job' | 'job-details' | 'applicants' | 'about' | 'roadmaps'
>('about');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedJobApplicants, setSelectedJobApplicants] = useState<Application[]>([]);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Private' | 'Government'>('All');
  const [filterLocation, setFilterLocation] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [messages, setMessages] = useState([
  { text: "Hi 👋 I'm Zora, tell me how can i assist you!", sender: "bot" }
]);

  // --- Persistence ---
useEffect(() => {
  const storedJobs = localStorage.getItem('jc_jobs');
  const storedApps = localStorage.getItem('jc_apps');
  const storedSaved = localStorage.getItem('jc_saved');
  const storedUser = localStorage.getItem('jc_current_user');

  if (storedJobs) {
    const parsedJobs = JSON.parse(storedJobs);

    // 🔥 KEY FIX: if old data (less than 70), reset it
    if (parsedJobs.length < INITIAL_JOBS.length) {
      localStorage.setItem('jc_jobs', JSON.stringify(INITIAL_JOBS));
      setJobs(INITIAL_JOBS);
    } else {
      setJobs(parsedJobs);
    }

  } else {
    localStorage.setItem('jc_jobs', JSON.stringify(INITIAL_JOBS));
    setJobs(INITIAL_JOBS);
  }

  if (storedApps) setApplications(JSON.parse(storedApps));
  if (storedSaved) setSavedJobs(JSON.parse(storedSaved));
  if (storedUser) setCurrentUser(JSON.parse(storedUser));

}, []);

  // --- Derived State ---
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'All' || job.type === filterType;
      const matchesLocation = job.location.toLowerCase().includes(filterLocation.toLowerCase());
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [jobs, searchQuery, filterType, filterLocation]);

// --- Handlers ---
// =======================
// ✅ SMART CHATBOT HANDLER (UPGRADED)
// =======================

const handleChat = (input: string) => {
  const msg = input.toLowerCase();

  let reply = `❌ I didn't understand.

👉 Try typing:
• "Software engineer jobs"
• "Government jobs in Delhi"
• "Private jobs in Mumbai"
• "Clerk government jobs"
• "Jobs in Jaipur"
• "Government job links"`;

  // =======================
  // 🔗 OFFICIAL GOV LINKS
  // =======================
  const govLinks = [
    "https://www.ncs.gov.in/",
    "https://services.india.gov.in/",
    "https://ssc.nic.in/",
    "https://www.upsc.gov.in/"
  ];

  // =======================
  // 🎯 JOB ROLES
  // =======================
  const jobRoles = [
    "software engineer","frontend developer","backend developer","full stack developer",
    "data analyst","data scientist","cloud engineer","devops engineer","qa engineer",
    "accountant","hr recruiter","sales executive","marketing","product manager",
    "customer support","insurance advisor","designer","ui ux designer","graphic designer",
    "content writer","photographer","nurse","pharmacist","lab technician","teacher",
    "driver","delivery executive","electrician","fitness trainer","store manager",
    "hotel manager","event coordinator","mechanical engineer","civil engineer",
    "clerk","police","constable","sub inspector","bank po","railway","forest guard",
    "municipal officer","postal","revenue officer","tax assistant","fireman",
    "librarian","transport inspector","health inspector","village development officer", "Chef", "Forest Officer"
  ];

  // =======================
  // 📍 CITY DETECTION
  // =======================
  const cities = [
    "delhi","mumbai","bangalore","jaipur","pune","chennai",
    "hyderabad","lucknow","patna","indore","bhopal","kolkata"
  ];

  const matchedRole = jobRoles.find(role => msg.includes(role));
  const matchedCity = cities.find(city => msg.includes(city));

  // =======================
  // 🧠 HELP COMMAND
  // =======================
  if (msg.includes("help")) {
    reply = `🧠 How to use:

🔹 Role:
"Software engineer jobs"

🔹 City:
"Jobs in Delhi"

🔹 Government:
"Clerk government jobs"

🔹 Combined:
"Private jobs in Mumbai"

🔗 For official sites:
Type "government job links"`;
  }

  // =======================
  // 🔥 GOV LINKS
  // =======================
  else if (msg.includes("government") && msg.includes("link")) {
    reply = `🔗 Official Government Job Websites:
${govLinks.join("\n")}`;
  }

  // =======================
  // 🎯 ROLE + CITY + GOV
  // =======================
  else if (matchedRole && matchedCity && msg.includes("government")) {
    setSearchQuery(matchedRole);
    setFilterType("Government");
    setView("home");
    reply = `Showing government ${matchedRole} jobs in ${matchedCity}.

💡 Try: "${matchedRole} jobs in ${matchedCity}"`;
  }

  // =======================
  // 🎯 ROLE + CITY
  // =======================
  else if (matchedRole && matchedCity) {
    setSearchQuery(matchedRole);
    setView("home");
    reply = `Showing ${matchedRole} jobs in ${matchedCity}.

💡 Tip: You can also try "government ${matchedRole} jobs"`;
  }

  // =======================
  // 🎯 ROLE ONLY
  // =======================
  else if (matchedRole) {
    setSearchQuery(matchedRole);
    setView("home");
    reply = `Showing jobs for "${matchedRole}".

💡 Try adding city: "${matchedRole} jobs in Delhi"`;
  }

  // =======================
  // 🎯 CITY ONLY
  // =======================
  else if (matchedCity) {
    setSearchQuery(matchedCity);
    setView("home");
    reply = `Showing jobs in ${matchedCity}.

💡 Try adding role: "Software jobs in ${matchedCity}"`;
  }

  // =======================
  // 🎯 TYPE FILTER
  // =======================
  else if (msg.includes("private")) {
    setFilterType("Private");
    setView("home");
    reply = `Showing private jobs.

💡 Try: "Private jobs in Mumbai"`;
  } 
  else if (msg.includes("government")) {
    setFilterType("Government");
    setView("home");
    reply = `Showing government jobs.

🔗 You can also check:
${govLinks[0]}

💡 Try: "Government jobs in Delhi"`;
  }

  // =======================
  // 🎯 NAVIGATION
  // =======================
  else if (msg.includes("dashboard")) {
    setView("dashboard");
    reply = "Opening dashboard.";
  } 
  else if (msg.includes("post")) {
    setView("post-job");
    reply = "Redirecting to post job.";
  }

  // =======================
  // 🎯 APPLY HELP
  // =======================
  else if (msg.includes("apply")) {
    reply = `📌 To apply:
1. Click "View Details"
2. Click "Apply Now"

💡 Tip: Try searching jobs first (e.g., "Software jobs")`;
  }

  // =======================
  // 💬 UPDATE CHAT
  // =======================
  setMessages(prev => [
    ...prev,
    { text: input, sender: "user" },
    { text: reply, sender: "bot" }
  ]);
};
const handleLogin = (email: string, pass: string) => {
  const users = JSON.parse(localStorage.getItem('jc_users') || '[]');
  const user = users.find((u: any) => u.email === email && u.password === pass);
  if (user) {
    setCurrentUser({ id: user.id, name: user.name, email: user.email, role: user.role });
    setSelectedJob(null);
    setView('home');
  } else {
    alert('Invalid credentials');
  }
};

const handleSignup = (name: string, email: string, pass: string, role: UserRole) => {
  const users = JSON.parse(localStorage.getItem('jc_users') || '[]');
  if (users.find((u: any) => u.email === email)) {
    alert('Email already exists');
    return;
  }
  const newUser = { id: Date.now().toString(), name, email, password: pass, role };
  users.push(newUser);
  localStorage.setItem('jc_users', JSON.stringify(users));
  setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role });
  setSelectedJob(null);
  setView('home');
};

const handleLogout = () => {
  setCurrentUser(null);
  setSelectedJob(null);
  setView('home');
};

const handleApply = (job: Job) => {
  if (!currentUser) {
    setView('login');
    return;
  }
  if (currentUser.role !== 'seeker') {
    alert('Only job seekers can apply');
    return;
  }
  if (applications.find(app => app.jobId === job.id && app.seekerId === currentUser.id)) {
    alert('You have already applied for this job');
    return;
  }

  const newApp: Application = {
    id: Date.now().toString(),
    jobId: job.id,
    seekerId: currentUser.id,
    seekerName: currentUser.name,
    seekerEmail: currentUser.email,
    jobTitle: job.title,
    appliedAt: new Date().toISOString()
  };

  const updatedApps = [...applications, newApp];
  setApplications(updatedApps);
  localStorage.setItem('jc_apps', JSON.stringify(updatedApps));
  alert('Application submitted successfully!');
};

const handleSave = (jobId: string) => {
  if (!currentUser) {
    setView('login');
    return;
  }
  if (currentUser.role !== 'seeker') {
    alert('Only job seekers can save jobs');
    return;
  }

  const updatedSaved = savedJobs.includes(jobId)
    ? savedJobs.filter(id => id !== jobId)
    : [...savedJobs, jobId];

  setSavedJobs(updatedSaved);
  localStorage.setItem('jc_saved', JSON.stringify(updatedSaved));
};



// =======================
// ✅ ADMIN HANDLERS
// =======================

const handleDeleteJob = (jobId: string) => {
  if (!currentUser || currentUser.role !== 'admin') return;

  const updatedJobs = jobs.filter(job => job.id !== jobId);
  setJobs(updatedJobs);
  localStorage.setItem('jc_jobs', JSON.stringify(updatedJobs));
};

const handleEditJob = (updatedJob: Job) => {
  if (!currentUser || currentUser.role !== 'admin') return;

  const updatedJobs = jobs.map(job =>
    job.id === updatedJob.id ? updatedJob : job
  );

  setJobs(updatedJobs);
  localStorage.setItem('jc_jobs', JSON.stringify(updatedJobs));
};



// =======================
// ✅ POST JOB (CREATE + ADMIN EDIT)
// =======================

const handlePostJob = (jobData: Omit<Job, 'id' | 'listerId' | 'postedAt'>) => {
  if (!currentUser) return;

  // ADMIN EDIT MODE
  if (selectedJob && currentUser.role === 'admin') {
    const updatedJob: Job = {
      ...selectedJob,
      ...jobData
    };

    handleEditJob(updatedJob);
    setSelectedJob(null);
    setView('home');
    return;
  }

  // LISTER CREATE MODE
  if (currentUser.role !== 'lister') return;

  const newJob: Job = {
    ...jobData,
    id: Date.now().toString(),
    listerId: currentUser.id,
    postedAt: new Date().toISOString()
  };

  const updatedJobs = [newJob, ...jobs];
  setJobs(updatedJobs);
  localStorage.setItem('jc_jobs', JSON.stringify(updatedJobs));
  setSelectedJob(null);
  setView('home');
};



// =======================
// ✅ VIEW APPLICANTS (ONLY ONE)
// =======================

const viewApplicants = (job: Job) => {
  const jobApps = applications.filter(app => app.jobId === job.id);
  setSelectedJob(job);
  setSelectedJobApplicants(jobApps);
  setView('applicants');
};
  // --- Components ---
  const Navbar = () => (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-indigo-600 p-2 rounded-lg mr-2">
              <Briefcase className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Career-Connect</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView('home')} className={`text-sm font-medium ${view === 'home' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>Browse Jobs</button>
            {currentUser && (
              <button onClick={() => setView('dashboard')} className={`text-sm font-medium ${view === 'dashboard' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}>Dashboard</button>
            )}
            <button 
  onClick={() => setView('about')} 
  className={`text-sm font-medium ${view === 'about' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
>
  About
</button>
<button 
  onClick={() => setView('roadmaps')} 
  className={`text-sm font-medium ${view === 'roadmaps' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'}`}
>
  Roadmaps
</button>
  {/* 📱 QR BUTTON */}
  <button
    onClick={() => setShowQR(true)}
    className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 transition"
  >
    📱 Open on Mobile
  </button>

            {(currentUser?.role === 'lister' || currentUser?.role === 'admin') && (
              
              <button onClick={() => setView('post-job')} className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center">
                <PlusCircle className="w-4 h-4 mr-2" />
                Post a Job
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">{currentUser.name}</span>
                </div>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button onClick={() => setView('login')} className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-4 py-2">Login</button>
                <button onClick={() => setView('signup')} className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">Join Now</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* --- Home View --- */}
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero Section */}
              <div className="mb-12 text-center max-w-3xl mx-auto">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight"
                >
                  Find your <span className="text-indigo-600">dream career</span> today.
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-gray-600 mb-10"
                >
                  Explore thousands of job opportunities from top companies and government departments all in one place.
                </motion.p>

                {/* Search Bar */}
                <div className="bg-white p-2 rounded-3xl shadow-2xl shadow-indigo-500/10 border border-gray-100 flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex-1 flex items-center px-4 w-full">
                    <Search className="text-gray-400 w-5 h-5 mr-3" />
                    <input 
                      type="text" 
                      placeholder="Job title, keywords, or company..."
                      className="w-full py-3 text-sm focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="h-8 w-px bg-gray-100 hidden sm:block"></div>
                  <div className="flex-1 flex items-center px-4 w-full">
                    <MapPin className="text-gray-400 w-5 h-5 mr-3" />
                    <input 
                      type="text" 
                      placeholder="Location..."
                      className="w-full py-3 text-sm focus:outline-none"
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                    />
                  </div>
                  <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all w-full sm:w-auto">
                    Search
                  </button>
                </div>

                {/* Filter Chips */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {['All', 'Private', 'Government'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type as any)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filterType === type ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'}`}
                    >
                      {type} Jobs
                    </button>
                  ))}
                </div>
              </div>

              {/* Job Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
<JobCard 
  key={job.id} 
  job={job} 
  currentUser={currentUser}
  savedJobs={savedJobs}
  applications={applications}
  onSave={handleSave}
  onViewDetails={(j) => { setSelectedJob(j); setView('job-details'); }}
  onViewApplicants={viewApplicants}
  onDelete={handleDeleteJob}
  onEdit={(job) => {
    setSelectedJob(job);
    setView('post-job');
  }}
/>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No jobs found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
{view === 'about' && (
  <motion.div
    key="about"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="max-w-6xl mx-auto"
  >
    

    {/* 🔥 HERO */}
    <div className="text-center mb-24 relative">
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        Discover Your Future with{" "}
        <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Career-Connect
        </span>
      </h1>

      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        A powerful platform connecting ambitious individuals with top companies. 
        Smarter hiring. Faster applications. Better careers.
      </p>
    </div>

    {/* 🔥 STATS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
      {[
        { label: "Jobs Posted", value: jobs.length, color: "from-indigo-500 to-indigo-700" },
        { label: "Applications", value: applications.length, color: "from-purple-500 to-purple-700" },
        { label: "Companies", value: "50+", color: "from-pink-500 to-pink-700" },
        { label: "Users", value: "100+", color: "from-blue-500 to-blue-700" }
      ].map((stat, i) => (
        <div 
          key={i} 
          className="rounded-2xl p-[1px] bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"
        >
          <div className="bg-white p-6 rounded-2xl text-center hover:scale-105 transition">
            <h2 className={`text-3xl font-extrabold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}>
              {stat.value}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>

    {/* 🔥 FEATURES */}
    <div className="grid md:grid-cols-3 gap-8 mb-24">
      
      <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-3xl border hover:shadow-2xl transition group">
        <div className="text-4xl mb-4">🚀</div>
        <h3 className="font-bold text-lg mb-2 text-indigo-600">
          Smart Job Search
        </h3>
        <p className="text-sm text-gray-500">
          Filter jobs instantly with advanced search and location-based results.
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-3xl border hover:shadow-2xl transition group">
        <div className="text-4xl mb-4">⚡</div>
        <h3 className="font-bold text-lg mb-2 text-purple-600">
          Quick Apply System
        </h3>
        <p className="text-sm text-gray-500">
          Apply in seconds and manage all your applications seamlessly.
        </p>
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-3xl border hover:shadow-2xl transition group">
        <div className="text-4xl mb-4">🛠</div>
        <h3 className="font-bold text-lg mb-2 text-pink-600">
          Powerful Admin Panel
        </h3>
        <p className="text-sm text-gray-500">
          Control, edit, and monitor job listings with advanced admin tools.
        </p>
      </div>

    </div>

    {/* 🔥 MISSION */}
    <div className="relative mb-24">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10 blur-2xl rounded-3xl"></div>

      <div className="bg-white p-12 rounded-3xl border text-center relative">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          To revolutionize hiring by making job discovery smarter, faster, and more accessible 
          for everyone — from freshers to professionals.
        </p>
      </div>
    </div>

    {/* 🔥 CTA */}
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Your Dream Job is Just One Click Away 🚀
      </h2>

      <button 
        onClick={() => setView('home')}
        className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white px-12 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all"
      >
        Explore Jobs
      </button>
    </div>

  </motion.div>
)}

// QR code 
{showQR && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

    {/* Modal */}
    <div className="bg-white rounded-3xl p-6 w-80 text-center shadow-2xl relative">

      {/* Close */}
      <button
        onClick={() => setShowQR(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-black text-lg"
      >
        ✕
      </button>

      <h3 className="text-lg font-bold text-gray-800 mb-2">
        Open on Mobile 📱
      </h3>

      <p className="text-xs text-gray-500 mb-4">
        Scan to access Career-Connect
      </p>

      <div className="flex justify-center">
        <div className="bg-white p-3 rounded-xl shadow">
          <QRCodeCanvas
            value="https://carrer-connect-woad.vercel.app/"
            size={160}
          />
        </div>
      </div>

    </div>
  </div>
)}
// Roadmap 
{view === 'roadmaps' && (
  <motion.div
    key="roadmaps"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative max-w-7xl mx-auto px-4 mt-12"
  >

    {/* 🔵 BACKGROUND */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-3xl"></div>

    {/* 🔵 HERO */}
    <div className="text-center mb-20">
      <h1 className="text-5xl font-extrabold mb-4 text-gray-900">
        Explore Your <span className="text-indigo-600">Career Roadmaps</span>
      </h1>
      <p className="text-gray-500 max-w-xl mx-auto">
        Structured learning paths designed to help you grow faster.
      </p>
    </div>

    {/* 🔵 CONTENT */}
    <div className="space-y-16">
      {ROADMAPS.map((section, index) => (
        <div key={index}>

          {/* CATEGORY */}
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            {section.category}
          </h2>

          {/* CARDS */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {section.items.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open(item.link, "_blank")}
                className="cursor-pointer rounded-2xl p-[1px] bg-gradient-to-r from-indigo-200 via-blue-200 to-indigo-200"
              >

                {/* 🔥 GLASS CARD */}
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 h-full border border-white/50 shadow-sm 
                                hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group">

                  {/* ICON */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-4 group-hover:bg-indigo-100 transition">
                    🧭
                  </div>

                  {/* TITLE */}
                  <h3 className="font-semibold text-gray-900 text-lg group-hover:text-indigo-600 transition">
                    {item.title}
                  </h3>

                  {/* SUBTEXT */}
                  <p className="text-sm text-gray-500 mt-2">
                    Click to view roadmap →
                  </p>

                </div>

              </motion.div>
            ))}
          </div>

        </div>
      ))}
    </div>

  </motion.div>
)}
          {/* --- Login View --- */}
          {view === 'login' && (
            <motion.div 
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto py-12"
            >
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
                <p className="text-gray-500 mb-8 text-sm">Enter your credentials to access your account.</p>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as any;
                  handleLogin(target.email.value, target.password.value);
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
                      <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm" placeholder="name@company.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Password</label>
                      <input name="password" type="password" required className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                      Sign In
                    </button>
                  </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-500">
                  Don't have an account? <button onClick={() => setView('signup')} className="text-indigo-600 font-bold hover:underline">Sign up</button>
                </p>
              </div>
            </motion.div>
          )}

          {/* --- Signup View --- */}
          {view === 'signup' && (
            <motion.div 
              key="signup"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto py-12"
            >
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create an account</h2>
                <p className="text-gray-500 mb-8 text-sm">Join JobConnect to start your journey.</p>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as any;
                  handleSignup(target.name.value, target.email.value, target.password.value, target.role.value);
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Name</label>
                      <input name="name" type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
                      <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm" placeholder="name@company.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Password</label>
                      <input name="password" type="password" required className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Account Type</label>
                      <select name="role" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm bg-white">
                        <option value="seeker">Job Seeker</option>
                        <option value="lister">Job Lister</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                      Create Account
                    </button>
                  </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-500">
                  Already have an account? <button onClick={() => setView('login')} className="text-indigo-600 font-bold hover:underline">Log in</button>
                </p>
              </div>
            </motion.div>
          )}

          {/* --- Job Details View --- */}
          {view === 'job-details' && selectedJob && (
            <motion.div 
              key="job-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button onClick={() => setView('home')} className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
              </button>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                <div className="p-8 sm:p-12">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                        {selectedJob.type === 'Government' ? <Building2 className="w-10 h-10 text-indigo-600" /> : <Briefcase className="w-10 h-10 text-indigo-600" />}
                      </div>
                      <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{selectedJob.title}</h2>
                        <div className="flex flex-wrap items-center gap-4 text-gray-500 font-medium">
                          <span className="flex items-center"><Building2 className="w-4 h-4 mr-1.5" /> {selectedJob.company}</span>
                          <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {selectedJob.location}</span>
                          <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${selectedJob.type === 'Government' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                            {selectedJob.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                      <span className="text-2xl font-bold text-indigo-600">{selectedJob.salary}</span>
                      <span className="text-xs text-gray-400">Posted on {new Date(selectedJob.postedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="prose prose-indigo max-w-none mb-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedJob.description}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
                    {currentUser?.role === 'seeker' && (
                      <>
                        <button 
                          onClick={() => handleApply(selectedJob)}
                          className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center"
                        >
                          {applications.find(app => app.jobId === selectedJob.id && app.seekerId === currentUser.id) ? (
                            <><CheckCircle className="w-5 h-5 mr-2" /> Applied</>
                          ) : 'Apply Now'}
                        </button>
                        <button 
                          onClick={() => handleSave(selectedJob.id)}
                          className={`flex-1 py-4 rounded-2xl font-bold border transition-all flex items-center justify-center ${savedJobs.includes(selectedJob.id) ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'}`}
                        >
                          <Bookmark className={`w-5 h-5 mr-2 ${savedJobs.includes(selectedJob.id) ? 'fill-current' : ''}`} />
                          {savedJobs.includes(selectedJob.id) ? 'Saved' : 'Save for Later'}
                        </button>
                      </>
                    )}
                    {!currentUser && (
                      <button 
                        onClick={() => setView('login')}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                      >
                        Login to Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- Dashboard View --- */}
          {view === 'dashboard' && currentUser && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Your Dashboard</h2>
                  <p className="text-gray-500">Welcome back, {currentUser.name}. Manage your {currentUser.role === 'seeker' ? 'applications' : 'job listings'} here.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl border border-gray-100 flex items-center space-x-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Role:</span>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{currentUser.role}</span>
                </div>
              </div>

              {currentUser.role === 'seeker' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Applied Jobs */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" /> Applied Jobs
                      </h3>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                        {applications.filter(app => app.seekerId === currentUser.id).length}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {applications.filter(app => app.seekerId === currentUser.id).map(app => {
                        const job = jobs.find(j => j.id === app.jobId);
                        return (
                          <div key={app.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center group hover:border-indigo-100 transition-all">
                            <div>
                              <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{app.jobTitle}</h4>
                              <p className="text-xs text-gray-500 mt-1">Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
                            </div>
                            {job && (
                              <button 
                                onClick={() => { setSelectedJob(job); setView('job-details'); }}
                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                      {applications.filter(app => app.seekerId === currentUser.id).length === 0 && (
                        <div className="bg-white border-2 border-dashed border-gray-100 rounded-2xl py-12 text-center">
                          <p className="text-gray-400 text-sm">You haven't applied to any jobs yet.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Saved Jobs */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <Bookmark className="w-5 h-5 mr-2 text-indigo-500" /> Saved Jobs
                      </h3>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                        {savedJobs.length}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {savedJobs.map(jobId => {
                        const job = jobs.find(j => j.id === jobId);
                        if (!job) return null;
                        return (
                          <div key={job.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center group hover:border-indigo-100 transition-all">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-indigo-50 transition-colors">
                                <Briefcase className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{job.title}</h4>
                                <p className="text-xs text-gray-500">{job.company}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleSave(job.id)}
                                className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <X className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => { setSelectedJob(job); setView('job-details'); }}
                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      {savedJobs.length === 0 && (
                        <div className="bg-white border-2 border-dashed border-gray-100 rounded-2xl py-12 text-center">
                          <p className="text-gray-400 text-sm">No saved jobs yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Lister Dashboard */
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Your Job Postings</h3>
                    <button onClick={() => setView('post-job')} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all flex items-center">
                      <PlusCircle className="w-4 h-4 mr-2" /> Post New Job
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {(currentUser.role === 'admin'
                      ? jobs
                      : jobs.filter(j => j.listerId === currentUser.id)
                      ).map(job => (
                      <JobCard 
                       key={job.id} 
                       job={job} 
                       currentUser={currentUser}
                       savedJobs={savedJobs}
                       applications={applications}
                       onSave={handleSave}
                       onViewDetails={(j) => { setSelectedJob(j); setView('job-details'); }}
                       onViewApplicants={viewApplicants}
                       onDelete={handleDeleteJob}
                       onEdit={(job) => {
                       setSelectedJob(job);
                       setView('post-job');
                       }}
                       />
                    ))}
                    {(currentUser.role === 'admin'
  ? jobs.length === 0
  : jobs.filter(j => j.listerId === currentUser.id).length === 0
) && (
                      <div className="col-span-full bg-white border-2 border-dashed border-gray-100 rounded-3xl py-20 text-center">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Briefcase className="text-gray-300" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">No jobs posted yet</h4>
                        <p className="text-gray-400 text-sm mb-6">Start hiring by posting your first job opening.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* --- Post Job View --- */}
          {view === 'post-job' && (currentUser?.role === 'lister' || currentUser?.role === 'admin') && (
            <motion.div 
              key="post-job"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Post a new job</h2>
                <p className="text-gray-500 mb-10 text-sm">Fill in the details below to attract the best candidates.</p>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as any;
                  handlePostJob({
                    title: target.title.value,
                    company: target.company.value,
                    location: target.location.value,
                    salary: target.salary.value,
                    type: target.type.value,
                    description: target.description.value
                  });
                }}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Job Title</label>
                        <input name="title" type="text" defaultValue={selectedJob?.title || ''} required className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm" placeholder="e.g. Software Engineer" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Company / Department</label>
                        <input name="company" defaultValue={selectedJob?.company || ''}  type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm" placeholder="e.g. Google" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Location</label>
                        <input name="location" defaultValue={selectedJob?.location || ''} type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm" placeholder="e.g. Remote or City, State" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Salary Range</label>
                        <input name="salary" defaultValue={selectedJob?.salary || ''} type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm" placeholder="e.g. $100k - $120k" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Job Type</label>
                      <select name="type" defaultValue={selectedJob?.type || 'Private'} className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm bg-white">
                        <option value="Private">Private</option>
                        <option value="Government">Government</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Job Description</label>
                      <textarea name="description" defaultValue={selectedJob?.description || ''} required rows={6} className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm resize-none" placeholder="Describe the role, requirements, and benefits..."></textarea>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button type="button" onClick={() => {
  setSelectedJob(null);
  setView('dashboard');
}} className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all">Cancel</button>
                      <button type="submit" className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">{selectedJob ? 'Update Job' : 'Post Job Opening'}</button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* --- Applicants View --- */}
          {view === 'applicants' && selectedJob && (
            <motion.div 
              key="applicants"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button onClick={() => {
  setSelectedJob(null);
  setView('dashboard');
}} className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
              </button>

              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Applicants for {selectedJob.title}</h2>
                <p className="text-gray-500">Review all candidates who have applied for this position.</p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Candidate</th>
                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Email</th>
                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Applied Date</th>
                        <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedJobApplicants.map(app => (
                        <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-8 py-6 border-b border-gray-50">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                {app.seekerName.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-bold text-gray-900">{app.seekerName}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 border-b border-gray-50 text-sm text-gray-500">{app.seekerEmail}</td>
                          <td className="px-8 py-6 border-b border-gray-50 text-sm text-gray-500">{new Date(app.appliedAt).toLocaleDateString()}</td>
                          <td className="px-8 py-6 border-b border-gray-50 text-right">
                            <button className="text-indigo-600 font-bold text-sm hover:underline">View Profile</button>
                          </td>
                        </tr>
                      ))}
                      {selectedJobApplicants.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-8 py-20 text-center text-gray-400 italic">
                            No applications received yet for this job.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center">
              <div className="bg-indigo-600 p-2 rounded-lg mr-2">
                <Briefcase className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">Career-Connect</span>
            </div>
            <div className="flex space-x-8 text-sm font-medium text-gray-500">
             <button onClick={() => setView('about')} className="hover:text-indigo-600 transition-colors">
  About Us
</button>
<a
  href="https://github.com/RV2574/Carrer-Connect"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-indigo-600 transition-colors"
>
GitHub
</a>
<a 
  href="https://mail.google.com/mail/?view=cm&fs=1&to=career.connect1001@gmail.com&su=Job Portal Query&body=Hello, I want to ask about..."
  target="_blank"
  className="hover:text-indigo-600 transition-colors"
>
  Contact
</a>
            </div>
            <div className="text-sm text-gray-400">
             All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      {/* ================= CHATBOT UI ================= */}
<div className="fixed bottom-6 right-6 z-50">

  {/* Button */}
  <button
    onClick={() => setShowChat(!showChat)}
    className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
  >
    💬
  </button>

{/* Chat Box */}
{showChat && (
  <div className="mt-3 w-80 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden">

    {/* 🔵 HEADER */}
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">
          🤖
        </div>
        <div>
          <p className="text-sm font-semibold">ZORA</p>
          <p className="text-[10px] opacity-80">Career Assistant</p>
        </div>
      </div>
      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
        Online
      </span>
    </div>

    {/* 🔵 MESSAGES */}
    <div className="h-64 overflow-y-auto space-y-3 px-3 py-4 bg-gradient-to-b from-white to-indigo-50">

      {messages.map((m, i) => (
        <div
          key={i}
          className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
        >

          {/* BOT MESSAGE */}
          {m.sender !== "user" && (
            <div className="flex items-start gap-2 max-w-[75%]">
              <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs">
                🤖
              </div>
              <div className="bg-white border border-gray-100 shadow-sm text-gray-700 px-3 py-2 rounded-2xl text-sm">
                {m.text}
              </div>
            </div>
          )}

          {/* USER MESSAGE */}
          {m.sender === "user" && (
            <div className="bg-indigo-600 text-white px-3 py-2 rounded-2xl text-sm max-w-[75%] shadow">
              {m.text}
            </div>
          )}

        </div>
      ))}

    </div>

    {/* 🔵 INPUT */}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.target as any;
        handleChat(input.msg.value);
        input.msg.value = "";
      }}
      className="flex items-center gap-2 p-3 border-t bg-white"
    >
      <input
        name="msg"
        placeholder="Ask ZORA..."
        className="flex-1 px-3 py-2 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white px-3 py-2 rounded-full hover:bg-indigo-700 transition"
      >
        ➤
      </button>
    </form>

  </div>
)}
</div>
    </div>
  );
}

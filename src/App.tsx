/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
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
 const [view, setView] = useState<'home' | 'login' | 'signup' | 'dashboard' | 'post-job' | 'job-details' | 'applicants' | 'about'>('home');
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

  // --- Persistence ---
  useEffect(() => {
    const storedJobs = localStorage.getItem('jc_jobs');
    const storedApps = localStorage.getItem('jc_apps');
    const storedSaved = localStorage.getItem('jc_saved');
    const storedUser = localStorage.getItem('jc_current_user');

    if (!storedJobs) {
      localStorage.setItem('jc_jobs', JSON.stringify(INITIAL_JOBS));
      setJobs(INITIAL_JOBS);
    } else {
      setJobs(JSON.parse(storedJobs));
    }

    if (storedApps) setApplications(JSON.parse(storedApps));
    if (storedSaved) setSavedJobs(JSON.parse(storedSaved));
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (jobs.length > 0) localStorage.setItem('jc_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('jc_apps', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('jc_saved', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('jc_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('jc_current_user');
    }
  }, [currentUser]);

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
                        <button onClick={() => setView('post-job')} className="text-indigo-600 font-bold hover:underline">Post a Job Now</button>
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
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
            <div className="text-sm text-gray-400">
             All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

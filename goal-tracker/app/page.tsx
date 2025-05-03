'use client';

import dayjs from 'dayjs';
import { motion, useInView } from 'framer-motion';
import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { Bell, Flag, BarChartBig, Target, Trophy, Medal, Award, CheckCircle } from "lucide-react";

const Home = () => {
  const [active, setActive] = useState("Landing");
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [goals, setGoals] = useState<Goal[]>(goalsData); // initial goals

  const navItems = ['Dashboard', 'Goals', 'Analytics'];

  return (
    <div>
      <Navbarhome />
      <hr className="border-t border-gray-700 my-4" />

      {active === "Landing" ? (<LandingPage active={active} setActive={setActive} />) : (<Navbar active={active} setActive={setActive} navItems={navItems} />)}

      {active === "Dashboard" && <Dashboard goalsData={goalsData} />}
      {active === "Goals" &&
        <Goals
          goals={goals}
          setGoals={setGoals}
          search={search}
          setSearch={setSearch}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedGoal={selectedGoal}
          setSelectedGoal={setSelectedGoal}
          showForm={showForm}
          setShowForm={setShowForm}
        />}
      {active === "Analytics" && <AnalyticsDashboard />}

      <hr className="border-t border-gray-700 my-4 max-w-7xl mx-auto" />

      <footer className="bg-black text-center py-6 border-t border-zinc-800 text-zinc-500 text-sm pb-4">
        © 2025 GoalTracker. All rights reserved.
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-zinc-500 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-zinc-500 hover:text-white">Terms of Service</a>
          <a href="#" className="text-zinc-500 hover:text-white">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

interface Comment {
  name: string;
  text: string;
  date: string;
}

interface Goal {
  title: string;
  description: string;
  due: string;
  progress: number;
  priority: string;
  status: string;
  comments?: Comment[];
  milestones?: string[];
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

const goalsData: Goal[] = [
  {
    title: 'Complete Website Redesign',
    description: 'Redesign the company website with modern UI/UX principles',
    due: 'Jun 30, 2023',
    progress: 65,
    priority: 'high',
    status: 'in-progress',
    comments: [],
    milestones: [],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-05-01T00:00:00Z',
    userId: 'user_001',
  },
  {
    title: 'Launch Mobile App',
    description: 'Develop and launch the company mobile app for iOS and Android',
    due: 'Aug 30, 2023',
    progress: 35,
    priority: 'high',
    status: 'on-hold',
    comments: [],
    milestones: [],
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-06-01T00:00:00Z',
    userId: 'user_001',
  },
  {
    title: 'Increase Physical Activity',
    description: 'Exercise for at least 30 minutes daily',
    due: 'Sep 30, 2023',
    progress: 40,
    priority: 'medium',
    status: 'in-progress',
    comments: [],
    milestones: [],
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2023-06-15T00:00:00Z',
    userId: 'user_002',
  },
  {
    title: 'Learn Spanish',
    description: 'Become conversational in Spanish for upcoming trip',
    due: 'Dec 01, 2023',
    progress: 0,
    priority: 'low',
    status: 'not-started',
    comments: [],
    milestones: [],
    createdAt: '2023-04-01T00:00:00Z',
    updatedAt: '2023-04-01T00:00:00Z',
    userId: 'user_003',
  },
  {
    title: 'Save for Down Payment',
    description: 'Save $50,000 for house down payment',
    due: 'Dec 31, 2024',
    progress: 28,
    priority: 'medium',
    status: 'in-progress',
    comments: [],
    milestones: [],
    createdAt: '2023-05-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    userId: 'user_004',
  },
  {
    title: 'Publish Blog Series',
    description: 'Write and publish a 5-part blog series on React performance',
    due: 'Mar 31, 2024',
    progress: 100,
    priority: 'medium',
    status: 'completed',
    comments: [],
    milestones: ['Outline topics', 'Drafts completed', 'Final review', 'Published'],
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-03-31T00:00:00Z',
    userId: 'user_001',
  },
  {
    title: 'Organize Team Retreat',
    description: 'Plan and organize a 3-day offsite team-building retreat',
    due: 'Oct 15, 2024',
    progress: 10,
    priority: 'low',
    status: 'not-started',
    comments: [],
    milestones: [],
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
    userId: 'user_002',
  },
  {
    title: 'Complete AWS Certification',
    description: 'Earn AWS Solutions Architect Associate certification',
    due: 'Nov 10, 2024',
    progress: 50,
    priority: 'high',
    status: 'in-progress',
    comments: [],
    milestones: ['Enroll in course', 'Complete training', 'Practice exams'],
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z',
    userId: 'user_003',
  },
  {
    title: 'Implement CI/CD Pipeline',
    description: 'Set up a complete CI/CD pipeline for all microservices',
    due: 'Jul 20, 2024',
    progress: 70,
    priority: 'high',
    status: 'in-progress',
    comments: [],
    milestones: ['Setup GitHub Actions', 'Dockerize apps', 'Deploy to staging'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-06-20T00:00:00Z',
    userId: 'user_001',
  },
  {
    title: 'Read 20 Books',
    description: 'Read at least 20 non-fiction books by the end of the year',
    due: 'Dec 31, 2024',
    progress: 15,
    priority: 'medium',
    status: 'in-progress',
    comments: [],
    milestones: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
    userId: 'user_002',
  },
  {
    title: 'Launch Newsletter',
    description: 'Launch a monthly newsletter for subscribers',
    due: 'May 15, 2024',
    progress: 100,
    priority: 'medium',
    status: 'completed',
    comments: [],
    milestones: ['Build mailing list', 'Design layout', 'Send first issue'],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-05-15T00:00:00Z',
    userId: 'user_003',
  },
  {
    title: 'Mentor New Intern',
    description: 'Guide and mentor the new software engineering intern',
    due: 'Sep 01, 2024',
    progress: 85,
    priority: 'low',
    status: 'in-progress',
    comments: [],
    milestones: [],
    createdAt: '2025-05-15T00:00:00Z',
    updatedAt: '2024-08-25T00:00:00Z',
    userId: 'user_004',
  },
  {
    title: 'Build Personal Portfolio',
    description: 'Create a modern, responsive portfolio site to showcase work',
    due: 'Jun 10, 2024',
    progress: 100,
    priority: 'high',
    status: 'completed',
    comments: [],
    milestones: ['Design mockup', 'Build frontend', 'Deploy to Vercel'],
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-06-10T00:00:00Z',
    userId: 'user_004',
  },
];

const priorityColorMap: Record<string, string> = {
  high: 'bg-red-600',
  medium: 'bg-yellow-700',
  low: 'bg-blue-600',
};

const statusColorMap: Record<string, string> = {
  'in-progress': 'bg-blue-700',
  'on-hold': 'bg-yellow-600',
  'not-started': 'bg-gray-700',
  'completed': 'bg-green-600',
};

const Navbarhome = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => setShowNotifications(!showNotifications);

  // Automatically close the notifications after 4 seconds
  useEffect(() => {
    if (showNotifications) {
      const timer = setTimeout(() => {
        setShowNotifications(false);
      }, 4000); // 4 seconds

      // Clean up the timer when the component unmounts or when notifications are closed manually
      return () => clearTimeout(timer);
    }
  }, [showNotifications]);

  return (
    <nav className="bg-[#111] max-w-7xl mx-auto text-white px-6 py-3 flex items-center justify-between shadow-md relative">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <Flag className="text-violet-500 w-5 h-5" />
        <span className="font-bold text-lg text-white">
          Goal<span className="text-gray-300">Tracker</span>
        </span>
      </div>

      {/* Right - Controls */}
      <div className="flex items-center gap-5">
        {/* Notifications */}
        <div className="relative">
          <Bell
            className="text-white hover:text-violet-500 cursor-pointer"
            size={20}
            onClick={toggleNotifications}
          />
          <span className="absolute -top-1 -right-1 bg-violet-600 text-xs text-white w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-[#123] text-white rounded-md shadow-lg z-10">
              <div className="p-3 border-b font-semibold">Notifications</div>
              <ul className="text-sm">
                <li className="p-3 hover:bg-gray-100 cursor-pointer">🎯 You reached your daily goal!</li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">📅 Upcoming task due tomorrow.</li>
                <li className="p-3 hover:bg-gray-100 cursor-pointer">✅ Task &quot;Write report&quot; marked as complete.</li>
              </ul>
            </div>
          )}
        </div>

        {/* User Avatar and Name */}
        <div className="flex items-center gap-2">
         
<Image
  src="https://randomuser.me/api/portraits/men/32.jpg"
  alt="User"
  className="rounded-full"
  width={32}
  height={32}
  unoptimized
/>
         
        </div>
      </div>
    </nav>
  );
};

interface NavbarProps {
  active: string;
  setActive: (item: string) => void;
  navItems: string[];
}

const Navbar= ({ active, setActive, navItems }: NavbarProps) => {
  return (
    <nav className="bg-[#111] px-8 max-w-7xl mx-auto">
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <motion.li
            key={item}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <button
              onClick={() => setActive(item)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${active === item
                ? 'bg-[#2b2b2b] text-white'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              {item}
            </button>
          </motion.li>
        ))}
      </ul>
      <hr className="border-t border-gray-700 my-4 max-w-7xl mx-auto" />
    </nav>
  );
};

interface LandingProps {
  active: string;
  setActive: (item: string) => void;
}

const LandingPage = ({ setActive }: LandingProps) => {
  const heroRef = useRef(null);
  const progressRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const progressInView = useInView(progressRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <div className="bg-black text-white min-h-screen font-sans max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-4"
      >
        <motion.h2
          whileHover={{ scale: 1.05 }}
          className="text-4xl font-extrabold text-white mb-4"
        >
          Track your goals. <span className="text-purple-500">Achieve more.</span>
        </motion.h2>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
          Stay organized, focused, and motivated with our powerful goal tracking system. Monitor your progress and celebrate your accomplishments.
        </p>
        <div className="space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive("Dashboard")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
          >
            Get Started
          </motion.button>
        </div>

        {/* Progress Bar Section */}
        <motion.div
          ref={progressRef}
          initial={{ opacity: 0, y: 50 }}
          animate={progressInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-zinc-900 rounded-xl p-6 mt-12 w-full max-w-lg mx-auto text-left"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Goal Progress</h3>
          <div className="space-y-3">
            {[
              { label: "Mobile Redesign", value: 72 },
              { label: "Launch System", value: 45 },
              { label: "Fitness Goals", value: 58 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full">
                  <div
                    className="h-2 bg-purple-600 rounded-full"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Key Features */}
      <motion.section
        ref={featuresRef}
        initial={{ opacity: 0, y: 50 }}
        animate={featuresInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="py-20 bg-zinc-950 px-4"
      >
        <h3 className="text-2xl font-bold text-center mb-12">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: <Target className="w-6 h-6 mb-3 text-purple-500" />,
              title: "Goal Tracking",
              description:
                "Set goals, monitor progress, and celebrate achievements with our intuitive interface.",
            },
            {
              icon: <BarChartBig className="w-6 h-6 mb-3 text-purple-500" />,
              title: "Analytics Dashboard",
              description:
                "Gain insights into your productivity patterns with detailed analytics.",
            },
            {
              icon: <Trophy className="w-6 h-6 mb-3 text-purple-500" />,
              title: "Achievement System",
              description:
                "Earn rewards and streaks as you accomplish more goals and milestones.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 text-white border border-zinc-800 p-6 rounded-lg"
            >
              {feature.icon}
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        initial={{ opacity: 0, y: 50 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center py-20 bg-zinc-900 px-4"
      >
        <h3 className="text-xl font-semibold mb-4">Ready to achieve your goals?</h3>
        <p className="text-zinc-400 mb-6">
          Join thousands of users who are accomplishing their dreams with GoalTracker.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActive("Dashboard")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
        >
          Get Started Now
        </motion.button>
      </motion.section>
    </div>
  );
};

const Dashboard = ({ goalsData }: { goalsData: Goal[] }) => {
  const COLORS = ['#4f46e5', '#06b6d4', '#f43f5e', '#f97316', '#8b5cf6'];

  const heroRef = useRef(null);
  const chartsRef = useRef(null);
  const summaryRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const chartsInView = useInView(chartsRef, { once: true, amount: 0.3 });
  const summaryInView = useInView(summaryRef, { once: true, amount: 0.3 });

  const statusCountData = Object.entries(
    goalsData.reduce((acc, goal) => {
      acc[goal.status] = (acc[goal.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([status, count]) => ({ status, count }));

  const stats = useMemo(() => {
    const now = dayjs();
    const endOfWeek = now.endOf('week');
    const completed = goalsData.filter(goal => goal.status === 'completed').length;
    const inProgress = goalsData.filter(goal => goal.status === 'in-progress').length;
    const upcomingDeadlines = goalsData.filter(goal => {
      const dueDate = dayjs(goal.due);
      return dueDate.isAfter(now) && dueDate.isBefore(endOfWeek);
    }).length;

    return {
      completed,
      inProgress,
      upcomingDeadlines,
      total: goalsData.length,
    };
  }, [goalsData]);

  const hoverEffect = "transition duration-300 transform hover:scale-105 hover:shadow-xl hover:border-indigo-500";

  return (
    <div className="min-h-screen flex-center max-w-7xl mx-auto bg-black text-white p-6 space-y-6 mb:p-15">
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="border-t border-gray-700 my-6" />
      </motion.div>

      <motion.div
        ref={summaryRef}
        initial={{ opacity: 0, y: 50 }}
        animate={summaryInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className={`bg-[#111] border border-gray-600 rounded-lg p-4 ${hoverEffect}`}>
          <div className="flex justify-between items-center mb-2">
            <h3>Goals Completed</h3>
            <span>✅</span>
          </div>
          <p className="text-3xl font-semibold">{stats.completed}</p>
          <p className="text-sm text-gray-400">Out of {stats.total} goals</p>
        </div>
        <div className={`bg-[#111] border border-gray-600 rounded-lg p-4 ${hoverEffect}`}>
          <div className="flex justify-between items-center mb-2">
            <h3>Tasks In Progress</h3>
            <span>🕒</span>
          </div>
          <p className="text-3xl font-semibold">{stats.inProgress}</p>
          <p className="text-sm text-gray-400">Working on current tasks</p>
        </div>
        <div className={`bg-[#111] border border-gray-600 rounded-lg p-4 ${hoverEffect}`}>
          <div className="flex justify-between items-center mb-2">
            <h3>Upcoming Deadlines</h3>
            <span>📅</span>
          </div>
          <p className="text-3xl font-semibold">{stats.upcomingDeadlines}</p>
          <p className="text-sm text-gray-400">Deadlines this week</p>
        </div>
      </motion.div>

      <motion.div
        ref={chartsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={chartsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className={`bg-[#111] border rounded-lg p-4 ${hoverEffect}`}>
          <h3 className="font-semibold mb-4">Goal Completion Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={goalsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={true} vertical={true} />
              <XAxis dataKey="title" tick={false} />
              <YAxis tick={{ fill: '#ccc', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#222', border: '1px solid #444', color: '#fff' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Bar dataKey="progress" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`bg-[#111] border rounded-lg p-4 ${hoverEffect}`}>
          <h3 className="font-semibold mb-4">Goals by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusCountData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
                nameKey="status"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {statusCountData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#222', border: '1px solid #444', color: '#fff' }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#fff' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ color: '#ccc' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};



type GoalsProps = {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedGoal: Goal | null;
  setSelectedGoal: React.Dispatch<React.SetStateAction<Goal | null>>;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};


const Goals: React.FC<GoalsProps> = ({
  goals,
  setGoals,
  search,
  setSearch,
  showModal,
  setShowModal,
  selectedGoal,
  setSelectedGoal,
  showForm,
  setShowForm
}) => {
  const [newGoal, setNewGoal] = useState<Goal>({
    title: '',
    description: '',
    due: '',
    progress: 0,
    priority: 'Medium',
    status: 'Not Started',
  });

  const addGoal = () => {
    if (!newGoal.title || !newGoal.description || !newGoal.due) return;
    setGoals([...goals, newGoal]);
    setNewGoal({
      title: '',
      description: '',
      due: '',
      progress: 0,
      priority: 'Medium',
      status: 'Not Started',
    });
    setShowForm(false);
  };

  const priorityOrder = { high: 1, medium: 2, low: 3 };

  const sortByDate = () => {
    const sorted = [...goals].sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime());
    setGoals(sorted);
  };

  const sortByPriority = () => {
    const sorted = [...goals].sort((a, b) =>
      priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
    );
    setGoals(sorted);
  };

  const sortByProgress = () => {
    const sorted = [...goals].sort((a, b) => a.progress - b.progress);
    setGoals(sorted);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    if (sortOption === 'date') sortByDate();
    if (sortOption === 'priority') sortByPriority();
    if (sortOption === 'progress') sortByProgress();
  };

  const filteredGoals = goals.filter((goal) =>
    goal.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleGoalUpdate = (updatedGoal: Goal) => {
    const updatedGoals = goals.map((goal) =>
      goal.title === selectedGoal?.title ? updatedGoal : goal
    );
    setGoals(updatedGoals);

    const index = goalsData.findIndex((goal) => goal.title === selectedGoal?.title);
    if (index !== -1) {
      goalsData[index] = updatedGoal;
    }

    setSelectedGoal(updatedGoal);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 text-white pb-80 bg-black">
      <motion.div>
      <h2 className="text-2xl font-bold mb-4">Your Goals</h2>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div className="flex items-center bg-[#1b1b1b] px-3 py-2 rounded-md w-72">
          <input
            type="text"
            placeholder="Search goals..."
            className="bg-transparent outline-none text-white w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-md text-sm font-medium"
          >
            + Add New Goal
          </button>

          <select
            onChange={handleSortChange}
            className="bg-[#111] text-white px-4 py-2 rounded-md"
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="priority">Priority</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1e1e1e] p-4 rounded-lg mb-6 space-y-3 max-w-3xl mx-auto"
        >
          <input
            type="text"
            placeholder="Title"
            className="w-full px-3 py-2 rounded-md bg-[#111] text-white"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full px-3 py-2 rounded-md bg-[#111] text-white"
            value={newGoal.description}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          />
          <input
            type="date"
            className="w-full px-3 py-2 rounded-md bg-[#111] text-white"
            value={newGoal.due}
            onChange={(e) => setNewGoal({ ...newGoal, due: e.target.value })}
          />
          <div className="flex gap-4">
            <select
              className="bg-[#111] text-white px-4 py-2 rounded-md"
              value={newGoal.priority}
              onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select
              className="bg-[#111] text-white px-4 py-2 rounded-md"
              value={newGoal.status}
              onChange={(e) => setNewGoal({ ...newGoal, status: e.target.value })}
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>On Hold</option>
              <option>Completed</option>
            </select>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={newGoal.progress}
            onChange={(e) => setNewGoal({ ...newGoal, progress: Number(e.target.value) })}
            className="w-full accent-violet-500"
          />
          <button
            onClick={addGoal}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md text-sm font-medium"
          >
            Add Goal
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGoals.map((goal, idx) => (
          <motion.div
            key={idx}
            onClick={() => {
              setSelectedGoal(goal);
              setShowModal(true);
            }}
            className="bg-[#111] border border-gray-700 rounded-lg p-4 relative shadow-sm cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t-2 border-violet-500 rounded-t-md mb-3 -mt-4"></div>
            <div className="mb-2">
              <h3 className="font-bold text-lg">{goal.title}</h3>
              <p className="text-sm text-gray-400">{goal.description}</p>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              <span className="text-white font-medium">Due:</span> {goal.due}
            </p>
            <div className="h-2 w-full bg-gray-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-violet-500" style={{ width: `${goal.progress}%` }}></div>
            </div>
            <p className="text-sm text-gray-400 mt-1">Progress: {goal.progress}%</p>
            <div className="flex gap-2 mt-3">
              <span className={`text-xs text-white px-2 py-1 rounded-full ${priorityColorMap[goal.priority]}`}>
                {goal.priority} Priority
              </span>
              <span className={`text-xs text-white px-2 py-1 rounded-full ${statusColorMap[goal.status]}`}>
                {goal.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && selectedGoal && (
        <GoalModal
          onClose={() => setShowModal(false)}
          handleGoalUpdate={handleGoalUpdate}
          goal={selectedGoal}
          onUpdate={handleGoalUpdate}
        />
      )}
      </motion.div>
    </div>
  );
};


type GoalModalProps = {
  goal: Goal;
  onClose: () => void;
  onUpdate: (updatedGoal: Goal) => void;
  handleGoalUpdate: (updatedGoal: Goal) => void;
};

const GoalModal: React.FC<GoalModalProps> = ({ goal, onClose, onUpdate, handleGoalUpdate }) => {
  const [editedGoal, setEditedGoal] = useState<Goal>(goal);

  useEffect(() => {
    setEditedGoal(goal);
  }, [goal]);

  const handleChange = (field: keyof Goal, value: string | number) => {
    setEditedGoal((prev) => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSave = () => {
    onUpdate(editedGoal);
    handleGoalUpdate(editedGoal); // Update the global goalsData array (in-place)
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Goal</h2>

        {/* Title */}
        <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">Title</label>
        <input
          type="text"
          value={editedGoal.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />

        {/* Description */}
        <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          value={editedGoal.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />

        {/* Priority */}
        <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">Priority</label>
        <select
          value={editedGoal.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Status */}
        <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">Status</label>
        <select
          value={editedGoal.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Progress Slider */}
        <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">Progress: {editedGoal.progress}%</label>
        <input
          type="range"
          min={0}
          max={100}
          value={editedGoal.progress}
          onChange={(e) => handleChange('progress', Number(e.target.value))}
          className="w-full mb-4 accent-violet-500"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};


const AnalyticsDashboard = () => {
  return (
    <div className="bg-black text-white min-h-screen p-6 font-sans max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

      {/* Chart */}
      <motion.div
        className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-lg font-semibold mb-4">Time Spent on Goals</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={goalsData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="title" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#1c1c1c', borderColor: '#444' }} />
            <Line type="monotone" dataKey="progress" stroke="#a855f7" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-xl font-semibold mb-6">Your Achievements</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            className="border border-zinc-800 bg-zinc-900 p-4 rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Medal className="text-yellow-400 w-5 h-5 mb-2" />
            <h4 className="font-semibold">Early Bird</h4>
            <p className="text-zinc-400 text-sm">Complete 5 goals before their due date.</p>
          </motion.div>
          <motion.div
            className="border border-zinc-800 bg-zinc-900 p-4 rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Award className="text-zinc-300 w-5 h-5 mb-2" />
            <h4 className="font-semibold">Productivity Master</h4>
            <p className="text-zinc-400 text-sm">Complete 10 goals in a month.</p>
          </motion.div>
          <motion.div
            className="border border-zinc-800 bg-zinc-900 p-4 rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="text-orange-400 w-5 h-5 mb-2" />
            <h4 className="font-semibold">Consistent Achiever</h4>
            <p className="text-zinc-400 text-sm">Maintain a goal completion rate of 75% for 3 months.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};




const Page = () => {
  return (
    <Home />
  );
}

export default Page;
'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart,
  Line,

  CartesianGrid,
} from 'recharts';
import { X, Bell, Flag, Moon, Sun, BarChartBig, Target, Trophy, Medal, Award, CheckCircle } from "lucide-react";
export const Home = () => {
  const [active, setActive] = useState("Dashboard");

  const navItems = ['Dashboard', 'Goals', 'Analytics'];
  return (
    <div>
      <Navbarhome />
      <hr className="border-t border-gray-700 my-4" />
      {active === "Landing" ? (<LandingPage />) : (<Navbar active={active} setActive={setActive} navItems={navItems} />)}
      <hr className="border-t border-gray-700 my-4 max-w-7xl mx-auto" />

      {active == "Dashboard" && <Dashboard />}
      {active == "Goals" && <Goals />}
      {active == "Analytics" && <AnalyticsDashboard />}




    </div>
  );
}



const Navbarhome = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <nav className="bg-[#0d0d0d] max-w-7xl mx-auto  text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <Flag className="text-violet-500 w-5 h-5" />
        <span className="font-bold text-lg text-white">Goal<span className="text-gray-300">Tracker</span></span>
      </div>

      {/* Right - Controls */}
      <div className="flex items-center gap-5">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="text-white hover:text-violet-500 transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <Bell className="text-white hover:text-violet-500" size={20} />
          <span className="absolute -top-1 -right-1 bg-violet-600 text-xs text-white w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* User Avatar and Name */}
        <div className="flex items-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-yellow-200">Alex Johnson</span>
        </div>
      </div>
    </nav>
  );
}

interface NavbarProps {
  active: string;
  setActive: (item: string) => void;
  navItems: string[];
}

const Navbar: React.FC<NavbarProps> = ({ active, setActive, navItems }) => {
  return (
    <nav className="bg-[#0c0c0c] px-8  max-w-7xl mx-auto ">
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item}>
            <button
              onClick={() => setActive(item)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${active === item
                  ? "bg-[#2b2b2b] text-white"
                  : "text-gray-400 hover:text-white"
                }`}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const LandingPage = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans max-w-7xl mx-auto">


      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Track your goals. <span className="text-purple-500">Achieve more.</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
          Stay organized, focused, and motivated with our powerful goal tracking system. Monitor your progress and celebrate your accomplishments.
        </p>
        <div className="space-x-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">Get Started</button>
          <button className="border border-zinc-700 text-white hover:bg-zinc-800 px-6 py-2 rounded-md">Learn More</button>
        </div>

        {/* Progress Bar Section */}
        <div className="bg-zinc-900 rounded-xl p-6 mt-12 w-full max-w-lg mx-auto text-left">
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
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-zinc-950 px-4">
        <h3 className="text-2xl font-bold text-center mb-12">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-zinc-900 text-white border border-zinc-800 p-6 rounded-lg">
            <Target className="w-6 h-6 mb-3 text-purple-500" />
            <h4 className="text-lg font-semibold mb-2">Goal Tracking</h4>
            <p className="text-sm text-zinc-400">
              Set goals, monitor progress, and celebrate achievements with our intuitive interface.
            </p>
          </div>

          <div className="bg-zinc-900 text-white border border-zinc-800 p-6 rounded-lg">
            <BarChartBig className="w-6 h-6 mb-3 text-purple-500" />
            <h4 className="text-lg font-semibold mb-2">Analytics Dashboard</h4>
            <p className="text-sm text-zinc-400">
              Gain insights into your productivity patterns with detailed analytics.
            </p>
          </div>

          <div className="bg-zinc-900 text-white border border-zinc-800 p-6 rounded-lg">
            <Trophy className="w-6 h-6 mb-3 text-purple-500" />
            <h4 className="text-lg font-semibold mb-2">Achievement System</h4>
            <p className="text-sm text-zinc-400">
              Earn rewards and streaks as you accomplish more goals and milestones.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 bg-zinc-900 px-4">
        <h3 className="text-xl font-semibold mb-4">Ready to achieve your goals?</h3>
        <p className="text-zinc-400 mb-6">
          Join thousands of users who are accomplishing their dreams with GoalTracker.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">Get Started Now</button>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center py-6 border-t border-zinc-800 text-zinc-500 text-sm">
        © 2025 GoalTracker. All rights reserved.
      </footer>
    </div>
  );
};




const Dashboard = () => {
  const [goalData, setGoalData] = useState([
    { name: 'Complete Website Redesign', progress: 65 },
    { name: 'Learn Spanish', progress: 40 },
    { name: 'Save for Down Payment', progress: 35 },
  ]);

  const [categoryData, setCategoryData] = useState([
    { name: 'work', value: 65 },
    { name: 'health', value: 40 },
    { name: 'education', value: 0 },
    { name: 'finance', value: 28 },
    { name: 'work', value: 35 },
  ]);

  const COLORS = ['#4f46e5', '#06b6d4', '#f43f5e', '#f97316', '#8b5cf6'];
  return (

    <div className="min-h-screen flex-center  max-w-7xl mx-auto bg-black text-white p-6 space-y-6 mb:p-15">

      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      <div className="border-t border-gray-700 my-6" />


      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111] border border-gray-600 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3>Goals Completed</h3>
            <span>✅</span>
          </div>
          <p className="text-3xl font-semibold">12</p>
          <p className="text-sm text-gray-400">Out of 20 goals</p>
        </div>
        <div className="bg-[#111] border border-gray-600 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3>Tasks In Progress</h3>
            <span>🕒</span>
          </div>
          <p className="text-3xl font-semibold">8</p>
          <p className="text-sm text-gray-400">Working on current tasks</p>
        </div>
        <div className="bg-[#111] border border-gray-600 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3>Upcoming Deadlines</h3>
            <span>📅</span>
          </div>
          <p className="text-3xl font-semibold">3</p>
          <p className="text-sm text-gray-400">Deadlines this week</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <div className="bg-[#111] border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Goal Completion Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={goalData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#a78bfa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#111] border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Goals by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

  );
}



const goalsData = [
  {
    title: 'Complete Website Redesign',
    description: 'Redesign the company website with modern UI/UX principles',
    due: 'Jun 30, 2023',
    progress: 65,
    priority: 'high',
    status: 'in-progress',
  },
  {
    title: 'Launch Mobile App',
    description: 'Develop and launch the company mobile app for iOS and Android',
    due: 'Aug 30, 2023',
    progress: 35,
    priority: 'high',
    status: 'on-hold',
  },
  {
    title: 'Increase Physical Activity',
    description: 'Exercise for at least 30 minutes daily',
    due: 'Sep 30, 2023',
    progress: 40,
    priority: 'medium',
    status: 'in-progress',
  },
  {
    title: 'Learn Spanish',
    description: 'Become conversational in Spanish for upcoming trip',
    due: 'Dec 01, 2023',
    progress: 0,
    priority: 'low',
    status: 'not-started',
  },
  {
    title: 'Save for Down Payment',
    description: 'Save $50,000 for house down payment',
    due: 'Dec 31, 2024',
    progress: 28,
    priority: 'medium',
    status: 'in-progress',
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
};

type Goal = {
  title: string;
  description: string;
  due: string;
  progress: number;
  priority: string;
  status: string;
};

const Goals = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [goals, setGoals] = useState(goalsData);

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

  const filteredGoals = goals.filter((goal) =>
    goal.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
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
        </div>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <div className="bg-[#1e1e1e] p-4 rounded-lg mb-6 space-y-3">
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
        </div>
      )}

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGoals.map((goal, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedGoal(goal);
              setShowModal(true);
            }}
            className="bg-[#111] border border-gray-700 rounded-lg p-4 relative shadow-sm cursor-pointer"
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
          </div>
        ))}
      </div>

      {showModal && selectedGoal && (
        <GoalModal onClose={() => setShowModal(false)} goal={selectedGoal} />
      )}
    </div>
  );
}



interface GoalModalProps {
  goal: any;
  onClose: () => void;
}

const GoalModal: React.FC<GoalModalProps> = ({ goal, onClose }) => {
  const [status, setStatus] = useState(goal.status || 'In Progress');
  const [progress, setProgress] = useState(goal.progress || 0);
  const [milestones, setMilestones] = useState([
    { text: 'Wireframes approved', date: 'May 25', done: true },
    { text: 'Homepage design complete', date: 'Jun 10', done: true },
    { text: 'Frontend development', date: 'Jun 20', done: false }
  ]);
  const [newMilestone, setNewMilestone] = useState('');
  const [comments, setComments] = useState([
    {
      name: 'Alex Johnson',
      text: 'The wireframes look great! Ready to move to the next phase.',
      date: 'May 25, 12:00 AM'
    },
    {
      name: 'Emma Wilson',
      text: "I've completed the homepage design, please review.",
      date: 'Jun 10, 12:00 AM'
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const addMilestone = () => {
    if (newMilestone.trim()) {
      setMilestones([...milestones, { text: newMilestone, date: 'TBD', done: false }]);
      setNewMilestone('');
    }
  };

  const toggleMilestone = (index: number) => {
    const updated = [...milestones];
    updated[index].done = !updated[index].done;
    setMilestones(updated);
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          name: 'You',
          text: newComment,
          date: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      ]);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#111] text-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-1">{goal.title}</h2>
        <p className="text-sm text-gray-400 mb-4">{goal.description}</p>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Status & Progress</h3>
          <div className="flex items-center justify-between gap-2 mb-2">
            <select
              className="bg-[#1e1e1e] px-3 py-2 rounded-md text-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>On Hold</option>
              <option>Completed</option>
            </select>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Progress: {progress}%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="accent-violet-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Milestones</h3>
          {milestones.map((m, idx) => (
            <div key={idx} className="flex items-center justify-between mb-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={m.done} onChange={() => toggleMilestone(idx)} />
                <span className={m.done ? 'line-through text-gray-500' : ''}>{m.text}</span>
              </label>
              <span className="text-sm text-gray-500">{m.date}</span>
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add new milestone..."
              value={newMilestone}
              onChange={(e) => setNewMilestone(e.target.value)}
              className="flex-grow px-3 py-2 rounded-md bg-[#1e1e1e] text-white"
            />
            <button
              onClick={addMilestone}
              className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Comments</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto mb-2">
            {comments.map((c, idx) => (
              <div key={idx} className="bg-[#1a1a1a] p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-xs text-gray-500">{c.date}</span>
                </div>
                <p className="text-sm text-gray-300">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow px-3 py-2 rounded-md bg-[#1e1e1e] text-white"
            />
            <button
              onClick={addComment}
              className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const data = [
  { name: "Increase Physical Activity", progress: 65 },
  { name: "Learn Spanish", progress: 40 },
  { name: "Launch Mobile App", progress: 35 },
  { name: "Save for Down Payment", progress: 28 },
];

const AnalyticsDashboard = () => {
  return (
    <div className="bg-black text-white min-h-screen p-6 font-sans max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

      {/* Chart */}
      <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 mb-12">
        <h3 className="text-lg font-semibold mb-4">Time Spent on Goals</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#1c1c1c', borderColor: '#444' }} />
            <Line type="monotone" dataKey="progress" stroke="#a855f7" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Your Achievements</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-zinc-800 bg-zinc-900 p-4 rounded-lg">
            <Medal className="text-yellow-400 w-5 h-5 mb-2" />
            <h4 className="font-semibold">Early Bird</h4>
            <p className="text-zinc-400 text-sm">Complete 5 goals before their due date.</p>
          </div>
          <div className="border border-zinc-800 bg-zinc-900 p-4 rounded-lg">
            <Award className="text-zinc-300 w-5 h-5 mb-2" />
            <h4 className="font-semibold">Productivity Master</h4>
            <p className="text-zinc-400 text-sm">Complete 10 goals in a month.</p>
          </div>
          <div className="border border-zinc-800 bg-zinc-900 p-4 rounded-lg">
            <CheckCircle className="text-orange-400 w-5 h-5 mb-2" />
            <h4 className="font-semibold">Consistent Achiever</h4>
            <p className="text-zinc-400 text-sm">Maintain a goal completion rate of 75% for 3 months.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Home;
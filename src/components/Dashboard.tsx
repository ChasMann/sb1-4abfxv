import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for the chart
  const data = [
    { name: 'Jan', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 2000, expenses: 9800 },
    { name: 'Apr', income: 2780, expenses: 3908 },
    { name: 'May', income: 1890, expenses: 4800 },
    { name: 'Jun', income: 2390, expenses: 3800 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4CAF50" />
            <Bar dataKey="expenses" fill="#F44336" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
        <div className="flex items-center">
          <AlertCircle className="h-6 w-6 text-yellow-500 mr-2" />
          <p className="font-semibold">Disability Limit Warning</p>
        </div>
        <p className="mt-2">You are projected to go over your disability limit by $250 this month. Consider adjusting your spending to stay under the legal limit.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Checking Balance</h3>
          <p className="text-2xl font-bold text-green-600">$2,450.75</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Savings Balance</h3>
          <p className="text-2xl font-bold text-blue-600">$10,230.50</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Credit Card Balance</h3>
          <p className="text-2xl font-bold text-red-600">-$520.30</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
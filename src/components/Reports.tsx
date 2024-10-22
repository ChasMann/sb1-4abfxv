import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Reports: React.FC = () => {
  const yearlyExpenses = [
    { name: 'Housing', value: 12000 },
    { name: 'Transportation', value: 5000 },
    { name: 'Food', value: 6000 },
    { name: 'Utilities', value: 3000 },
    { name: 'Healthcare', value: 4000 },
    { name: 'Entertainment', value: 2000 },
    { name: 'Other', value: 3000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFA07A'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Yearly Expenses Breakdown</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={yearlyExpenses}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {yearlyExpenses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Yearly Expenses Summary</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Category</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {yearlyExpenses.map((expense, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{expense.name}</td>
                <td className="p-2">${expense.value.toLocaleString()}</td>
                <td className="p-2">
                  {((expense.value / yearlyExpenses.reduce((sum, e) => sum + e.value, 0)) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
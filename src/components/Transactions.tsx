import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-03-15', description: 'Grocery Store', amount: -120.50, account: 'Checking', payee: 'Walmart' },
    { id: 2, date: '2024-03-14', description: 'Salary Deposit', amount: 2000, account: 'Checking', payee: 'Employer Inc.' },
    { id: 3, date: '2024-03-13', description: 'Electric Bill', amount: -85.20, account: 'Credit Card', payee: 'Power Company' },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    amount: '',
    account: '',
    payee: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transaction = {
      id: transactions.length + 1,
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
    };
    setTransactions([transaction, ...transactions]);
    setNewTransaction({ date: '', description: '', amount: '', account: '', payee: '' });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transactions</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border rounded p-2"
            required
          />
          <input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            className="border rounded p-2"
            required
          />
          <select
            name="account"
            value={newTransaction.account}
            onChange={handleInputChange}
            className="border rounded p-2"
            required
          >
            <option value="">Select Account</option>
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
            <option value="Credit Card">Credit Card</option>
          </select>
          <input
            type="text"
            name="payee"
            value={newTransaction.payee}
            onChange={handleInputChange}
            placeholder="Payee"
            className="border rounded p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Transaction
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Date</th>
                <th className="p-2">Description</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Account</th>
                <th className="p-2">Payee</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-2">{transaction.date}</td>
                  <td className="p-2">{transaction.description}</td>
                  <td className={`p-2 ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td className="p-2">{transaction.account}</td>
                  <td className="p-2">{transaction.payee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
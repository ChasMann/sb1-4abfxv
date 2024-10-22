import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

interface Account {
  id: number;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
}

const Configuration: React.FC = () => {
  const [config, setConfig] = useState({
    disabilityLimit: 2000,
    autoMatchRules: [
      { id: 1, payee: 'Netflix', amountMin: 10, amountMax: 20, dateRange: '1-5' },
      { id: 2, payee: 'Gym Membership', amountMin: 40, amountMax: 50, dateRange: '15-20' },
    ],
  });

  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: 'Main Checking', type: 'checking', balance: 1000 },
    { id: 2, name: 'Savings', type: 'savings', balance: 5000 },
    { id: 3, name: 'Credit Card', type: 'credit', balance: -500 },
  ]);

  const [newAccount, setNewAccount] = useState<Omit<Account, 'id'>>({
    name: '',
    type: 'checking',
    balance: 0,
  });

  const [newRule, setNewRule] = useState({
    payee: '',
    amountMin: '',
    amountMax: '',
    dateRange: '',
  });

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleRuleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRule(prev => ({ ...prev, [name]: value }));
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: name === 'balance' ? parseFloat(value) : value }));
  };

  const addRule = () => {
    const rule = {
      id: config.autoMatchRules.length + 1,
      ...newRule,
      amountMin: parseFloat(newRule.amountMin),
      amountMax: parseFloat(newRule.amountMax),
    };
    setConfig(prev => ({
      ...prev,
      autoMatchRules: [...prev.autoMatchRules, rule],
    }));
    setNewRule({ payee: '', amountMin: '', amountMax: '', dateRange: '' });
  };

  const removeRule = (id: number) => {
    setConfig(prev => ({
      ...prev,
      autoMatchRules: prev.autoMatchRules.filter(rule => rule.id !== id),
    }));
  };

  const addAccount = () => {
    const account = {
      id: accounts.length + 1,
      ...newAccount,
    };
    setAccounts(prev => [...prev, account]);
    setNewAccount({ name: '', type: 'checking', balance: 0 });
  };

  const removeAccount = (id: number) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configuration</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Disability Limit</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="disabilityLimit" className="font-medium">Monthly Limit:</label>
          <input
            type="number"
            id="disabilityLimit"
            name="disabilityLimit"
            value={config.disabilityLimit}
            onChange={handleConfigChange}
            className="border rounded p-2"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            value={newAccount.name}
            onChange={handleAccountChange}
            placeholder="Account Name"
            className="border rounded p-2"
          />
          <select
            name="type"
            value={newAccount.type}
            onChange={handleAccountChange}
            className="border rounded p-2"
          >
            <option value="checking">Checking</option>
            <option value="savings">Savings</option>
            <option value="credit">Credit</option>
          </select>
          <input
            type="number"
            name="balance"
            value={newAccount.balance}
            onChange={handleAccountChange}
            placeholder="Initial Balance"
            className="border rounded p-2"
          />
          <button
            onClick={addAccount}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Account
          </button>
        </div>

        <table className="w-full text-left mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Type</th>
              <th className="p-2">Balance</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (
              <tr key={account.id} className="border-b">
                <td className="p-2">{account.name}</td>
                <td className="p-2 capitalize">{account.type}</td>
                <td className="p-2">${account.balance.toFixed(2)}</td>
                <td className="p-2">
                  <button
                    onClick={() => removeAccount(account.id)}
                    className="text-red-600 hover:text-red-800 flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Auto-Match Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="payee"
            value={newRule.payee}
            onChange={handleRuleChange}
            placeholder="Payee"
            className="border rounded p-2"
          />
          <input
            type="number"
            name="amountMin"
            value={newRule.amountMin}
            onChange={handleRuleChange}
            placeholder="Min Amount"
            className="border rounded p-2"
          />
          <input
            type="number"
            name="amountMax"
            value={newRule.amountMax}
            onChange={handleRuleChange}
            placeholder="Max Amount"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="dateRange"
            value={newRule.dateRange}
            onChange={handleRuleChange}
            placeholder="Date Range (e.g., 1-5)"
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={addRule}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Rule
        </button>

        <table className="w-full text-left mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Payee</th>
              <th className="p-2">Min Amount</th>
              <th className="p-2">Max Amount</th>
              <th className="p-2">Date Range</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {config.autoMatchRules.map(rule => (
              <tr key={rule.id} className="border-b">
                <td className="p-2">{rule.payee}</td>
                <td className="p-2">${rule.amountMin}</td>
                <td className="p-2">${rule.amountMax}</td>
                <td className="p-2">{rule.dateRange}</td>
                <td className="p-2">
                  <button
                    onClick={() => removeRule(rule.id)}
                    className="text-red-600 hover:text-red-800 flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 flex items-center">
        <Save className="h-5 w-5 mr-2" />
        Save Configuration
      </button>
    </div>
  );
};

export default Configuration;
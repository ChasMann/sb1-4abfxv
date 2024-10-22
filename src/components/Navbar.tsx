import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <DollarSign className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl">Moneyminder</span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link>
            <Link to="/transactions" className="hover:bg-blue-700 px-3 py-2 rounded">Transactions</Link>
            <Link to="/reports" className="hover:bg-blue-700 px-3 py-2 rounded">Reports</Link>
            <Link to="/configuration" className="hover:bg-blue-700 px-3 py-2 rounded">Configuration</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
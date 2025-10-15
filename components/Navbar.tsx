import React from 'react';
import { BarChart3, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-td-navy text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4">
        <BarChart3 className="w-8 h-8" />
        <div>
          <h1 className="text-xl font-bold">Treasure Data</h1>
          <p className="text-xs text-gray-300">Marketing Intelligence AI Agent</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="hover:text-td-teal transition">Dashboard</button>
        <button className="hover:text-td-teal transition">Insights</button>
        <button className="hover:text-td-teal transition">Campaigns</button>
        <button className="bg-td-teal px-4 py-2 rounded font-semibold hover:bg-cyan-600 transition">
          AI Agent (Beta)
        </button>
        <div className="flex items-center space-x-2 ml-4">
          <User className="w-6 h-6" />
          <span className="text-sm">Demo User</span>
        </div>
      </div>
    </nav>
  );
}

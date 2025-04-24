// app/audit/page.tsx
"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getTabColor = (tab: string) => {
    switch(tab) {
      case 'general':
        return 'bg-green-500';
      case 'advanced':
        return 'bg-amber-500';
      case 'aggressive':
        return 'bg-purple-600';
      default:
        return 'bg-green-500';
    }
  };

  const getContainerColor = () => {
    switch(activeTab) {
      case 'general':
        return 'from-green-500 to-green-700';
      case 'advanced':
        return 'from-amber-500 to-amber-700';
      case 'aggressive':
        return 'from-purple-600 to-purple-800';
      default:
        return 'from-green-500 to-green-700';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3000/api/audit/general', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, username, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      // Handle successful audit
      console.log(data);
      
      // Handle PDF download from blob
      if (data.data && data.data.pdfBuffer) {
        // Convert base64 to binary
        const binaryString = window.atob(data.data.pdfBuffer);
        const bytes = new Uint8Array(binaryString.length);
        
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Create blob from binary data
        const blob = new Blob([bytes], { type: 'application/pdf' });
        
        // Create URL for the blob
        const pdfUrl = URL.createObjectURL(blob);
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `website-audit-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(pdfUrl);
      }
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Tabs container with iPhone notch style */}
        <div className="relative max-w-md mx-auto mb-8">
          <div className="flex justify-center">
            <div className="bg-gray-800 rounded-full px-2 py-1 flex items-center space-x-1 shadow-lg">
              {/* Notch */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-gray-800 rounded-b-xl"></div>
              
              <button
                onClick={() => handleTabChange('general')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${activeTab === 'general' ? `${getTabColor('general')} text-white` : 'text-gray-400'}`}
              >
                General
              </button>
              <button
                onClick={() => handleTabChange('advanced')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${activeTab === 'advanced' ? `${getTabColor('advanced')} text-white` : 'text-gray-400'}`}
              >
                Advanced
              </button>
              <button
                onClick={() => handleTabChange('aggressive')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${activeTab === 'aggressive' ? `${getTabColor('aggressive')} text-white` : 'text-gray-400'}`}
              >
                Aggressive
              </button>
            </div>
          </div>
        </div>
        
        {/* Main container */}
        <div className={`max-w-lg mx-auto bg-gradient-to-br ${getContainerColor()} rounded-xl shadow-2xl p-8 transition-all duration-500`}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Website Audit</h1>
            <p className="text-white text-opacity-80">
              There's nothing you can't automate with our audit tool.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-white font-medium mb-2">Website URL</label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                required
                className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            
            <div>
              <label htmlFor="username" className="block text-white font-medium mb-2">Username (Optional)</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username"
                className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-white font-medium mb-2">Password (Optional)</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full px-4 py-3 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            
            {error && (
              <div className="bg-red-500 bg-opacity-20 text-white p-3 rounded-lg">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading || !url}
              className="w-full bg-white text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Running Audit...' : 'Start Audit'}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-white text-opacity-60 text-sm">
              Our customer's words, not ours. Skeptical? Try it out, and see for yourself.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
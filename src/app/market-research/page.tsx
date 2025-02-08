'use client';

import { LineChart, Search, TrendingUp, Users, Zap } from 'lucide-react';
import { useState } from 'react';

interface SearchResult {
  title: string;
  description: string;
  url: string;
  date: string;
}

export default function MarketResearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement actual search logic
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-primary text-white/90">
      {/* Header */}
      <div className="border-b border-dark-200 p-6">
        <h1 className="text-2xl font-semibold mb-2">Market Research</h1>
        <p className="text-white/70">Analyze markets, competitors, and trends</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Search Section */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Research markets, competitors, or trends..."
              className="w-full bg-dark-secondary border border-dark-200 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white/90 placeholder:text-white/50"
            />
            <Search className="absolute left-4 top-3.5 text-white/50" size={20} />
            <button
              type="submit"
              className="absolute right-3 top-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md transition duration-200"
            >
              Search
            </button>
          </form>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Market Trends',
              icon: <TrendingUp className="text-emerald-500" size={24} />,
              value: '23.5%',
              description: 'Growth rate this quarter',
            },
            {
              title: 'Competitors',
              icon: <Users className="text-blue-500" size={24} />,
              value: '156',
              description: 'Active in the market',
            },
            {
              title: 'Market Size',
              icon: <LineChart className="text-purple-500" size={24} />,
              value: '$2.4B',
              description: 'Total addressable market',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-dark-secondary rounded-lg p-6 border border-dark-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">{stat.title}</h3>
                {stat.icon}
              </div>
              <p className="text-2xl font-semibold mb-1">{stat.value}</p>
              <p className="text-white/50 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : results.length > 0 ? (
            results.map((result, i) => (
              <div
                key={i}
                className="bg-dark-secondary rounded-lg p-6 border border-dark-200 hover:border-dark-100 transition duration-200"
              >
                <h3 className="text-lg font-medium mb-2">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition duration-200"
                  >
                    {result.title}
                  </a>
                </h3>
                <p className="text-white/70 mb-3">{result.description}</p>
                <div className="flex items-center text-white/50 text-sm">
                  <span>{result.date}</span>
                </div>
              </div>
            ))
          ) : query ? (
            <div className="text-center py-12 text-white/50">
              No results found for "{query}"
            </div>
          ) : (
            <div className="bg-dark-secondary rounded-lg p-8 border border-dark-200 text-center">
              <Zap size={48} className="mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-medium mb-2">
                Start Your Market Research
              </h3>
              <p className="text-white/70 max-w-md mx-auto">
                Enter a topic, company, or market trend to get comprehensive
                insights and analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
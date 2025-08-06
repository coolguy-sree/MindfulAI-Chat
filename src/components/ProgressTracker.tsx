import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { getProgressInsights } from '../lib/cohere';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ProgressData {
  dates: string[];
  wellbeingScores: number[];
  anxietyLevels: number[];
  copingScores: number[];
}

interface Insight {
  type: 'improvement' | 'warning' | 'suggestion';
  message: string;
}

const mockProgressData: ProgressData = {
  dates: [
    '2024-02-01',
    '2024-02-08',
    '2024-02-15',
    '2024-02-22',
    '2024-02-29',
    '2024-03-07',
  ],
  wellbeingScores: [65, 68, 72, 70, 75, 78],
  anxietyLevels: [72, 68, 65, 63, 60, 55],
  copingScores: [60, 63, 68, 70, 73, 75],
};

export default function ProgressTracker() {
  const [progressData, setProgressData] = useState<ProgressData>(mockProgressData);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const newInsights = await getProgressInsights(progressData);
        setInsights(newInsights);
      } catch (error) {
        console.error('Error fetching insights:', error);
        // Fallback insights if AI fails
        setInsights([
          {
            type: 'improvement',
            message: 'Your overall well-being score has improved by 20% over the past month.'
          },
          {
            type: 'improvement',
            message: 'Anxiety levels have decreased consistently, showing good progress in coping strategies.'
          },
          {
            type: 'suggestion',
            message: 'Consider increasing mindfulness exercises during high-stress periods.'
          }
        ]);
      }
      setLoading(false);
    };

    fetchInsights();
  }, [progressData]);

  const chartData = {
    labels: progressData.dates,
    datasets: [
      {
        label: 'Well-being Score',
        data: progressData.wellbeingScores,
        borderColor: 'rgb(45, 212, 191)',
        backgroundColor: 'rgba(45, 212, 191, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Anxiety Level',
        data: progressData.anxietyLevels,
        borderColor: 'rgb(251, 146, 60)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Coping Score',
        data: progressData.copingScores,
        borderColor: 'rgb(147, 197, 253)',
        backgroundColor: 'rgba(147, 197, 253, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(209, 213, 219)'
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(209, 213, 219, 0.1)'
        },
        ticks: {
          color: 'rgb(209, 213, 219)'
        }
      },
      x: {
        grid: {
          color: 'rgba(209, 213, 219, 0.1)'
        },
        ticks: {
          color: 'rgb(209, 213, 219)'
        }
      }
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'improvement':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'suggestion':
        return <Lightbulb className="w-5 h-5 text-blue-400" />;
      default:
        return <Brain className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl">
      <div className="flex items-center mb-6">
        <Brain className="w-8 h-8 text-teal-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">AI Progress Tracking</h2>
      </div>

      {/* Progress Chart */}
      <div className="bg-slate-700/30 p-4 rounded-lg mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">AI-Generated Insights</h3>
        
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="bg-slate-700/30 p-4 rounded-lg flex items-start"
              >
                <div className="mr-3 mt-1">
                  {getInsightIcon(insight.type)}
                </div>
                <p className="text-gray-300">{insight.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="mt-6 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-semibold mb-1">Personalized Next Steps</h4>
            <p className="text-gray-300 text-sm">
              Based on your progress, our AI suggests focusing on mindfulness and stress management
            </p>
          </div>
          <button className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
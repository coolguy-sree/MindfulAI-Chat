import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Shield, Activity, Clock } from 'lucide-react';
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
import { Line } from 'react-chartjs-2';
import type { MonitoringAlert } from '../lib/monitoring';
import { monitorContent } from '../lib/monitoring';

// Register ChartJS components
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

interface MonitoringDashboardProps {
  content?: string;
  onAlert?: (alert: MonitoringAlert) => void;
}

interface AlertStats {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

// Simulated pattern analysis
const getHistoricalPatterns = async (alerts: MonitoringAlert[]) => {
  // Analyze frequency of different alert types
  const typeCounts = alerts.reduce((acc, alert) => {
    acc[alert.type] = (acc[alert.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Analyze severity trends
  const severityCounts = alerts.reduce((acc, alert) => {
    acc[alert.severity] = (acc[alert.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Generate patterns based on analysis
  const patterns = [
    'Increased frequency of alerts in the last period',
    `Most common alert type: ${Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'none'}`,
    `Predominant severity level: ${Object.entries(severityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'none'}`
  ];

  // Generate urgent actions based on analysis
  const urgentActions = [
    'Review and update security settings',
    'Document all recent incidents',
    'Consider implementing additional protective measures'
  ];

  return {
    patterns,
    riskLevel: 'medium',
    recommendations: [],
    urgentActions
  };
};

// Simulated real-time data generation
const generateRandomAlert = (): MonitoringAlert => {
  const severities: MonitoringAlert['severity'][] = ['low', 'medium', 'high', 'critical'];
  const types: MonitoringAlert['type'][] = ['harassment', 'cyberbullying', 'threat', 'hate_speech'];
  
  return {
    severity: severities[Math.floor(Math.random() * severities.length)],
    type: types[Math.floor(Math.random() * types.length)],
    confidence: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
    timestamp: new Date().toISOString(),
    details: 'Real-time monitoring alert',
    suggestedActions: ['Document incident', 'Update security settings']
  };
};

const MonitoringDashboard: React.FC<MonitoringDashboardProps> = ({ content, onAlert }) => {
  const [currentAlert, setCurrentAlert] = useState<MonitoringAlert | null>(null);
  const [recentAlerts, setRecentAlerts] = useState<MonitoringAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<AlertStats>({
    total: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  });
  const [patterns, setPatterns] = useState<any>(null);

  const updateStats = useCallback((alert: MonitoringAlert) => {
    setStats(prev => ({
      total: prev.total + 1,
      critical: prev.critical + (alert.severity === 'critical' ? 1 : 0),
      high: prev.high + (alert.severity === 'high' ? 1 : 0),
      medium: prev.medium + (alert.severity === 'medium' ? 1 : 0),
      low: prev.low + (alert.severity === 'low' ? 1 : 0)
    }));
  }, []);

  // Real-time monitoring simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = generateRandomAlert();
      setCurrentAlert(newAlert);
      setRecentAlerts(prev => [newAlert, ...prev].slice(0, 10));
      updateStats(newAlert);
      onAlert?.(newAlert);
    }, 5000); // Generate new data every 5 seconds

    return () => clearInterval(interval);
  }, [updateStats, onAlert]);

  // Content analysis
  useEffect(() => {
    if (content) {
      const analyzeContent = async () => {
        setLoading(true);
        try {
          const alert = await monitorContent(content);
          if (alert) {
            setCurrentAlert(alert);
            setRecentAlerts(prev => [alert, ...prev].slice(0, 10));
            updateStats(alert);
            onAlert?.(alert);
          }
        } catch (error) {
          console.error('Error analyzing content:', error);
        } finally {
          setLoading(false);
        }
      };

      analyzeContent();
    }
  }, [content, updateStats, onAlert]);

  // Pattern analysis
  useEffect(() => {
    const analyzePatterns = async () => {
      if (recentAlerts.length >= 3) {
        try {
          const patternAnalysis = await getHistoricalPatterns(recentAlerts);
          setPatterns(patternAnalysis);
        } catch (error) {
          console.error('Error analyzing patterns:', error);
        }
      }
    };

    analyzePatterns();
  }, [recentAlerts]);

  const chartData = {
    labels: recentAlerts.map(() => '').reverse(),
    datasets: [
      {
        label: 'Threat Level',
        data: recentAlerts.map(alert => 
          alert.severity === 'critical' ? 1 :
          alert.severity === 'high' ? 0.75 :
          alert.severity === 'medium' ? 0.5 :
          0.25
        ).reverse(),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        min: 0,
        max: 1,
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
    },
    animation: {
      duration: 0 // Disable animations for smoother updates
    }
  };

  const getSeverityColor = (severity: MonitoringAlert['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-teal-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Real-Time AI Monitoring</h2>
        </div>
        {loading && (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-400"></div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Current Status */}
        <div className="bg-slate-700/30 p-4 rounded-lg">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-teal-400" />
            Current Status
          </h3>
          {currentAlert ? (
            <div className="space-y-2">
              <div className={`text-lg font-semibold ${getSeverityColor(currentAlert.severity)}`}>
                {currentAlert.severity.toUpperCase()} Alert
              </div>
              <p className="text-gray-300">{currentAlert.details}</p>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(currentAlert.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No active alerts</p>
          )}
        </div>

        {/* Threat Level Trend */}
        <div className="bg-slate-700/30 p-4 rounded-lg">
          <h3 className="text-white font-semibold mb-3">Real-Time Threat Level</h3>
          <div style={{ height: '200px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Pattern Analysis */}
      {patterns && (
        <div className="bg-slate-700/30 p-4 rounded-lg mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-teal-400" />
            Pattern Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-gray-300 font-medium mb-2">Detected Patterns</h4>
              <ul className="space-y-2">
                {patterns.patterns.map((pattern: string, index: number) => (
                  <li key={index} className="text-gray-400 flex items-start">
                    <span className="text-teal-400 mr-2">•</span>
                    {pattern}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-gray-300 font-medium mb-2">Urgent Actions</h4>
              <ul className="space-y-2">
                {patterns.urgentActions.map((action: string, index: number) => (
                  <li key={index} className="text-gray-400 flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Alert Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-700/30 p-4 rounded-lg">
          <div className="text-gray-400 text-sm mb-1">Critical Alerts</div>
          <div className="text-red-400 text-2xl font-bold">{stats.critical}</div>
        </div>
        <div className="bg-slate-700/30 p-4 rounded-lg">
          <div className="text-gray-400 text-sm mb-1">High Alerts</div>
          <div className="text-orange-400 text-2xl font-bold">{stats.high}</div>
        </div>
        <div className="bg-slate-700/30 p-4 rounded-lg">
          <div className="text-gray-400 text-sm mb-1">Medium Alerts</div>
          <div className="text-yellow-400 text-2xl font-bold">{stats.medium}</div>
        </div>
        <div className="bg-slate-700/30 p-4 rounded-lg">
          <div className="text-gray-400 text-sm mb-1">Low Alerts</div>
          <div className="text-green-400 text-2xl font-bold">{stats.low}</div>
        </div>
      </div>

      {/* Recent Alerts */}
      {recentAlerts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white font-semibold mb-3">Recent Alerts</h3>
          <div className="space-y-2">
            {recentAlerts.slice(0, 5).map((alert, index) => (
              <div key={index} className="bg-slate-700/30 p-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${getSeverityColor(alert.severity)}`}></div>
                  <div>
                    <div className="text-white font-medium">{alert.type}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className={`text-sm ${getSeverityColor(alert.severity)}`}>
                  {(alert.confidence * 100).toFixed(0)}% confidence
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringDashboard;
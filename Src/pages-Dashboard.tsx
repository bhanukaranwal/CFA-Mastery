import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Trophy, Clock, Target, BookOpen, TrendingUp } from 'lucide-react';
import { useUserProgress } from '../contexts/UserProgressContext';
import StatsGrid from '../components/StatsGrid';
import ProgressSection from '../components/ProgressSection';
import QuickStartButtons from '../components/QuickStartButtons';

const Dashboard: React.FC = () => {
  const { userProgress } = useUserProgress();

  const accuracy = userProgress.questionsAttempted > 0 
    ? Math.round((userProgress.correctAnswers / userProgress.questionsAttempted) * 100) 
    : 0;

  const stats = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Questions Attempted',
      value: userProgress.questionsAttempted,
      color: 'bg-bg-1'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Accuracy Rate',
      value: `${accuracy}%`,
      color: 'bg-bg-2'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Study Streak',
      value: userProgress.studyStreak,
      color: 'bg-bg-3'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Study Hours',
      value: `${Math.floor(userProgress.totalStudyTime / 3600000)}h`,
      color: 'bg-bg-4'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Badges Earned',
      value: userProgress.badgesEarned.length,
      color: 'bg-bg-5'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Total Points',
      value: userProgress.userPoints,
      color: 'bg-bg-6'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-bg-1 to-bg-8 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Master the CFA Exams
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Comprehensive preparation platform with 200+ questions, adaptive learning, and detailed analytics
            </p>
            
            {/* Stats Grid */}
            <StatsGrid stats={stats} />

            {/* Progress Section */}
            <ProgressSection />

            {/* Quick Start Buttons */}
            <QuickStartButtons />
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="py-12 bg-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8 text-center">Recent Activity</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Recent Sessions */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-primary">Recent Quiz Sessions</h3>
              {userProgress.sessionHistory.length > 0 ? (
                <div className="space-y-3">
                  {userProgress.sessionHistory.slice(-3).reverse().map((session, index) => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-bg-1 rounded-lg">
                      <div>
                        <p className="font-medium">{session.mode.charAt(0).toUpperCase() + session.mode.slice(1)} Quiz</p>
                        <p className="text-sm text-text-secondary">
                          {session.questionsAttempted} questions • {Math.round(session.accuracy)}% accuracy
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-text-secondary">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary italic">No quiz sessions yet. Start your first quiz!</p>
              )}
            </div>

            {/* Topic Performance */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-primary">Top Performing Topics</h3>
              {Object.keys(userProgress.topicPerformance).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(userProgress.topicPerformance)
                    .sort(([,a], [,b]) => b.accuracy - a.accuracy)
                    .slice(0, 3)
                    .map(([topic, performance]) => (
                      <div key={topic} className="flex items-center justify-between">
                        <span className="font-medium">{topic}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-success transition-all duration-300"
                              style={{ width: `${Math.min(performance.accuracy, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{Math.round(performance.accuracy)}%</span>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-text-secondary italic">Complete some quizzes to see your topic performance!</p>
              )}
            </div>

            {/* Quick Links */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 text-primary">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/quiz" 
                  className="block p-3 bg-bg-2 hover:bg-bg-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="font-medium">Start Random Quiz</span>
                  </div>
                </Link>
                <Link 
                  to="/study-tools" 
                  className="block p-3 bg-bg-2 hover:bg-bg-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="font-medium">Browse Question Bank</span>
                  </div>
                </Link>
                <Link 
                  to="/analytics" 
                  className="block p-3 bg-bg-2 hover:bg-bg-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span className="font-medium">View Analytics</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

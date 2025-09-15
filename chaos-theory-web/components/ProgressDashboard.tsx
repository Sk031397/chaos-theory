'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Zap, 
  Trophy, 
  Calendar, 
  TrendingUp,
  Target,
  Clock,
  Sparkles,
  User,
  BarChart3,
  CheckCircle,
  Play
} from 'lucide-react'

interface ProgressDashboardProps {
  userProfile: any
  completedChallenges: any[]
  onStartChallenge: () => void
  onBack: () => void
}

export default function ProgressDashboard({ 
  userProfile, 
  completedChallenges, 
  onStartChallenge, 
  onBack 
}: ProgressDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'insights'>('overview')

  const stats = {
    totalChallenges: completedChallenges.length,
    currentStreak: 3, // Mock data
    totalTime: completedChallenges.reduce((acc, challenge) => acc + (challenge.timeElapsed || 0), 0),
    creativityBoost: Math.min(100, completedChallenges.length * 12), // Mock calculation
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'micro': return 'from-green-500 to-emerald-600'
      case 'meso': return 'from-yellow-500 to-orange-600'
      case 'macro': return 'from-red-500 to-pink-600'
      default: return 'from-violet-500 to-purple-600'
    }
  }

  const recentChallenges = completedChallenges.slice(-5).reverse()

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {userProfile?.name || 'Chaos Conductor'}! 👋
              </h1>
              <p className="text-gray-400">Ready for your next adventure?</p>
            </div>
          </div>
          
          <button
            onClick={onStartChallenge}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-semibold text-white hover:from-violet-500 hover:to-purple-500 transition-all duration-300 flex items-center gap-2 glow-effect hover:scale-105"
          >
            <Play className="w-5 h-5" />
            New Challenge
          </button>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="chaos-card text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{stats.totalChallenges}</div>
            <div className="text-sm text-gray-400">Challenges Completed</div>
          </div>
          
          <div className="chaos-card text-center">
            <Zap className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{stats.currentStreak}</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
          
          <div className="chaos-card text-center">
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{formatTime(stats.totalTime)}</div>
            <div className="text-sm text-gray-400">Time Invested</div>
          </div>
          
          <div className="chaos-card text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">+{stats.creativityBoost}%</div>
            <div className="text-sm text-gray-400">Creativity Boost</div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-1 mb-8 glass-morphism rounded-xl p-1"
        >
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'challenges', label: 'Challenges', icon: Target },
            { id: 'insights', label: 'Insights', icon: Sparkles }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-violet-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="chaos-card">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-violet-400" />
                  Recent Activity
                </h2>
                
                {recentChallenges.length > 0 ? (
                  <div className="space-y-4">
                    {recentChallenges.map((challenge, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)}`} />
                        <div className="flex-1">
                          <div className="font-medium text-white">{challenge.title}</div>
                          <div className="text-sm text-gray-400">{challenge.category}</div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No challenges completed yet</p>
                    <button
                      onClick={onStartChallenge}
                      className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors"
                    >
                      Start Your First Challenge
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Summary */}
              <div className="chaos-card">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-violet-400" />
                  Your Chaos Profile
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Risk Tolerance</span>
                      <span className="text-violet-400 font-medium">{userProfile?.riskTolerance || 5}/10</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full"
                        style={{ width: `${((userProfile?.riskTolerance || 5) / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Social Comfort</span>
                      <span className="text-violet-400 font-medium">{userProfile?.socialComfort || 5}/10</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-rose-600 h-2 rounded-full"
                        style={{ width: `${((userProfile?.socialComfort || 5) / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-gray-300 mb-2">Preferred Categories</div>
                    <div className="flex flex-wrap gap-2">
                      {(userProfile?.categories || []).map((category: string) => (
                        <span key={category} className="px-3 py-1 bg-violet-600/20 text-violet-300 rounded-full text-sm capitalize">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="chaos-card">
              <h2 className="text-xl font-semibold text-white mb-6">Challenge History</h2>
              
              {completedChallenges.length > 0 ? (
                <div className="space-y-4">
                  {completedChallenges.map((challenge, index) => (
                    <div key={index} className="p-6 bg-white/5 rounded-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-white mb-1">{challenge.title}</h3>
                          <p className="text-gray-400 mb-2">{challenge.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatTime(challenge.timeElapsed || 0)}
                            </span>
                            <span className="capitalize">{challenge.category}</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)} text-white text-sm font-medium capitalize`}>
                          {challenge.difficulty}
                        </div>
                      </div>
                      
                      {challenge.reflectionAnswers && challenge.reflectionAnswers.length > 0 && (
                        <div className="border-t border-white/10 pt-4">
                          <div className="text-sm text-gray-400 mb-2">Reflection Notes:</div>
                          <div className="text-gray-300 text-sm">
                            {challenge.reflectionAnswers[0]?.substring(0, 150)}
                            {challenge.reflectionAnswers[0]?.length > 150 && '...'}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Challenges Yet</h3>
                  <p className="text-gray-400 mb-6">Start your first challenge to see your progress here</p>
                  <button
                    onClick={onStartChallenge}
                    className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-semibold text-white hover:from-violet-500 hover:to-purple-500 transition-all duration-300"
                  >
                    Take Your First Challenge
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="chaos-card">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  Growth Insights
                </h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-xl border border-violet-500/20">
                    <h3 className="font-semibold text-white mb-2">Creativity Boost</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Your challenge completion rate suggests a {stats.creativityBoost}% increase in creative thinking patterns.
                    </p>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full"
                        style={{ width: `${Math.min(100, stats.creativityBoost)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-xl border border-green-500/20">
                    <h3 className="font-semibold text-white mb-2">Resilience Building</h3>
                    <p className="text-gray-300 text-sm">
                      Each completed challenge strengthens your ability to handle uncertainty and adapt to new situations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="chaos-card">
                <h2 className="text-xl font-semibold text-white mb-6">Recommendations</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-medium text-white mb-2">Try Social Challenges</h3>
                    <p className="text-gray-400 text-sm">
                      Based on your profile, social challenges could help expand your comfort zone further.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-medium text-white mb-2">Increase Difficulty</h3>
                    <p className="text-gray-400 text-sm">
                      You're ready for more challenging experiences. Consider trying a macro challenge this week.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h3 className="font-medium text-white mb-2">Maintain Momentum</h3>
                    <p className="text-gray-400 text-sm">
                      Keep your streak alive! Daily micro-challenges can maintain your growth trajectory.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
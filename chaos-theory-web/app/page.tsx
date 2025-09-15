'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {  
  Target, 
  TrendingUp, 
  Users, 
  Sparkles, 
  ArrowRight,
  Play,
  CheckCircle,
  Clock,
  Brain,
  Shuffle
} from 'lucide-react'
import ChaosChallenge from '@/components/ChaosChallenge'
import ProfileSetup from '@/components/ProfileSetup'
import ProgressDashboard from '@/components/ProgressDashboard'

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'profile' | 'dashboard' | 'challenge'>('landing')
  const [userProfile, setUserProfile] = useState(null)
  const [completedChallenges, setCompletedChallenges] = useState([])

  const features = [
    {
      icon: Target,
      title: "Daily Chaos Challenges",
      description: "Personalized disruptions designed to break your routine and spark creativity",
      color: "from-primary-500 to-primary-600"
    },
    {
      icon: Brain,
      title: "Neuroplasticity Boost",
      description: "New experiences create neural pathways that enhance cognitive flexibility",
      color: "from-secondary-500 to-secondary-600"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Measure your growth in creativity, resilience, and life satisfaction",
      color: "from-accent-500 to-accent-600"
    },
    {
      icon: Users,
      title: "Community Challenges",
      description: "Share experiences and tackle group challenges with fellow chaos conductors",
      color: "from-primary-400 to-secondary-500"
    }
  ]

  const stats = [
    { label: "Active Users", value: "12.5K", icon: Users },
    { label: "Challenges Completed", value: "89.2K", icon: CheckCircle },
    { label: "Avg. Creativity Boost", value: "+47%", icon: Sparkles },
    { label: "Success Rate", value: "94%", icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              {/* Animated Background Elements */}0
              <div className="absolute inset-0 overflow-32hidden">
                {/* Mesh gradient background */}
                <div className="absolute inset-0 mesh-background opacity-20" />
                
                {/* Floating particles */}
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute rounded-full ${
                      i % 3 === 0 ? 'w-2 h-2 bg-primary-400/30' :
                      i % 3 === 1 ? 'w-1.5 h-1.5 bg-secondary-400/30' :
                      'w-1 h-1 bg-accent-400/30'
                    }`}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.random() * 20 - 10, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8"
                >
                  <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                    <span className="gradient-text">Chaos</span>
                    <br />
                    <span className="text-white">Conductor</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                    Break free from routine stagnation. Embrace controlled chaos to unlock 
                    your creative potential and build resilience through scientifically-designed challenges.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                >
                  <button
                    onClick={() => setCurrentView('profile')}
                    className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl font-semibold text-white hover:from-primary-500 hover:to-secondary-500 transition-all duration-300 flex items-center gap-2 glow-effect hover:scale-105"
                  >
                    <Play className="w-5 h-5" />
                    Start Your Chaos Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => setCurrentView('challenge')}
                    className="px-8 py-4 glass-morphism rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 border border-primary-500/30"
                  >
                    <Shuffle className="w-5 h-5" />
                    Try a Random Challenge
                  </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                >
                  {stats.map((stat, index) => (
                    <div key={index} className="chaos-card text-center group">
                      <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-2 group-hover:text-secondary-400 transition-colors" />
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6">
              <div className="container mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                    Why Controlled Chaos Works
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Backed by neuroscience research, our approach systematically disrupts 
                    patterns to enhance creativity, build resilience, and unlock potential.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="chaos-card group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-full h-full text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
              <div className="container mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="chaos-card max-w-4xl mx-auto"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Ready to Conduct Your Chaos?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Join thousands who've transformed their lives through controlled disruption.
                  </p>
                  <button
                    onClick={() => setCurrentView('profile')}
                    className="px-8 py-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-2xl font-semibold text-white hover:from-primary-500 hover:via-secondary-500 hover:to-accent-500 transition-all duration-300 glow-effect hover:scale-105"
                  >
                    Begin Your Transformation
                  </button>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}

        {currentView === 'profile' && (
          <ProfileSetup 
            onComplete={(profile) => {
              setUserProfile(profile)
              setCurrentView('dashboard')
            }}
            onBack={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'dashboard' && (
          <ProgressDashboard 
            userProfile={userProfile}
            completedChallenges={completedChallenges}
            onStartChallenge={() => setCurrentView('challenge')}
            onBack={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'challenge' && (
          <ChaosChallenge 
            userProfile={userProfile}
            onComplete={(challenge) => {
              //setCompletedChallenges(prev => [...prev, challenge])
              setCurrentView('dashboard')
            }}
            onBack={() => setCurrentView(userProfile ? 'dashboard' : 'landing')}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
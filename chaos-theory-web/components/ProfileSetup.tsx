'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Target, 
  Clock, 
  Heart,
  Zap,
  CheckCircle
} from 'lucide-react'

interface ProfileSetupProps {
  onComplete: (profile: any) => void
  onBack: () => void
}

export default function ProfileSetup({ onComplete, onBack }: ProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [profile, setProfile] = useState({
    name: '',
    riskTolerance: 5,
    socialComfort: 5,
    timeAvailability: 'moderate',
    categories: [] as string[],
    goals: [] as string[]
  })

  const steps = [
    {
      title: "Welcome to Chaos",
      subtitle: "Let's personalize your journey",
      icon: User
    },
    {
      title: "Risk Assessment",
      subtitle: "How comfortable are you with uncertainty?",
      icon: Target
    },
    {
      title: "Social Preferences",
      subtitle: "How do you feel about social challenges?",
      icon: Heart
    },
    {
      title: "Time Commitment",
      subtitle: "How much time can you dedicate?",
      icon: Clock
    },
    {
      title: "Challenge Categories",
      subtitle: "What areas interest you most?",
      icon: Zap
    },
    {
      title: "Your Goals",
      subtitle: "What do you hope to achieve?",
      icon: CheckCircle
    }
  ]

  const categories = [
    { id: 'food', label: 'Food & Dining', emoji: '🍽️' },
    { id: 'social', label: 'Social Interactions', emoji: '👥' },
    { id: 'physical', label: 'Physical Activities', emoji: '🏃' },
    { id: 'creative', label: 'Creative Expression', emoji: '🎨' },
    { id: 'learning', label: 'Learning & Skills', emoji: '📚' },
    { id: 'exploration', label: 'Exploration', emoji: '🗺️' },
    { id: 'routine', label: 'Routine Breaking', emoji: '⚡' },
    { id: 'mindfulness', label: 'Mindfulness', emoji: '🧘' }
  ]

  const goals = [
    'Boost creativity',
    'Build confidence',
    'Meet new people',
    'Break bad habits',
    'Reduce anxiety',
    'Increase spontaneity',
    'Develop resilience',
    'Find new passions'
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(profile)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  const toggleCategory = (categoryId: string) => {
    setProfile(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }))
  }

  const toggleGoal = (goal: string) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <label className="block text-gray-300 mb-2 text-left">What should we call you?</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-12 h-12 text-white" />
              </div>
              <p className="text-gray-300">
                Rate your comfort level with unpredictable situations
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Very Cautious</span>
                <span>Thrill Seeker</span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={profile.riskTolerance}
                  onChange={(e) => setProfile(prev => ({ ...prev, riskTolerance: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <span key={num}>{num}</span>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-2xl font-bold text-violet-400">{profile.riskTolerance}/10</span>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <p className="text-gray-300">
                How comfortable are you with social challenges?
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Prefer Solo</span>
                <span>Love Meeting People</span>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={profile.socialComfort}
                  onChange={(e) => setProfile(prev => ({ ...prev, socialComfort: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <span key={num}>{num}</span>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-2xl font-bold text-violet-400">{profile.socialComfort}/10</span>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-12 h-12 text-white" />
              </div>
              <p className="text-gray-300">
                How much time can you typically dedicate to challenges?
              </p>
            </div>
            
            <div className="grid gap-4">
              {[
                { id: 'minimal', label: 'Minimal', desc: '5-15 minutes', time: '⚡' },
                { id: 'moderate', label: 'Moderate', desc: '30-60 minutes', time: '⏰' },
                { id: 'extended', label: 'Extended', desc: '1-3 hours', time: '📅' },
                { id: 'flexible', label: 'Flexible', desc: 'Whatever it takes', time: '🌟' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setProfile(prev => ({ ...prev, timeAvailability: option.id }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    profile.timeAvailability === option.id
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.time}</span>
                    <div>
                      <div className="font-semibold text-white">{option.label}</div>
                      <div className="text-sm text-gray-400">{option.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <p className="text-gray-300">
                Select the types of challenges that interest you most
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    profile.categories.includes(category.id)
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{category.emoji}</div>
                    <div className="text-sm font-medium text-white">{category.label}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <p className="text-sm text-gray-400 text-center">
              Selected: {profile.categories.length} categories
            </p>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <p className="text-gray-300">
                What do you hope to achieve through controlled chaos?
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm ${
                    profile.goals.includes(goal)
                      ? 'border-violet-500 bg-violet-500/10 text-white'
                      : 'border-white/10 bg-white/5 hover:border-white/20 text-gray-300'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            
            <p className="text-sm text-gray-400 text-center">
              Selected: {profile.goals.length} goals
            </p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <span className="text-sm text-gray-400">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="chaos-card"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-gray-400">
              {steps[currentStep].subtitle}
            </p>
          </div>

          {renderStepContent()}

          <div className="flex justify-end mt-8">
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !profile.name) ||
                (currentStep === 4 && profile.categories.length === 0) ||
                (currentStep === 5 && profile.goals.length === 0)
              }
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-semibold text-white hover:from-violet-500 hover:to-purple-500 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed glow-effect"
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Clock, 
  Target, 
  Zap, 
  CheckCircle, 
  RotateCcw,
  Sparkles,
  Timer,
  Trophy
} from 'lucide-react'

interface Challenge {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'micro' | 'meso' | 'macro'
  timeEstimate: string
  instructions: string[]
  reflection: string[]
}

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Backwards Day',
    description: 'Do your morning routine in reverse order',
    category: 'Routine',
    difficulty: 'micro',
    timeEstimate: '15 minutes',
    instructions: [
      'Start with what you normally do last in your morning routine',
      'Work backwards through each step',
      'Pay attention to how this feels different',
      'Notice any new insights or perspectives'
    ],
    reflection: [
      'What felt most uncomfortable about this change?',
      'Did you notice anything new about your routine?',
      'How might this perspective shift apply elsewhere?'
    ]
  },
  {
    id: '2',
    title: 'Random Restaurant Roulette',
    description: 'Let chance decide your next meal adventure',
    category: 'Food',
    difficulty: 'meso',
    timeEstimate: '2 hours',
    instructions: [
      'Close your eyes and point to a random spot on a map',
      'Find the nearest restaurant to that spot',
      'Order something you\'ve never tried before',
      'Strike up a conversation with someone new'
    ],
    reflection: [
      'What surprised you most about this experience?',
      'How did stepping out of your comfort zone feel?',
      'What would you do differently next time?'
    ]
  },
  {
    id: '3',
    title: 'Skill Swap Weekend',
    description: 'Learn something completely outside your expertise',
    category: 'Learning',
    difficulty: 'macro',
    timeEstimate: '2 days',
    instructions: [
      'Choose a skill that\'s opposite to your strengths',
      'Find a beginner tutorial or class',
      'Dedicate 4 hours over the weekend to practice',
      'Document your learning journey'
    ],
    reflection: [
      'What was the biggest challenge you faced?',
      'How did being a beginner again feel?',
      'What connections did you make to your existing skills?'
    ]
  },
  {
    id: '4',
    title: 'Digital Detox Micro-Adventure',
    description: 'Explore your neighborhood without any digital assistance',
    category: 'Exploration',
    difficulty: 'micro',
    timeEstimate: '30 minutes',
    instructions: [
      'Leave your phone at home',
      'Walk in a direction you rarely go',
      'Talk to at least one stranger',
      'Find something beautiful you\'ve never noticed'
    ],
    reflection: [
      'How did it feel to be without your phone?',
      'What did you discover about your neighborhood?',
      'How present did you feel during this experience?'
    ]
  }
]

interface ChaosChallengeProps {
  userProfile: any
  onComplete: (challenge: any) => void
  onBack: () => void
}

export default function ChaosChallenge({ userProfile, onComplete, onBack }: ChaosChallengeProps) {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [reflectionAnswers, setReflectionAnswers] = useState<string[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    // Select a random challenge
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
    setCurrentChallenge(randomChallenge)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isStarted && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isStarted, isCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'micro': return 'from-primary-500 to-primary-600'
      case 'meso': return 'from-secondary-500 to-secondary-600'
      case 'macro': return 'from-accent-500 to-accent-600'
      default: return 'from-primary-500 to-secondary-600'
    }
  }

  const handleComplete = () => {
    if (currentChallenge) {
      onComplete({
        ...currentChallenge,
        completedAt: new Date().toISOString(),
        timeElapsed,
        reflectionAnswers
      })
    }
  }

  const generateNewChallenge = () => {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
    setCurrentChallenge(randomChallenge)
    setIsStarted(false)
    setIsCompleted(false)
    setReflectionAnswers([])
    setTimeElapsed(0)
  }

  if (!currentChallenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="flex items-center gap-4">
            {isStarted && (
              <div className="flex items-center gap-2 glass-morphism px-4 py-2 rounded-full">
                <Timer className="w-4 h-4 text-violet-400" />
                <span className="text-white font-mono">{formatTime(timeElapsed)}</span>
              </div>
            )}
            
            <button
              onClick={generateNewChallenge}
              className="flex items-center gap-2 glass-morphism px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              New Challenge
            </button>
          </div>
        </motion.div>

        {!isCompleted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Challenge Card */}
            <div className="chaos-card">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(currentChallenge.difficulty)} text-white text-sm font-medium capitalize`}>
                      {currentChallenge.difficulty}
                    </div>
                    <span className="text-gray-400">{currentChallenge.category}</span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-white mb-3">
                    {currentChallenge.title}
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-4">
                    {currentChallenge.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{currentChallenge.timeEstimate}</span>
                  </div>
                </div>
                
                <div className="text-6xl">
                  {currentChallenge.category === 'Food' ? '🍽️' : 
                   currentChallenge.category === 'Learning' ? '🧠' :
                   currentChallenge.category === 'Exploration' ? '🗺️' : '⚡'}
                </div>
              </div>

              {!isStarted ? (
                <button
                  onClick={() => setIsStarted(true)}
                  className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-semibold text-white hover:from-primary-500 hover:to-secondary-500 transition-all duration-300 flex items-center justify-center gap-2 glow-effect"
                >
                  <Zap className="w-5 h-5" />
                  Start Challenge
                </button>
              ) : (
                <button
                  onClick={() => setIsCompleted(true)}
                  className="w-full py-4 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl font-semibold text-white hover:from-primary-500 hover:to-accent-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Complete Challenge
                </button>
              )}
            </div>

            {/* Instructions */}
            {isStarted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="chaos-card"
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary-400" />
                  Instructions
                </h2>
                
                <div className="space-y-3">
                  {currentChallenge.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-600 text-white text-sm flex items-center justify-center font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-300 flex-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Completion Celebration */}
            <div className="chaos-card text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                Challenge Completed! 🎉
              </h2>
              
              <p className="text-xl text-gray-300 mb-6">
                You've successfully embraced chaos and expanded your comfort zone.
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  Time: {formatTime(timeElapsed)}
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Difficulty: {currentChallenge.difficulty}
                </div>
              </div>
            </div>

            {/* Reflection Questions */}
            <div className="chaos-card">
              <h3 className="text-xl font-semibold text-white mb-6">
                Reflection Time
              </h3>
              
              <div className="space-y-6">
                {currentChallenge.reflection.map((question, index) => (
                  <div key={index}>
                    <label className="block text-gray-300 mb-2 font-medium">
                      {question}
                    </label>
                    <textarea
                      value={reflectionAnswers[index] || ''}
                      onChange={(e) => {
                        const newAnswers = [...reflectionAnswers]
                        newAnswers[index] = e.target.value
                        setReflectionAnswers(newAnswers)
                      }}
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      rows={3}
                      placeholder="Share your thoughts..."
                    />
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleComplete}
                className="w-full mt-6 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl font-semibold text-white hover:from-primary-500 hover:to-secondary-500 transition-all duration-300 glow-effect"
              >
                Save & Continue
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
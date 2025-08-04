import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { UserProgress, QuizSession, TopicPerformance } from '../types';

// Initial state
const initialUserProgress: UserProgress = {
  questionsAttempted: 0,
  correctAnswers: 0,
  studyStreak: 0,
  totalStudyTime: 0,
  badgesEarned: [],
  bookmarkedQuestions: [],
  topicPerformance: {},
  sessionHistory: [],
  levelProgress: { I: 0, II: 0, III: 0 },
  userPoints: 0,
  lastStudyDate: undefined,
};

// Action types
type UserProgressAction = 
  | { type: 'UPDATE_QUIZ_PROGRESS'; payload: QuizSession }
  | { type: 'ADD_BOOKMARK'; payload: number }
  | { type: 'REMOVE_BOOKMARK'; payload: number }
  | { type: 'EARN_BADGE'; payload: string }
  | { type: 'UPDATE_STUDY_STREAK' }
  | { type: 'ADD_POINTS'; payload: number }
  | { type: 'LOAD_PROGRESS'; payload: UserProgress }
  | { type: 'RESET_PROGRESS' };

// Reducer
function userProgressReducer(state: UserProgress, action: UserProgressAction): UserProgress {
  switch (action.type) {
    case 'UPDATE_QUIZ_PROGRESS': {
      const session = action.payload;
      const newTotalQuestions = state.questionsAttempted + session.questionsAttempted;
      const newCorrectAnswers = state.correctAnswers + session.correctAnswers;
      
      // Update topic performance
      const updatedTopicPerformance = { ...state.topicPerformance };
      session.topics.forEach(topic => {
        if (!updatedTopicPerformance[topic]) {
          updatedTopicPerformance[topic] = {
            attempted: 0,
            correct: 0,
            accuracy: 0,
            averageTime: 0,
            lastAttempted: session.date
          };
        }
        
        const topicQuestions = Math.floor(session.questionsAttempted / session.topics.length);
        const topicCorrect = Math.floor(session.correctAnswers / session.topics.length);
        
        updatedTopicPerformance[topic] = {
          ...updatedTopicPerformance[topic],
          attempted: updatedTopicPerformance[topic].attempted + topicQuestions,
          correct: updatedTopicPerformance[topic].correct + topicCorrect,
          accuracy: ((updatedTopicPerformance[topic].correct + topicCorrect) / 
                    (updatedTopicPerformance[topic].attempted + topicQuestions)) * 100,
          averageTime: session.timeSpent / session.questionsAttempted,
          lastAttempted: session.date
        };
      });

      return {
        ...state,
        questionsAttempted: newTotalQuestions,
        correctAnswers: newCorrectAnswers,
        totalStudyTime: state.totalStudyTime + session.timeSpent,
        topicPerformance: updatedTopicPerformance,
        sessionHistory: [...state.sessionHistory, session],
        lastStudyDate: session.date,
        userPoints: state.userPoints + Math.floor(session.accuracy * session.questionsAttempted)
      };
    }
    
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarkedQuestions: [...state.bookmarkedQuestions, action.payload]
      };
    
    case 'REMOVE_BOOKMARK':
      return {
        ...state,
        bookmarkedQuestions: state.bookmarkedQuestions.filter(id => id !== action.payload)
      };
    
    case 'EARN_BADGE':
      if (state.badgesEarned.includes(action.payload)) return state;
      return {
        ...state,
        badgesEarned: [...state.badgesEarned, action.payload],
        userPoints: state.userPoints + 100 // Badge bonus points
      };
    
    case 'UPDATE_STUDY_STREAK':
      const today = new Date().toDateString();
      const lastStudy = state.lastStudyDate ? new Date(state.lastStudyDate).toDateString() : null;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      let newStreak = state.studyStreak;
      if (lastStudy === yesterday) {
        newStreak += 1;
      } else if (lastStudy !== today) {
        newStreak = 1;
      }
      
      return {
        ...state,
        studyStreak: newStreak
      };
    
    case 'ADD_POINTS':
      return {
        ...state,
        userPoints: state.userPoints + action.payload
      };
    
    case 'LOAD_PROGRESS':
      return action.payload;
    
    case 'RESET_PROGRESS':
      return initialUserProgress;
    
    default:
      return state;
  }
}

// Context
interface UserProgressContextType {
  userProgress: UserProgress;
  dispatch: React.Dispatch<UserProgressAction>;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

// Provider component
interface UserProgressProviderProps {
  children: ReactNode;
}

export const UserProgressProvider: React.FC<UserProgressProviderProps> = ({ children }) => {
  const [userProgress, dispatch] = useReducer(userProgressReducer, initialUserProgress);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('cfaUserProgress');
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        dispatch({ type: 'LOAD_PROGRESS', payload: parsedProgress });
      }
    } catch (error) {
      console.warn('Failed to load user progress:', error);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cfaUserProgress', JSON.stringify(userProgress));
    } catch (error) {
      console.warn('Failed to save user progress:', error);
    }
  }, [userProgress]);

  return (
    <UserProgressContext.Provider value={{ userProgress, dispatch }}>
      {children}
    </UserProgressContext.Provider>
  );
};

// Hook to use the context
export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};

import { useState, useEffect } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

// Shooting stars
const ShootingStars = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="shooting-star absolute top-10 right-20 w-1 h-1 bg-white rounded-full" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
    <div className="shooting-star absolute top-40 right-60 w-0.5 h-0.5 bg-blue-200 rounded-full" style={{animationDelay: '5s', animationDuration: '4s'}}></div>
    <div className="shooting-star absolute top-60 right-10 w-1 h-1 bg-purple-200 rounded-full" style={{animationDelay: '8s', animationDuration: '3.5s'}}></div>
  </div>
);

const CosmicDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70">
    {/* Larger constellation-like star clusters */}
    <div className="absolute top-20 left-20">
      <div className="relative">
        <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
        <div className="absolute top-4 left-6 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-8 left-2 w-1 h-1 bg-yellow-200 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    </div>
    
    {/* Regular stars scattered */}
    <div className="absolute top-10 left-10 w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
    <div className="absolute top-20 right-20 w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
    <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
    <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-200 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
    <div className="absolute bottom-20 right-10 w-2.5 h-2.5 bg-indigo-300 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
    <div className="absolute top-1/2 left-16 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
    <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-200 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
    <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse" style={{animationDelay: '0.7s'}}></div>
    <div className="absolute top-40 left-1/2 w-2 h-2 bg-pink-200 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
    <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-indigo-200 rounded-full animate-pulse" style={{animationDelay: '2.8s'}}></div>
    <div className="absolute top-60 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
    <div className="absolute bottom-60 right-40 w-1.5 h-1.5 bg-cyan-200 rounded-full animate-pulse" style={{animationDelay: '1.8s'}}></div>
    <div className="absolute top-1/4 left-40 w-2.5 h-2.5 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '2.2s'}}></div>
    <div className="absolute bottom-1/4 right-60 w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '1.4s'}}></div>
    
    {/* More distant tiny stars */}
    <div className="absolute top-32 left-60 w-1 h-1 bg-white bg-opacity-40 rounded-full"></div>
    <div className="absolute top-48 right-80 w-1 h-1 bg-white bg-opacity-30 rounded-full"></div>
    <div className="absolute bottom-48 left-80 w-0.5 h-0.5 bg-white bg-opacity-50 rounded-full"></div>
    <div className="absolute top-80 right-40 w-1 h-1 bg-white bg-opacity-40 rounded-full"></div>
  </div>
);

export default function TodoList() {
  // Load todos from localStorage on initial render
  const [todos, setTodos] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('cosmicTodos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');
  const [justCompleted, setJustCompleted] = useState(null);

  // Add custom CSS animations to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shootingStar {
        0% {
          transform: translateX(0) translateY(0);
          opacity: 1;
        }
        100% {
          transform: translateX(-300px) translateY(300px);
          opacity: 0;
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }
      
      @keyframes completionPulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }
      
      .shooting-star {
        animation: shootingStar 3s linear infinite;
      }
      
      .float-animation {
        animation: float 6s ease-in-out infinite;
      }
      
      .completion-pulse {
        animation: completionPulse 0.5s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cosmicTodos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id && !todo.completed) {
        setJustCompleted(id);
        setTimeout(() => setJustCompleted(null), 500);
      }
      return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 py-8 px-4 relative overflow-hidden">
      <CosmicDots />
      <ShootingStars />
      
      {/* Enhanced nebula effects with more layers */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{animationDuration: '8s'}}></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl opacity-35 animate-pulse" style={{animationDuration: '12s', animationDelay: '4s'}}></div>
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{animationDuration: '15s', animationDelay: '1s'}}></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white bg-opacity-98 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-2 border-purple-200 border-opacity-50">
          
          <div className="text-center mb-8">
            {/* Floating cosmic illustration above title */}
            <div className="flex justify-center mb-4 float-animation">
              <svg width="60" height="60" viewBox="0 0 100 100" className="opacity-80">
                <defs>
                  <linearGradient id="planetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#818CF8', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#C084FC', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="25" fill="url(#planetGradient)" opacity="0.8"/>
                <ellipse cx="50" cy="50" rx="45" ry="10" fill="none" stroke="#A78BFA" strokeWidth="2" opacity="0.6"/>
                <circle cx="30" cy="35" r="3" fill="white" opacity="0.4"/>
              </svg>
            </div>
            
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-3">
              Today
            </h1>
            <p className="text-sm text-gray-500 italic font-light">
              A small moment in an infinite universe
            </p>
          </div>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What matters right now?"
              className="flex-1 px-5 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white shadow-sm"
            />
            <button
              onClick={addTodo}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white px-7 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-20">
                <div className="mb-6">
                  {/* Enhanced empty state illustration */}
                  <svg width="120" height="120" viewBox="0 0 100 100" className="mx-auto opacity-40">
                    <defs>
                      <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#A78BFA', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#C084FC', stopOpacity: 0.4}} />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#circleGradient)" strokeWidth="2"/>
                    <circle cx="50" cy="50" r="30" fill="none" stroke="url(#circleGradient)" strokeWidth="1.5" opacity="0.7"/>
                    <circle cx="50" cy="50" r="20" fill="none" stroke="url(#circleGradient)" strokeWidth="1" opacity="0.5"/>
                    <circle cx="50" cy="50" r="3" fill="#A78BFA" opacity="0.8"/>
                    {/* Small orbiting dots */}
                    <circle cx="50" cy="10" r="1.5" fill="#C084FC"/>
                    <circle cx="90" cy="50" r="1.5" fill="#818CF8"/>
                    <circle cx="50" cy="90" r="1.5" fill="#F0ABFC"/>
                  </svg>
                </div>
                <p className="text-gray-400 text-lg font-light">The blank canvas awaits</p>
                <p className="text-gray-300 text-xs mt-2">Each task is a star in your constellation</p>
              </div>
            ) : (
              todos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                    justCompleted === todo.id ? 'completion-pulse' : ''
                  } ${
                    todo.completed 
                      ? 'bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border-2 border-emerald-300 shadow-sm' 
                      : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-300 hover:shadow-md'
                  } shadow-sm`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all transform hover:scale-110 ${
                      todo.completed
                        ? 'bg-gradient-to-br from-emerald-400 to-teal-500 border-emerald-500 shadow-md'
                        : 'border-purple-400 hover:border-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    {todo.completed && <Check size={16} />}
                  </button>
                  
                  <span
                    className={`flex-1 ${
                      todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                  
                  {justCompleted === todo.id && (
                    <span className="text-xl">✨</span>
                  )}
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors transform hover:scale-110"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-purple-100">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 shadow-sm"></div>
                    <span className="text-gray-600 font-medium">
                      {completedCount} of {totalCount} complete
                    </span>
                  </div>
                </div>
                
                {/* Enhanced progress constellation */}
                <div className="flex gap-1.5 justify-center items-center">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        todo.completed 
                          ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md' 
                          : 'bg-gray-200 border border-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
                
                {completedCount === totalCount && totalCount > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold">
                      ✨ Everything complete — well done ✨
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 italic font-light">
              {totalCount === 0 ? "Each action ripples forward through time" : "One task at a time, one moment at a time"}
            </p>
            <p className="text-xs text-gray-300 mt-2">💾 Your tasks are saved automatically</p>
            {totalCount > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Clear all tasks? This cannot be undone.')) {
                    setTodos([]);
                  }
                }}
                className="mt-3 text-xs text-gray-400 hover:text-red-500 underline transition-colors"
              >
                Clear all tasks
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
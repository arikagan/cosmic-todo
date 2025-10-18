import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, FileText } from 'lucide-react';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Load todos from localStorage on initial render with migration from old format
  const [todos, setTodos] = useState(() => {
    if (typeof window !== 'undefined') {
      // Migration: Always check for old data from work/personal tabs, even if cosmicTodos exists
      // This handles the edge case where a partial migration occurred
      const oldWorkTodos = localStorage.getItem('cosmicTodosWork');
      const oldPersonalTodos = localStorage.getItem('cosmicTodosPersonal');
      const currentTodos = localStorage.getItem('cosmicTodos');

      // If old data exists, we need to migrate/merge it
      if (oldWorkTodos || oldPersonalTodos) {
        console.log('Found old todo data - performing migration...');

        const workTasks = oldWorkTodos ? JSON.parse(oldWorkTodos) : [];
        const personalTasks = oldPersonalTodos ? JSON.parse(oldPersonalTodos) : [];
        const existingTasks = currentTodos ? JSON.parse(currentTodos) : [];

        console.log(`Found: ${workTasks.length} work tasks, ${personalTasks.length} personal tasks, ${existingTasks.length} current tasks`);

        // Merge all three sources
        const allTasks = [...existingTasks, ...workTasks, ...personalTasks];

        // Remove duplicates by ID (keep first occurrence)
        const uniqueTasks = allTasks.reduce((acc, todo) => {
          if (!acc.find(t => t.id === todo.id)) {
            acc.push(todo);
          }
          return acc;
        }, []);

        // Convert to new format with column property
        const migratedTodos = uniqueTasks.map(todo => ({
          ...todo,
          // Add column property if it doesn't exist
          // Use completed status to determine column
          column: todo.column || (todo.completed ? 'completed' : 'inbox')
        }));

        // Save migrated data
        localStorage.setItem('cosmicTodos', JSON.stringify(migratedTodos));

        // Clean up old keys
        localStorage.removeItem('cosmicTodosWork');
        localStorage.removeItem('cosmicTodosPersonal');

        console.log(`✅ Migration complete! Recovered ${migratedTodos.length} todos (${uniqueTasks.length - allTasks.length} duplicates removed)`);

        return migratedTodos;
      }

      // No old data, just return current data
      if (currentTodos) {
        return JSON.parse(currentTodos);
      }

      return [];
    }
    return [];
  });

  const [inputValue, setInputValue] = useState('');
  const [justCompleted, setJustCompleted] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [editingTitle, setEditingTitle] = useState(null);
  const [titleInput, setTitleInput] = useState('');
  const [editingColumnTitle, setEditingColumnTitle] = useState(null);
  const [columnTitleInput, setColumnTitleInput] = useState('');
  const [showArchive, setShowArchive] = useState(false);

  // Column titles stored in localStorage
  const [columnTitles, setColumnTitles] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cosmicColumnTitles');
      return saved ? JSON.parse(saved) : {
        inbox: '📥 Inbox',
        duckbill: '🦆 Duckbill',
        waiting: '⏳ Waiting',
        completed: '✅ Completed'
      };
    }
    return {
      inbox: '📥 Inbox',
      duckbill: '🦆 Duckbill',
      waiting: '⏳ Waiting',
      completed: '✅ Completed'
    };
  });

  // Archived tasks stored in localStorage
  const [archivedTasks, setArchivedTasks] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cosmicArchivedTasks');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Add ALL styles to the document - including Tailwind-like utilities
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

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

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      @keyframes completionPulse {
        0% {
          transform: scale(1);
        }
        30% {
          transform: scale(1.08);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }

      @keyframes celebrate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(-500px) rotate(720deg);
          opacity: 0;
        }
      }

      @keyframes bounceIn {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
          opacity: 1;
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

      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      .celebrate-particle {
        animation: celebrate 2s ease-out forwards;
      }

      .bounce-in {
        animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      /* Custom scrollbar styles */
      .overflow-y-auto::-webkit-scrollbar {
        width: 6px;
      }

      .overflow-y-auto::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
      }

      .overflow-y-auto::-webkit-scrollbar-thumb {
        background: rgba(139, 92, 246, 0.3);
        border-radius: 10px;
      }

      .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background: rgba(139, 92, 246, 0.5);
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

  // Save column titles to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cosmicColumnTitles', JSON.stringify(columnTitles));
    }
  }, [columnTitles]);

  // Save archived tasks to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cosmicArchivedTasks', JSON.stringify(archivedTasks));
      console.log('📦 Archived tasks saved:', archivedTasks.length, 'tasks in archive');
    }
  }, [archivedTasks]);

  // Auto-archive on Mondays - check and archive completed tasks from last week
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const lastArchiveDate = localStorage.getItem('cosmicLastArchiveDate');
      const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format

      // Check if it's Monday (dayOfWeek === 1) and we haven't archived yet today
      if (dayOfWeek === 1 && lastArchiveDate !== todayStr) {
        console.log('🗓️ It\'s Monday! Checking for tasks to auto-archive...');

        const completedTasks = todos.filter(t => t.column === 'completed');

        if (completedTasks.length > 0) {
          console.log(`📦 Auto-archiving ${completedTasks.length} completed tasks from last week`);

          // Archive completed tasks
          const tasksToArchive = completedTasks.map(task => ({
            ...task,
            archivedAt: new Date().toISOString(),
            archivedReason: 'auto-monday'
          }));

          // Add to archive
          setArchivedTasks(prev => [...prev, ...tasksToArchive]);

          // Remove from active todos
          setTodos(prev => prev.filter(t => t.column !== 'completed'));

          // Update last archive date
          localStorage.setItem('cosmicLastArchiveDate', todayStr);

          console.log('✅ Auto-archive complete!');
        } else {
          console.log('ℹ️ No completed tasks to archive');
          // Still update the date so we don't check again today
          localStorage.setItem('cosmicLastArchiveDate', todayStr);
        }
      }
    }
  }, [todos]); // Run when todos change (including on initial load)

  // Check for completion and trigger celebration
  useEffect(() => {
    const completedCount = todos.filter(t => t.column === 'completed').length;
    const totalCount = todos.length;

    if (totalCount > 0 && completedCount === totalCount) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
  }, [todos]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === 'fasterprogress1') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
      setPasswordInput('');
    }
  };

  const handleUnlockClick = () => {
    if (passwordInput.trim() === 'fasterprogress1') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
      setPasswordInput('');
    }
  };

  const addTodo = () => {
    if (inputValue.trim()) {
      // Find the highest order in the inbox column
      const inboxTodos = todos.filter(t => t.column === 'inbox');
      const maxOrder = inboxTodos.length > 0 ? Math.max(...inboxTodos.map(t => t.order || 0)) : -1;

      // Add new task at the top (lowest order number)
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        column: 'inbox', // New tasks start in inbox
        notes: '',
        order: maxOrder + 1
      };

      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);

    if (todo && todo.column !== 'completed') {
      // Mark as complete and move to completed column
      setJustCompleted(id);
      setTimeout(() => {
        setTodos(todos.map(t =>
          t.id === id ? { ...t, column: 'completed' } : t
        ));
        setTimeout(() => setJustCompleted(null), 500);
      }, 800);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateNotes = (id, notes) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, notes } : todo
    ));
  };

  const updateTitle = (id, text) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ));
  };

  // Convert URLs in text to clickable links
  const linkifyText = (text) => {
    if (!text) return text;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const handleDragStart = (e, todo) => {
    setDraggedItem(todo);
    setDraggedFromColumn(todo.column);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, overTodo, targetColumn) => {
    e.preventDefault();
    if (!draggedItem || !overTodo) return;

    // Only allow reordering within the same column
    if (draggedItem.column === targetColumn && draggedItem.id !== overTodo.id) {
      setDragOverIndex(overTodo.id);
    }
  };

  const handleDropOnTask = (overTodo, targetColumn) => {
    if (!draggedItem) return;

    const isSameColumn = draggedItem.column === targetColumn;

    if (isSameColumn) {
      // Reordering within the same column
      const columnTodos = todos.filter(t => t.column === targetColumn);
      const draggedIndex = columnTodos.findIndex(t => t.id === draggedItem.id);
      const overIndex = columnTodos.findIndex(t => t.id === overTodo.id);

      if (draggedIndex !== overIndex) {
        // Reorder the tasks
        const reordered = [...columnTodos];
        const [removed] = reordered.splice(draggedIndex, 1);
        reordered.splice(overIndex, 0, removed);

        // Update order property
        const reorderedWithOrder = reordered.map((todo, index) => ({
          ...todo,
          order: index
        }));

        // Merge with other columns
        const otherTodos = todos.filter(t => t.column !== targetColumn);
        setTodos([...otherTodos, ...reorderedWithOrder]);
      }
    } else {
      // Moving to a different column
      const columnTodos = todos.filter(t => t.column === targetColumn);
      const overIndex = columnTodos.findIndex(t => t.id === overTodo.id);

      // Update the dragged todo's column and insert at the drop position
      const updatedDraggedTodo = {
        ...draggedItem,
        column: targetColumn,
        order: overIndex
      };

      // Remove from old position
      const todosWithoutDragged = todos.filter(t => t.id !== draggedItem.id);

      // Get tasks in target column and insert at position
      const targetColumnTodos = todosWithoutDragged.filter(t => t.column === targetColumn);
      targetColumnTodos.splice(overIndex, 0, updatedDraggedTodo);

      // Reindex
      const reindexed = targetColumnTodos.map((todo, index) => ({
        ...todo,
        order: index
      }));

      // Merge with other columns
      const otherTodos = todosWithoutDragged.filter(t => t.column !== targetColumn);
      setTodos([...otherTodos, ...reindexed]);
    }

    setDraggedItem(null);
    setDraggedFromColumn(null);
    setDragOverIndex(null);
  };

  const handleDropOnColumn = (targetColumn) => {
    if (!draggedItem) return;

    // Drop on empty area of column - add to end
    const updatedTodo = {
      ...draggedItem,
      column: targetColumn
    };

    setTodos(todos.map(t =>
      t.id === draggedItem.id ? updatedTodo : t
    ));

    setDraggedItem(null);
    setDraggedFromColumn(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedFromColumn(null);
    setDragOverIndex(null);
  };

  const updateColumnTitle = (columnName, newTitle) => {
    setColumnTitles({
      ...columnTitles,
      [columnName]: newTitle
    });
  };

  // Manual archive - move all completed tasks to archive
  const archiveCompleted = () => {
    const completedTasks = todos.filter(t => t.column === 'completed');

    if (completedTasks.length === 0) {
      alert('No completed tasks to archive');
      return;
    }

    // Confirm before archiving
    const confirmArchive = window.confirm(
      `Archive ${completedTasks.length} completed task${completedTasks.length === 1 ? '' : 's'}?\n\n` +
      `Tasks will be safely stored in the archive and can be viewed anytime.`
    );

    if (!confirmArchive) {
      console.log('❌ Archive cancelled by user');
      return;
    }

    console.log(`📦 Manually archiving ${completedTasks.length} completed tasks`);

    // Archive completed tasks with metadata
    const tasksToArchive = completedTasks.map(task => ({
      ...task,
      archivedAt: new Date().toISOString(),
      archivedReason: 'manual'
    }));

    // Add to archive
    setArchivedTasks(prev => [...prev, ...tasksToArchive]);

    // Remove from active todos (NOT delete - they're in archive!)
    setTodos(prev => prev.filter(t => t.column !== 'completed'));

    console.log('✅ Archive successful! Tasks safely stored.');
    alert(`✅ Archived ${completedTasks.length} task${completedTasks.length === 1 ? '' : 's'} successfully!`);
  };

  // Restore a task from archive back to completed
  const restoreFromArchive = (taskId) => {
    const taskToRestore = archivedTasks.find(t => t.id === taskId);

    if (!taskToRestore) {
      console.error('❌ Task not found in archive');
      return;
    }

    console.log('♻️ Restoring task from archive:', taskToRestore.text);

    // Remove archived metadata and add back to todos
    const { archivedAt, archivedReason, ...cleanTask } = taskToRestore;
    setTodos(prev => [...prev, cleanTask]);

    // Remove from archive
    setArchivedTasks(prev => prev.filter(t => t.id !== taskId));

    console.log('✅ Task restored successfully');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Group todos by column and sort by order
  const inboxTodos = todos.filter(t => t.column === 'inbox').sort((a, b) => (a.order || 0) - (b.order || 0));
  const duckbillTodos = todos.filter(t => t.column === 'duckbill').sort((a, b) => (a.order || 0) - (b.order || 0));
  const waitingTodos = todos.filter(t => t.column === 'waiting').sort((a, b) => (a.order || 0) - (b.order || 0));
  const completedTodos = todos.filter(t => t.column === 'completed').sort((a, b) => (a.order || 0) - (b.order || 0));

  const columnConfigs = [
    { name: 'inbox', title: columnTitles.inbox, todos: inboxTodos, gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200' },
    { name: 'duckbill', title: columnTitles.duckbill, todos: duckbillTodos, gradient: 'from-yellow-50 to-orange-50', border: 'border-yellow-200' },
    { name: 'waiting', title: columnTitles.waiting, todos: waitingTodos, gradient: 'from-purple-50 to-pink-50', border: 'border-purple-200' },
    { name: 'completed', title: columnTitles.completed, todos: completedTodos, gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200' },
  ];

  const renderTodo = (todo, columnName) => {
    const isBeingCompleted = justCompleted === todo.id;
    const isCompleted = todo.column === 'completed';

    return (
      <div
        key={todo.id}
        draggable
        onDragStart={(e) => handleDragStart(e, todo)}
        onDragOver={(e) => handleDragOver(e, todo, columnName)}
        onDrop={(e) => {
          e.stopPropagation();
          handleDropOnTask(todo, columnName);
        }}
        onDragEnd={handleDragEnd}
        className={`${
          isBeingCompleted ? 'completion-pulse' : ''
        } ${
          draggedItem?.id === todo.id ? 'opacity-50' : ''
        } ${
          dragOverIndex === todo.id ? 'border-t-4 border-purple-500' : ''
        } mb-2`}
      >
        <div
          className={`bg-white bg-opacity-95 backdrop-blur-sm border-2 ${
            isCompleted ? 'border-pink-400 border-opacity-60' : 'border-purple-300 border-opacity-50'
          } hover:border-purple-400 hover:border-opacity-80 hover:shadow-lg shadow-md rounded-xl transition-all cursor-move hover:bg-opacity-100`}
        >
          <div className="flex items-center gap-2 p-3">
            {/* Smaller, more elegant checkbox */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!isCompleted) toggleTodo(todo.id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                isCompleted
                  ? 'bg-gradient-to-br from-purple-400 to-pink-500 border-purple-400'
                  : 'border-purple-300 hover:border-purple-500 hover:bg-purple-50'
              }`}
            >
              {(isBeingCompleted || isCompleted) && <Check size={12} className="text-white" />}
            </button>

            {/* Editable title */}
            {editingTitle === todo.id ? (
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onBlur={() => {
                  if (titleInput.trim()) {
                    updateTitle(todo.id, titleInput);
                  }
                  setEditingTitle(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (titleInput.trim()) {
                      updateTitle(todo.id, titleInput);
                    }
                    setEditingTitle(null);
                  }
                  if (e.key === 'Escape') {
                    setEditingTitle(null);
                  }
                }}
                onMouseDown={(e) => e.stopPropagation()}
                className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm text-gray-800"
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 text-sm cursor-pointer ${
                  isCompleted ? 'line-through text-gray-400' : 'text-gray-800 hover:text-purple-600'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCompleted) {
                    setEditingTitle(todo.id);
                    setTitleInput(todo.text);
                  }
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {todo.text}
              </span>
            )}

            {isBeingCompleted && (
              <span className="text-xl">✨</span>
            )}

            {/* Notes indicator - only show if has notes */}
            {todo.notes && !editingNote && (
              <FileText size={12} className="flex-shrink-0 text-purple-400" />
            )}

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {/* Inline notes for short notes */}
          {todo.notes && !editingNote && todo.notes.length <= 100 && (
            <div
              className="px-3 pb-2 text-xs text-gray-500 cursor-pointer hover:text-purple-600 transition-colors"
              onClick={() => {
                setEditingNote(todo.id);
                setNoteInput(todo.notes);
              }}
              title="Click to edit"
            >
              {linkifyText(todo.notes)}
            </div>
          )}

          {/* Expandable notes for longer notes */}
          {todo.notes && !editingNote && todo.notes.length > 100 && (
            <div className="px-3 pb-2">
              <button
                onClick={() => setExpandedTask(expandedTask === todo.id ? null : todo.id)}
                className="text-xs text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
              >
                <FileText size={12} />
                {expandedTask === todo.id ? 'Hide' : 'Show'} notes
              </button>
              {expandedTask === todo.id && (
                <div
                  className="mt-2 text-xs text-gray-600 whitespace-pre-wrap bg-purple-50 bg-opacity-50 p-2 rounded cursor-pointer hover:bg-opacity-70 transition-all"
                  onClick={() => {
                    setEditingNote(todo.id);
                    setNoteInput(todo.notes);
                  }}
                  title="Click to edit"
                >
                  {linkifyText(todo.notes)}
                </div>
              )}
            </div>
          )}

          {/* Note editing mode */}
          {editingNote === todo.id && (
            <div className="px-3 pb-3 pt-2">
              <textarea
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                onBlur={() => {
                  updateNotes(todo.id, noteInput);
                  setEditingNote(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setEditingNote(null);
                    setNoteInput('');
                  }
                  if (e.key === 'Enter' && e.metaKey) {
                    updateNotes(todo.id, noteInput);
                    setEditingNote(null);
                  }
                }}
                placeholder="Add notes, links, or context... (⌘+Enter to save, Esc to cancel)"
                className="w-full px-3 py-2 border border-purple-300 border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs resize-none bg-white bg-opacity-95"
                rows="3"
                autoFocus
              />
              <div className="text-xs text-gray-400 mt-1">
                ⌘+Enter to save • Esc to cancel
              </div>
            </div>
          )}

          {/* Add note button - only show when no notes */}
          {!todo.notes && !editingNote && (
            <div className="px-3 pb-2">
              <button
                onClick={() => {
                  setEditingNote(todo.id);
                  setNoteInput('');
                }}
                className="text-xs text-gray-300 hover:text-purple-400 transition-colors flex items-center gap-1"
                title="Add note"
              >
                <FileText size={12} className="opacity-60" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Password screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center px-4">
        <CosmicDots />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{animationDuration: '10s'}}></div>

        <div className="bg-white bg-opacity-98 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-2 border-purple-200 border-opacity-50 max-w-md w-full relative z-10">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4 float-animation">
              <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-80">
                <defs>
                  <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#818CF8', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#C084FC', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <rect x="30" y="45" width="40" height="35" rx="5" fill="url(#lockGradient)" opacity="0.8"/>
                <path d="M 35 45 L 35 35 Q 35 20 50 20 Q 65 20 65 35 L 65 45" fill="none" stroke="url(#lockGradient)" strokeWidth="6" opacity="0.8"/>
                <circle cx="50" cy="62" r="4" fill="white" opacity="0.8"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2">
              Enter Password
            </h1>
            <p className="text-sm text-gray-500 italic font-light">
              Protected cosmic space
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit}>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className="w-full px-5 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white shadow-sm pr-24"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                {showPassword ? '👁️ Hide' : '👁️ Show'}
              </button>
            </div>
            <button
              type="submit"
              onClick={handleUnlockClick}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white px-7 py-3 rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 py-8 px-4 relative overflow-hidden">
      <CosmicDots />
      <ShootingStars />

      {/* Enhanced nebula effects with more layers */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{animationDuration: '8s'}}></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-40 animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl opacity-35 animate-pulse" style={{animationDuration: '12s', animationDelay: '4s'}}></div>
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{animationDuration: '15s', animationDelay: '1s'}}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Celebration overlay */}
        {showCelebration && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            <div className="bounce-in text-center">
              <div className="text-6xl mb-2">✨</div>
              <div className="text-2xl font-semibold text-white drop-shadow-lg">
                All complete
              </div>
            </div>

            {/* Subtle sparkles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="celebrate-particle absolute"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`,
                  fontSize: `${Math.random() * 15 + 15}px`,
                  animationDelay: `${Math.random() * 0.3}s`,
                  animationDuration: '1.5s'
                }}
              >
                ✨
              </div>
            ))}
          </div>
        )}

        <div className="bg-white bg-opacity-20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-purple-300 border-opacity-30">

          <div className="text-center mb-6">
            {/* Title with inline floating planet */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="float-animation">
                <svg width="50" height="50" viewBox="0 0 100 100" className="opacity-90">
                  <defs>
                    <linearGradient id="planetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#818CF8', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#C084FC', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="25" fill="url(#planetGradient)" opacity="0.9"/>
                  <ellipse cx="50" cy="50" rx="45" ry="10" fill="none" stroke="#A78BFA" strokeWidth="2" opacity="0.8"/>
                  <circle cx="30" cy="35" r="3" fill="white" opacity="0.6"/>
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Cosmic Tasks
              </h1>
            </div>
            <p className="text-sm text-purple-100 italic font-light drop-shadow">
              A small moment in an infinite universe
            </p>
          </div>

          <div className="flex gap-2 mb-6 max-w-2xl mx-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What matters right now?"
              className="flex-1 px-4 py-2 border-2 border-purple-300 border-opacity-40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white bg-opacity-90 backdrop-blur-sm shadow-lg text-sm placeholder-purple-300"
            />
            <button
              onClick={addTodo}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus size={18} />
              Add
            </button>
          </div>

          {/* 4-column layout */}
          <div className="grid grid-cols-4 gap-4">
            {columnConfigs.map((config) => (
              <div
                key={config.name}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropOnColumn(config.name)}
                className={`bg-white bg-opacity-30 backdrop-blur-md border-2 ${config.border} border-opacity-50 rounded-2xl p-4 h-[calc(100vh-320px)] min-h-[400px] max-h-[600px] flex flex-col transition-all shadow-xl ${
                  draggedItem && draggedFromColumn !== config.name ? 'ring-2 ring-purple-400 ring-opacity-60 bg-opacity-40' : ''
                }`}
              >
                {editingColumnTitle === config.name ? (
                  <input
                    type="text"
                    value={columnTitleInput}
                    onChange={(e) => setColumnTitleInput(e.target.value)}
                    onBlur={() => {
                      if (columnTitleInput.trim()) {
                        updateColumnTitle(config.name, columnTitleInput);
                      }
                      setEditingColumnTitle(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (columnTitleInput.trim()) {
                          updateColumnTitle(config.name, columnTitleInput);
                        }
                        setEditingColumnTitle(null);
                      }
                      if (e.key === 'Escape') {
                        setEditingColumnTitle(null);
                      }
                    }}
                    className="text-sm font-bold text-gray-700 mb-3 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                    autoFocus
                  />
                ) : (
                  <div className="mb-3">
                    <h2
                      className="text-sm font-bold text-white drop-shadow-md flex items-center gap-2 cursor-pointer hover:text-purple-200 transition-colors"
                      onClick={() => {
                        setEditingColumnTitle(config.name);
                        setColumnTitleInput(config.title);
                      }}
                    >
                      <span>{config.title}</span>
                      <span className="text-xs font-normal text-purple-200">({config.todos.length})</span>
                    </h2>

                    {/* Archive controls - only show for completed column */}
                    {config.name === 'completed' && (
                      <div className="mt-2 flex gap-1">
                        {/* Archive All button */}
                        {config.todos.length > 0 && (
                          <button
                            onClick={archiveCompleted}
                            className="flex-1 text-xs px-2 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-sm hover:shadow flex items-center justify-center gap-1"
                            title="Archive all completed tasks"
                          >
                            <span>📦</span>
                            <span className="font-medium">Archive ({config.todos.length})</span>
                          </button>
                        )}

                        {/* View Archive button */}
                        {archivedTasks.length > 0 && (
                          <button
                            onClick={() => setShowArchive(true)}
                            className="flex-1 text-xs px-2 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-sm hover:shadow flex items-center justify-center gap-1"
                            title="View archived tasks"
                          >
                            <span>👁️</span>
                            <span className="font-medium">View ({archivedTasks.length})</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1">
                  {config.todos.length === 0 ? (
                    <div className="text-center py-12 text-xs text-purple-200 italic drop-shadow">
                      Drop tasks here
                    </div>
                  ) : (
                    config.todos.map((todo) => renderTodo(todo, config.name))
                  )}
                </div>
              </div>
            ))}
          </div>

          {todos.length > 0 && (
            <div className="mt-8 pt-6 border-t-2 border-purple-300 border-opacity-30">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white drop-shadow-lg">
                    {completedTodos.length}
                  </div>
                  <div className="text-xs text-purple-200">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white drop-shadow-lg">
                    {todos.length - completedTodos.length}
                  </div>
                  <div className="text-xs text-purple-200">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white drop-shadow-lg">
                    {todos.length}
                  </div>
                  <div className="text-xs text-purple-200">Total</div>
                </div>

                {completedTodos.length === todos.length && todos.length > 0 && (
                  <div className="text-2xl animate-bounce">
                    🎉
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-purple-200 italic font-light drop-shadow">
              {todos.length === 0 ? "Each action ripples forward through time" : "Drag to reorder • Click to edit"}
            </p>
          </div>
        </div>

        {/* Archive Modal */}
        {showArchive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                    📦 Archive
                  </h2>
                  <button
                    onClick={() => setShowArchive(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {archivedTasks.length} archived task{archivedTasks.length === 1 ? '' : 's'}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {archivedTasks.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    No archived tasks yet
                  </div>
                ) : (
                  <div className="space-y-2">
                    {archivedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-start justify-between gap-3"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Check size={12} className="text-purple-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700 line-through">{task.text}</span>
                          </div>
                          {task.notes && (
                            <div className="text-xs text-gray-500 ml-5 mt-1 bg-white p-2 rounded border border-gray-100">
                              {task.notes}
                            </div>
                          )}
                          <div className="text-xs text-gray-400 ml-5 mt-1">
                            Archived: {new Date(task.archivedAt).toLocaleDateString()}
                            {task.archivedReason === 'auto-monday' && ' (auto-Monday)'}
                          </div>
                        </div>
                        <button
                          onClick={() => restoreFromArchive(task.id)}
                          className="flex-shrink-0 text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded hover:bg-purple-200 transition-colors"
                          title="Restore to completed"
                        >
                          ♻️ Restore
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setShowArchive(false)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

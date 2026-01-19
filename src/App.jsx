import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, FileText, ExternalLink, LogOut, LogIn, Settings } from 'lucide-react';
import { auth, db, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';

// Nebula Flares with manual looping
const NebulaFlares = () => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Restart animations every 30 seconds (longer than any single animation)
    const interval = setInterval(() => {
      setAnimationKey(k => k + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl nebula-flare-1" key={`flare1-${animationKey}`}></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl nebula-flare-2" key={`flare2-${animationKey}`}></div>
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl nebula-flare-3" key={`flare3-${animationKey}`}></div>
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl nebula-flare-4" key={`flare4-${animationKey}`}></div>
    </>
  );
};

// Shooting stars
const ShootingStars = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Top area */}
    <div className="shooting-star absolute top-10 right-20 w-1 h-1 bg-white rounded-full" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
    <div className="shooting-star absolute top-40 right-60 w-0.5 h-0.5 bg-blue-200 rounded-full" style={{animationDelay: '5s', animationDuration: '4s'}}></div>
    <div className="shooting-star absolute top-20 left-40 w-1 h-1 bg-purple-200 rounded-full" style={{animationDelay: '2s', animationDuration: '3.5s'}}></div>

    {/* Middle area */}
    <div className="shooting-star absolute top-1/3 right-10 w-0.5 h-0.5 bg-pink-200 rounded-full" style={{animationDelay: '8s', animationDuration: '3s'}}></div>
    <div className="shooting-star absolute top-1/2 left-20 w-1 h-1 bg-cyan-200 rounded-full" style={{animationDelay: '3s', animationDuration: '4s'}}></div>
    <div className="shooting-star absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-indigo-200 rounded-full" style={{animationDelay: '6s', animationDuration: '3.5s'}}></div>

    {/* Bottom area */}
    <div className="shooting-star absolute bottom-40 right-40 w-1 h-1 bg-yellow-100 rounded-full" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
    <div className="shooting-star absolute bottom-20 left-60 w-0.5 h-0.5 bg-purple-300 rounded-full" style={{animationDelay: '4s', animationDuration: '4s'}}></div>
    <div className="shooting-star absolute bottom-60 right-80 w-1 h-1 bg-blue-300 rounded-full" style={{animationDelay: '7s', animationDuration: '3.5s'}}></div>
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
  // Authentication state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Load todos from Firebase (or localStorage for migration)
  const [todos, setTodos] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [justCompleted, setJustCompleted] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [detailModalTask, setDetailModalTask] = useState(null);
  const [subtaskInput, setSubtaskInput] = useState('');

  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverTaskId, setDragOverTaskId] = useState(null); // Track which task we're hovering over
  const [dragOverColumn, setDragOverColumn] = useState(null); // Track which column we're hovering over

  // Column titles
  const [columnTitles, setColumnTitles] = useState({
    inbox: '📥 Inbox',
    upnext: '⏭️ Up Next',
    waiting: '⏳ Waiting',
    duckbill: '🤖 Assistant',
    completed: '✅ Completed'
  });

  // Archived tasks
  const [archivedTasks, setArchivedTasks] = useState([]);

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

      @keyframes nebulaFlare {
        0% {
          opacity: 0;
        }
        3% {
          opacity: 0.95;
        }
        40% {
          opacity: 0.95;
        }
        70% {
          opacity: 0.6;
        }
        85% {
          opacity: 0.3;
        }
        100% {
          opacity: 0;
        }
      }

      @keyframes nebulaFlareLight {
        0% {
          opacity: 0;
        }
        3% {
          opacity: 0.75;
        }
        40% {
          opacity: 0.75;
        }
        70% {
          opacity: 0.45;
        }
        85% {
          opacity: 0.23;
        }
        100% {
          opacity: 0;
        }
      }

      @keyframes nebulaFlareLighter {
        0% {
          opacity: 0;
        }
        3% {
          opacity: 0.85;
        }
        40% {
          opacity: 0.85;
        }
        70% {
          opacity: 0.5;
        }
        85% {
          opacity: 0.25;
        }
        100% {
          opacity: 0;
        }
      }

      .nebula-flare {
        transition: opacity 0.1s ease;
      }

      .nebula-flare-1 {
        animation: nebulaFlare 10s ease-out;
        animation-delay: 0s;
        opacity: 0;
      }

      .nebula-flare-2 {
        animation: nebulaFlare 10s ease-out;
        animation-delay: 6s;
        opacity: 0;
      }

      .nebula-flare-3 {
        animation: nebulaFlareLight 10s ease-out;
        animation-delay: 12s;
        opacity: 0;
      }

      .nebula-flare-4 {
        animation: nebulaFlareLighter 10s ease-out;
        animation-delay: 18s;
        opacity: 0;
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

  // Authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        console.log('✅ User signed in:', currentUser.email);
      } else {
        console.log('❌ User signed out');
      }
    });
    return () => unsubscribe();
  }, []);

  // Improved migration function - can be called manually or automatically
  const migrateLocalDataToFirebase = async (forceResync = false) => {
    if (!user) {
      console.log('❌ Cannot migrate: No user signed in');
      return { success: false, message: 'No user signed in' };
    }

    const migrationKey = `migrated_${user.uid}`;
    const alreadyMigrated = localStorage.getItem(migrationKey);

    // Skip if already migrated (unless forcing)
    if (alreadyMigrated && !forceResync) {
      console.log('✅ Data already migrated for this user');
      return { success: true, message: 'Already migrated', skipped: true };
    }

    if (forceResync) {
      console.log('🔄 FORCE RE-SYNC: Ignoring migration flag');
    }

    console.log('🔍 Checking localStorage for data to migrate...');

    // Get all local data
    const localTodos = localStorage.getItem('cosmicTodos');
    const localColumnTitles = localStorage.getItem('cosmicColumnTitles');
    const localArchived = localStorage.getItem('cosmicArchivedTasks');

    // Parse the data to check if it actually exists
    const localTodosParsed = localTodos ? JSON.parse(localTodos) : [];
    const localColumnTitlesParsed = localColumnTitles ? JSON.parse(localColumnTitles) : null;
    const localArchivedParsed = localArchived ? JSON.parse(localArchived) : [];

    const hasActualData = localTodosParsed.length > 0 || localArchivedParsed.length > 0;

    console.log('📊 Local data found:', {
      todos: localTodosParsed.length,
      archived: localArchivedParsed.length,
      columnTitles: localColumnTitlesParsed ? 'yes' : 'no',
      hasActualData
    });

    if (!hasActualData && !forceResync) {
      console.log('ℹ️ No tasks found in localStorage - skipping migration (NOT marking as complete)');
      return { success: true, message: 'No data to migrate', skipped: true };
    }

    setSyncing(true);
    console.log('📤 Starting migration to Firebase...');

    try {
      const userDocRef = doc(db, 'users', user.uid);

      // Check if user already has data in Firebase
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const existingData = userDocSnap.data();
        const firebaseTodos = existingData.todos || [];

        console.log('⚠️ User already has data in Firebase:', {
          firebaseTodos: firebaseTodos.length,
          localTodos: localTodosParsed.length
        });
        console.log('🔀 Merging local and Firebase data...');

        // Merge todos (prefer Firebase data, but add any local-only items)
        const mergedTodos = [...firebaseTodos];

        let addedCount = 0;
        localTodosParsed.forEach(localTodo => {
          if (!mergedTodos.find(t => t.id === localTodo.id)) {
            mergedTodos.push(localTodo);
            addedCount++;
          }
        });

        // Merge archived tasks (prefer Firebase data, but add any local-only items)
        const firebaseArchived = existingData.archivedTasks || [];
        const mergedArchived = [...firebaseArchived];

        let addedArchivedCount = 0;
        localArchivedParsed.forEach(localArchived => {
          if (!mergedArchived.find(t => t.id === localArchived.id)) {
            mergedArchived.push(localArchived);
            addedArchivedCount++;
          }
        });

        await setDoc(userDocRef, {
          todos: mergedTodos,
          columnTitles: existingData.columnTitles || localColumnTitlesParsed || columnTitles,
          archivedTasks: mergedArchived,
          lastModified: new Date().toISOString()
        }, { merge: true });

        console.log(`✅ Merge complete: Added ${addedCount} new tasks and ${addedArchivedCount} archived tasks from localStorage`);
        console.log(`📊 Final count: ${mergedTodos.length} total tasks, ${mergedArchived.length} archived tasks in Firebase`);
      } else {
        // No existing Firebase data, upload all local data
        console.log('📤 No Firebase data exists - uploading all local data');

        await setDoc(userDocRef, {
          todos: localTodosParsed,
          columnTitles: localColumnTitlesParsed || columnTitles,
          archivedTasks: localArchivedParsed,
          lastModified: new Date().toISOString()
        });

        console.log(`✅ Upload complete: ${localTodosParsed.length} todos, ${localArchivedParsed.length} archived tasks`);
      }

      // ONLY mark as migrated if we actually found and uploaded data
      if (hasActualData) {
        localStorage.setItem(migrationKey, 'true');
        console.log('✅ Migration flag set - will not auto-migrate again');
      }

      console.log('🎉 Migration successful!');
      return {
        success: true,
        message: `Migrated ${localTodosParsed.length} tasks successfully`,
        taskCount: localTodosParsed.length
      };
    } catch (error) {
      console.error('❌ Migration failed:', error);
      return { success: false, message: error.message };
    } finally {
      setSyncing(false);
    }
  };

  // Auto-migration on first login
  useEffect(() => {
    if (user) {
      migrateLocalDataToFirebase(false); // false = don't force, respect migration flag
    }
  }, [user]);

  // Real-time sync with Firebase
  useEffect(() => {
    if (!user) {
      setTodos([]);
      setArchivedTasks([]);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('📥 Synced from Firebase:', data.todos?.length || 0, 'todos');
        setTodos(data.todos || []);
        setColumnTitles(data.columnTitles || columnTitles);
        setArchivedTasks(data.archivedTasks || []);
      } else {
        console.log('ℹ️ No user data found, initializing...');
        setDoc(userDocRef, {
          todos: [],
          columnTitles: columnTitles,
          archivedTasks: [],
          lastModified: new Date().toISOString()
        });
      }
    }, (error) => {
      console.error('❌ Firebase sync error:', error);
    });

    return () => unsubscribe();
  }, [user]);

  // Auto-archive weekly - archive completed tasks if a Monday has passed since last archive
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format

      // Find the most recent Monday (at start of day)
      const getMostRecentMonday = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = day === 0 ? 6 : day - 1; // Days since Monday (Sunday = 6 days ago)
        d.setDate(d.getDate() - diff);
        d.setHours(0, 0, 0, 0);
        return d;
      };

      const mostRecentMonday = getMostRecentMonday(today);
      const lastArchiveDateStr = localStorage.getItem('cosmicLastArchiveDate');

      // Determine if we should archive:
      // - If never archived before, archive if we're on or past Monday of this week
      // - Otherwise, archive if the last archive was before the most recent Monday
      let shouldArchive = false;
      if (!lastArchiveDateStr) {
        shouldArchive = today >= mostRecentMonday;
      } else {
        const lastArchiveDate = new Date(lastArchiveDateStr);
        shouldArchive = lastArchiveDate < mostRecentMonday;
      }

      if (shouldArchive) {
        console.log('🗓️ A Monday has passed since last archive. Checking for tasks to auto-archive...');

        const completedTasks = todos.filter(t => t.column === 'completed');

        if (completedTasks.length > 0) {
          console.log(`📦 Auto-archiving ${completedTasks.length} completed tasks from last week`);

          // Archive completed tasks
          const tasksToArchive = completedTasks.map(task => ({
            ...task,
            archivedAt: new Date().toISOString(),
            archivedReason: 'auto-weekly'
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
          // Still update the date so we don't check again until next Monday
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


  // Helper function to save data to Firebase
  const saveToFirebase = async (updatedTodos, updatedArchived = null) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        todos: updatedTodos,
        columnTitles: columnTitles,
        archivedTasks: updatedArchived !== null ? updatedArchived : archivedTasks,
        lastModified: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('❌ Failed to save to Firebase:', error);
      alert('Failed to sync with cloud. Please check your connection.');
    }
  };

  const addTodo = async () => {
    if (inputValue.trim()) {
      // Find the lowest order in the inbox column to add new task at top
      const inboxTodos = todos.filter(t => t.column === 'inbox');
      const minOrder = inboxTodos.length > 0 ? Math.min(...inboxTodos.map(t => t.order || 0)) : 0;

      // Add new task at the top (lowest order number)
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        column: 'inbox', // New tasks start in inbox
        notes: '',
        order: minOrder - 1
      };

      const updatedTodos = [newTodo, ...todos];
      setTodos(updatedTodos);
      setInputValue('');
      await saveToFirebase(updatedTodos);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);

    if (todo && todo.column !== 'completed') {
      // Mark as complete and move to completed column
      setJustCompleted(id);
      setTimeout(async () => {
        const updatedTodos = todos.map(t =>
          t.id === id ? { ...t, column: 'completed' } : t
        );
        setTodos(updatedTodos);
        await saveToFirebase(updatedTodos);
        setTimeout(() => setJustCompleted(null), 500);
      }, 800);
    }
  };

  const deleteTodo = async (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    await saveToFirebase(updatedTodos);
  };

  const updateNotes = async (id, notes) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, notes } : todo
    );
    setTodos(updatedTodos);
    await saveToFirebase(updatedTodos);
  };

  const updateTitle = async (id, text) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    );
    setTodos(updatedTodos);
    await saveToFirebase(updatedTodos);
  };

  const addSubtask = async (todoId, subtaskText) => {
    if (!subtaskText.trim()) return;

    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        const subtasks = todo.subtasks || [];
        return {
          ...todo,
          subtasks: [...subtasks, {
            id: Date.now(),
            text: subtaskText,
            completed: false
          }]
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    await saveToFirebase(updatedTodos);
  };

  const toggleSubtask = async (todoId, subtaskId) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId && todo.subtasks) {
        return {
          ...todo,
          subtasks: todo.subtasks.map(st =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          )
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    await saveToFirebase(updatedTodos);
  };

  const deleteSubtask = async (todoId, subtaskId) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId && todo.subtasks) {
        return {
          ...todo,
          subtasks: todo.subtasks.filter(st => st.id !== subtaskId)
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    await saveToFirebase(updatedTodos);
  };

  const moveTaskToColumn = async (todoId, newColumn) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, column: newColumn } : todo
    );
    setTodos(updatedTodos);
    await saveToFirebase(updatedTodos);
  };

  // Simple drag & drop handlers
  const onDragStart = (task) => {
    console.log('🟢 DRAG START:', task.text, 'ID:', task.id);
    setDraggedItem(task);
  };

  const onDragEnd = () => {
    console.log('🔴 DRAG END');
    setDraggedItem(null);
    setDragOverTaskId(null);
    setDragOverColumn(null);
  };

  const onDrop = async (targetColumn, targetTask = null) => {
    if (!draggedItem) return;

    console.log('🎯 DROP:', {
      draggedItem: draggedItem.text,
      targetColumn,
      targetTask: targetTask ? targetTask.text : 'end of column',
      dragOverTaskId
    });

    // Remove dragged item from all tasks first
    const otherTasks = todos.filter(t => t.id !== draggedItem.id);

    // Get tasks in the target column (excluding the dragged item)
    const columnTasks = otherTasks.filter(t => t.column === targetColumn);

    // Update dragged item with new column
    const updated = { ...draggedItem, column: targetColumn };

    let newColumnTasks;

    // Handle different dragOverTaskId formats
    if (dragOverTaskId && typeof dragOverTaskId === 'string') {
      if (dragOverTaskId === 'gap-end') {
        // Drop at end of column
        console.log('📍 Inserting at end of column (gap-end)');
        newColumnTasks = [...columnTasks, updated];
      } else if (dragOverTaskId.startsWith('gap-before-')) {
        // Extract the task ID that comes after this gap
        const beforeTaskId = parseInt(dragOverTaskId.replace('gap-before-', ''));
        const beforeTask = columnTasks.find(t => t.id === beforeTaskId);

        if (beforeTask) {
          const beforeIndex = columnTasks.findIndex(t => t.id === beforeTaskId);
          console.log('📍 Inserting before:', beforeTask.text, 'at index:', beforeIndex);
          newColumnTasks = [
            ...columnTasks.slice(0, beforeIndex),
            updated,
            ...columnTasks.slice(beforeIndex)
          ];
        } else {
          console.log('⚠️ Before-task not found, adding to end');
          newColumnTasks = [...columnTasks, updated];
        }
      } else if (dragOverTaskId.startsWith('after-')) {
        // Extract the actual task ID
        const afterTaskId = parseInt(dragOverTaskId.replace('after-', ''));
        const afterTask = columnTasks.find(t => t.id === afterTaskId);

        if (afterTask) {
          const afterIndex = columnTasks.findIndex(t => t.id === afterTaskId);
          console.log('📍 Inserting after:', afterTask.text, 'at index:', afterIndex + 1);
          newColumnTasks = [
            ...columnTasks.slice(0, afterIndex + 1),
            updated,
            ...columnTasks.slice(afterIndex + 1)
          ];
        } else {
          console.log('⚠️ After-task not found, adding to end');
          newColumnTasks = [...columnTasks, updated];
        }
      } else {
        // It's a regular task ID - insert before it
        const beforeTask = columnTasks.find(t => t.id === parseInt(dragOverTaskId));
        if (beforeTask) {
          const beforeIndex = columnTasks.findIndex(t => t.id === parseInt(dragOverTaskId));
          console.log('📍 Inserting before task ID:', dragOverTaskId, 'at index:', beforeIndex);
          newColumnTasks = [
            ...columnTasks.slice(0, beforeIndex),
            updated,
            ...columnTasks.slice(beforeIndex)
          ];
        } else {
          console.log('⚠️ Task ID not found, adding to end');
          newColumnTasks = [...columnTasks, updated];
        }
      }
    } else if (targetTask && targetTask.id !== draggedItem.id) {
      // Insert before target task
      const targetIndex = columnTasks.findIndex(t => t.id === targetTask.id);
      console.log('📍 Inserting at index:', targetIndex, 'before:', targetTask.text);
      if (targetIndex !== -1) {
        newColumnTasks = [
          ...columnTasks.slice(0, targetIndex),
          updated,
          ...columnTasks.slice(targetIndex)
        ];
      } else {
        // Target not found, add to end
        console.log('⚠️ Target not found, adding to end');
        newColumnTasks = [...columnTasks, updated];
      }
    } else {
      // Drop at end of column
      console.log('📍 Inserting at end of column');
      newColumnTasks = [...columnTasks, updated];
    }

    // Reindex the column tasks
    const reordered = newColumnTasks.map((t, i) => ({ ...t, order: i }));

    // Merge with other columns
    const finalTodos = [...otherTasks.filter(t => t.column !== targetColumn), ...reordered];

    setTodos(finalTodos);
    setDraggedItem(null);
    setDragOverTaskId(null);
    await saveToFirebase(finalTodos);
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

  // Manual archive - move all completed tasks to archive
  const archiveCompleted = async () => {
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

    const updatedArchived = [...archivedTasks, ...tasksToArchive];
    const updatedTodos = todos.filter(t => t.column !== 'completed');

    // Add to archive
    setArchivedTasks(updatedArchived);

    // Remove from active todos (NOT delete - they're in archive!)
    setTodos(updatedTodos);

    await saveToFirebase(updatedTodos, updatedArchived);

    console.log('✅ Archive successful! Tasks safely stored.');
    alert(`✅ Archived ${completedTasks.length} task${completedTasks.length === 1 ? '' : 's'} successfully!`);
  };

  // Restore a task from archive back to completed
  const restoreFromArchive = async (taskId) => {
    const taskToRestore = archivedTasks.find(t => t.id === taskId);

    if (!taskToRestore) {
      console.error('❌ Task not found in archive');
      return;
    }

    console.log('♻️ Restoring task from archive:', taskToRestore.text);

    // Remove archived metadata and add back to todos
    const { archivedAt, archivedReason, ...cleanTask } = taskToRestore;
    const updatedTodos = [...todos, cleanTask];
    const updatedArchived = archivedTasks.filter(t => t.id !== taskId);

    setTodos(updatedTodos);
    setArchivedTasks(updatedArchived);

    await saveToFirebase(updatedTodos, updatedArchived);

    console.log('✅ Task restored successfully');
  };

  // Authentication functions
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('❌ Sign in error:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setTodos([]);
      setArchivedTasks([]);
    } catch (error) {
      console.error('❌ Sign out error:', error);
      alert('Failed to sign out. Please try again.');
    }
  };

  const handleForceResync = async () => {
    const confirmResync = window.confirm(
      'Force re-sync from localStorage?\n\n' +
      'This will merge any tasks found in localStorage with your Firebase data. ' +
      'This is safe and will not delete anything.\n\n' +
      'Check the browser console for detailed logs.'
    );

    if (!confirmResync) {
      console.log('❌ Re-sync cancelled by user');
      return;
    }

    console.log('🔄 FORCE RE-SYNC initiated by user');
    const result = await migrateLocalDataToFirebase(true); // true = force resync

    if (result.success) {
      if (result.skipped) {
        alert(`✅ Re-sync complete!\n\n${result.message}\n\nCheck console for details.`);
      } else {
        alert(`✅ Re-sync successful!\n\nMigrated ${result.taskCount} tasks from localStorage.\n\nCheck console for detailed logs.`);
      }
    } else {
      alert(`❌ Re-sync failed: ${result.message}\n\nCheck console for details.`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Group todos by column and sort by order
  const inboxTodos = todos.filter(t => t.column === 'inbox').sort((a, b) => (a.order || 0) - (b.order || 0));
  const upnextTodos = todos.filter(t => t.column === 'upnext').sort((a, b) => (a.order || 0) - (b.order || 0));
  const waitingTodos = todos.filter(t => t.column === 'waiting').sort((a, b) => (a.order || 0) - (b.order || 0));
  const duckbillTodos = todos.filter(t => t.column === 'duckbill').sort((a, b) => (a.order || 0) - (b.order || 0));
  const completedTodos = todos.filter(t => t.column === 'completed').sort((a, b) => (a.order || 0) - (b.order || 0));

  const columnConfigs = [
    { name: 'inbox', title: columnTitles.inbox, todos: inboxTodos, gradient: 'from-blue-50 to-indigo-50', border: 'border-blue-200' },
    { name: 'upnext', title: columnTitles.upnext, todos: upnextTodos, gradient: 'from-cyan-50 to-sky-50', border: 'border-cyan-200' },
    { name: 'waiting', title: columnTitles.waiting, todos: waitingTodos, gradient: 'from-purple-50 to-pink-50', border: 'border-purple-200' },
    { name: 'duckbill', title: columnTitles.duckbill, todos: duckbillTodos, gradient: 'from-yellow-50 to-orange-50', border: 'border-yellow-200' },
    { name: 'completed', title: columnTitles.completed, todos: completedTodos, gradient: 'from-emerald-50 to-teal-50', border: 'border-emerald-200' },
  ];

  const renderTodo = (todo) => {
    const isBeingCompleted = justCompleted === todo.id;
    const isCompleted = todo.column === 'completed';
    const isDragging = draggedItem?.id === todo.id;

    return (
      <div
        key={todo.id}
        className={`${isBeingCompleted ? 'completion-pulse' : ''} ${isDragging ? 'opacity-40' : ''}`}
        draggable={!isCompleted}
        onDragStart={() => onDragStart(todo)}
        onDragEnd={onDragEnd}
        onDragOver={(e) => {
          e.preventDefault();
          if (draggedItem && draggedItem.id !== todo.id) {
            // Get the bounding rectangle of the card
            const rect = e.currentTarget.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;
            const mouseY = e.clientY;

            // If mouse is in top half, show line before this card
            // If mouse is in bottom half, show line after this card
            if (mouseY < midpoint) {
              // Top half - drop before this card
              if (dragOverTaskId !== todo.id) {
                setDragOverTaskId(todo.id);
              }
            } else {
              // Bottom half - drop after this card
              const afterId = `after-${todo.id}`;
              if (dragOverTaskId !== afterId) {
                setDragOverTaskId(afterId);
              }
            }

            // Also ensure column is set when hovering over a task
            if (dragOverColumn !== todo.column) {
              setDragOverColumn(todo.column);
            }
          }
        }}
      >
        <div
          onClick={(e) => {
            // Don't open modal if clicking on interactive elements
            const target = e.target;
            if (target.tagName === 'BUTTON' ||
                target.tagName === 'INPUT' ||
                target.closest('button')) {
              return;
            }
            setDetailModalTask(todo);
          }}
          className={`bg-white shadow-sm rounded-2xl hover:shadow-xl p-3.5 ${
            isCompleted ? 'cursor-pointer bg-opacity-60' : 'cursor-grab active:cursor-grabbing bg-opacity-95'
          }`}
        >
          {/* Top row: checkbox + title + actions */}
          <div className="flex items-center gap-3">
            {/* Checkbox - hide when dragging */}
            {!isDragging && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCompleted) toggleTodo(todo.id);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-md'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {(isBeingCompleted || isCompleted) && <Check size={12} className="text-white" />}
              </button>
            )}

            {/* Title */}
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-semibold leading-snug ${
                isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
              }`}>
                {todo.text}
              </div>
              {/* Subtask progress indicator */}
              {todo.subtasks && todo.subtasks.length > 0 && (
                <div className="text-xs text-purple-600 mt-1">
                  {todo.subtasks.filter(st => st.completed).length}/{todo.subtasks.length} subtasks
                </div>
              )}
            </div>

            {/* Action icons - hide when dragging */}
            {!isDragging && (
              <div className="flex items-center gap-2 flex-shrink-0">
                {isBeingCompleted && (
                  <span className="text-lg">✨</span>
                )}

                {/* Note indicator */}
                {todo.notes && (
                  <FileText size={14} className="text-purple-400 opacity-70" />
                )}
              </div>
            )}
          </div>

          {/* Preview notes if they exist (truncated) */}
          {todo.notes && (
            <div className="mt-2 ml-7 text-xs text-gray-500 line-clamp-1">
              {todo.notes}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Show loading screen
  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
        <CosmicDots />
        <ShootingStars />
        <NebulaFlares />
        <div className="relative z-10 text-center">
          <div className="float-animation mb-4">
            <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-90 mx-auto">
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
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!user) {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
        <CosmicDots />
        <ShootingStars />
        <NebulaFlares />
        <div className="relative z-10 text-center max-w-md mx-auto p-8">
          <div className="bg-white bg-opacity-20 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
            <div className="float-animation mb-6">
              <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-90 mx-auto">
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
            <h1 className="text-4xl font-bold text-white mb-2">Cosmic Tasks</h1>
            <p className="text-purple-100 mb-8 text-sm italic">
              A small moment in an infinite universe
            </p>
            <p className="text-white mb-6 text-sm">
              Sign in to access your tasks from anywhere
            </p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 py-12 px-4 relative overflow-hidden">
      <CosmicDots />
      <ShootingStars />
      <NebulaFlares />

      <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col">
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

        <div className="bg-white bg-opacity-20 backdrop-blur-xl rounded-3xl shadow-2xl p-6 h-full flex flex-col">

          <div className="text-center mb-4 flex-shrink-0 relative">
            {/* Top right controls */}
            <div className="absolute top-0 right-0 flex items-center gap-3">
              {syncing && (
                <span className="text-xs text-purple-200 animate-pulse">Syncing...</span>
              )}
              <button
                onClick={() => setShowSettings(true)}
                className="text-white hover:text-purple-200 transition-colors flex items-center gap-2 text-sm bg-white bg-opacity-10 hover:bg-opacity-20 px-3 py-1.5 rounded-lg"
                title="Settings"
              >
                <Settings size={16} />
              </button>
              <button
                onClick={handleSignOut}
                className="text-white hover:text-purple-200 transition-colors flex items-center gap-2 text-sm bg-white bg-opacity-10 hover:bg-opacity-20 px-3 py-1.5 rounded-lg"
                title="Sign out"
              >
                <span className="text-xs">{user?.email}</span>
                <LogOut size={16} />
              </button>
            </div>

            {/* Title with inline floating planet */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Cosmic Tasks
              </h1>
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
            </div>
            <p className="text-sm text-purple-100 italic font-light drop-shadow">
              A small moment in an infinite universe
            </p>
          </div>

          <div className="flex gap-3 mb-4 flex-shrink-0 max-w-4xl mx-auto w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What matters right now?"
              className="flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white bg-opacity-90 shadow-md hover:shadow-lg transition-all text-sm placeholder-gray-400"
            />
            <button
              onClick={addTodo}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-105 flex-shrink-0"
            >
              <Plus size={18} />
              Add
            </button>
          </div>

          {/* 5-column layout */}
          <div className="grid grid-cols-5 gap-4 flex-1 min-h-0 overflow-hidden">
            {columnConfigs.map((config) => (
              <div
                key={config.name}
                onDragOver={(e) => {
                  e.preventDefault();
                  // Track which column we're currently over
                  if (dragOverColumn !== config.name) {
                    setDragOverColumn(config.name);
                  }
                }}
                onDragLeave={(e) => {
                  // Clear drag over state when leaving the column
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX;
                  const y = e.clientY;
                  if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
                    setDragOverTaskId(null);
                    setDragOverColumn(null);
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Use dragOverTaskId to determine where to drop
                  const targetTask = dragOverTaskId ? todos.find(t => t.id === dragOverTaskId) : null;
                  onDrop(config.name, targetTask);
                }}
                className={`bg-white bg-opacity-25 backdrop-blur-md rounded-2xl p-4 flex flex-col transition-all shadow-lg hover:shadow-xl min-h-0`}
              >
                <div className="mb-3">
                    <h2 className="text-sm font-bold text-white flex items-center justify-center gap-2">
                      <span>{config.title}</span>
                      <span className="text-xs font-normal text-purple-200">({config.todos.length})</span>
                      {/* Assistant link icon */}
                      {config.name === 'duckbill' && (
                        <a
                          href="https://app.getduckbill.com/app/home"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-200 hover:text-white transition-colors"
                          title="Open Assistant"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </h2>

                    {/* Archive controls - only show for completed column */}
                    {config.name === 'completed' && (
                      <div className="mt-2 flex gap-2">
                        {/* Archive All button */}
                        {config.todos.length > 0 && (
                          <button
                            onClick={archiveCompleted}
                            className="flex-1 text-xs px-3 py-2 bg-purple-500 bg-opacity-90 text-white rounded-lg hover:bg-opacity-100 hover:scale-105 transition-all shadow-md flex items-center justify-center gap-1.5 font-medium"
                            title="Archive all completed tasks"
                          >
                            <span>📦</span>
                            <span>Archive ({config.todos.length})</span>
                          </button>
                        )}

                        {/* View Archive button */}
                        {archivedTasks.length > 0 && (
                          <button
                            onClick={() => setShowArchive(true)}
                            className="flex-1 text-xs px-3 py-2 bg-white bg-opacity-90 text-purple-700 rounded-lg hover:bg-opacity-100 hover:scale-105 transition-all shadow-md flex items-center justify-center gap-1.5 font-medium"
                            title="View archived tasks"
                          >
                            <span>👁️</span>
                            <span>View ({archivedTasks.length})</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                <div
                  className="flex-1 overflow-y-auto overflow-x-hidden pr-1"
                  onDragOver={(e) => {
                    // If we're dragging over the scrollable area (not over a specific task),
                    // clear the dragOverTaskId to show placeholder at bottom
                    if (e.target === e.currentTarget || e.target.closest('.text-center')) {
                      e.preventDefault();
                      setDragOverTaskId(null);
                    }
                  }}
                >
                  {config.todos.length === 0 ? (
                    <>
                      {draggedItem && dragOverColumn === config.name ? (
                        <div className="h-2 flex items-center w-full">
                          <div className="h-0.5 w-full bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                        </div>
                      ) : (
                        <div className="text-center py-12 text-xs text-purple-200 italic drop-shadow">
                          No tasks yet
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {config.todos.map((todo, index) => {
                        const prevTodo = index > 0 ? config.todos[index - 1] : null;
                        const gapId = `gap-before-${todo.id}`;

                        // Show drop line in the gap if we're hovering over it
                        const showDropLineInGap =
                          draggedItem &&
                          dragOverColumn === config.name &&
                          draggedItem.id !== todo.id &&
                          (!prevTodo || draggedItem.id !== prevTodo.id) &&
                          (dragOverTaskId === gapId ||
                           dragOverTaskId === todo.id ||
                           (prevTodo && dragOverTaskId === `after-${prevTodo.id}`));

                        return (
                          <React.Fragment key={todo.id}>
                            {/* Gap element with drag detection */}
                            <div
                              className="h-2 flex items-center"
                              onDragOver={(e) => {
                                e.preventDefault();
                                if (draggedItem) {
                                  if (dragOverTaskId !== gapId) {
                                    setDragOverTaskId(gapId);
                                  }
                                  if (dragOverColumn !== config.name) {
                                    setDragOverColumn(config.name);
                                  }
                                }
                              }}
                            >
                              {showDropLineInGap && (
                                <div className="h-0.5 w-full bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                              )}
                            </div>
                            {renderTodo(todo)}
                          </React.Fragment>
                        );
                      })}
                      {/* Gap at the end */}
                      <div
                        className="h-2 flex-shrink-0 flex items-center"
                        onDragOver={(e) => {
                          e.preventDefault();
                          if (draggedItem) {
                            const endGapId = 'gap-end';
                            if (dragOverTaskId !== endGapId) {
                              setDragOverTaskId(endGapId);
                            }
                            if (dragOverColumn !== config.name) {
                              setDragOverColumn(config.name);
                            }
                          }
                        }}
                      >
                        {draggedItem && dragOverColumn === config.name && (
                          dragOverTaskId === 'gap-end' ||
                          (config.todos.length > 0 && dragOverTaskId === `after-${config.todos[config.todos.length - 1].id}`) ||
                          !dragOverTaskId
                        ) && (
                          <div className="h-0.5 w-full bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Task Detail Modal */}
        {detailModalTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="text"
                    value={detailModalTask.text}
                    onChange={(e) => {
                      updateTitle(detailModalTask.id, e.target.value);
                      setDetailModalTask({ ...detailModalTask, text: e.target.value });
                    }}
                    className="flex-1 text-2xl font-bold text-gray-800 border-none focus:outline-none focus:ring-2 focus:ring-purple-400 rounded px-2 py-1"
                  />
                  <button
                    onClick={() => setDetailModalTask(null)}
                    className="text-gray-400 hover:text-gray-600 text-3xl leading-none ml-4"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-6">
                {/* Notes Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Notes</h3>
                  <textarea
                    value={detailModalTask.notes || ''}
                    onChange={(e) => {
                      updateNotes(detailModalTask.id, e.target.value);
                      setDetailModalTask({ ...detailModalTask, notes: e.target.value });
                    }}
                    placeholder="Add notes, links, or context..."
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm resize-none min-h-[100px] transition-all hover:bg-gray-100"
                  />
                </div>

                {/* Subtasks Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Subtasks {detailModalTask.subtasks && detailModalTask.subtasks.length > 0 && (
                      <span className="text-purple-600">
                        ({detailModalTask.subtasks.filter(st => st.completed).length}/{detailModalTask.subtasks.length})
                      </span>
                    )}
                  </h3>

                  {/* Subtask List */}
                  <div className="space-y-2 mb-3">
                    {detailModalTask.subtasks?.map((subtask) => (
                      <div
                        key={subtask.id}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <button
                          onClick={() => {
                            toggleSubtask(detailModalTask.id, subtask.id);
                            const updatedSubtasks = detailModalTask.subtasks.map(st =>
                              st.id === subtask.id ? { ...st, completed: !st.completed } : st
                            );
                            setDetailModalTask({ ...detailModalTask, subtasks: updatedSubtasks });
                          }}
                          className={`flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-all ${
                            subtask.completed
                              ? 'bg-purple-500 shadow-sm'
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          {subtask.completed && <Check size={10} className="text-white" />}
                        </button>
                        <span className={`flex-1 text-sm ${subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {subtask.text}
                        </span>
                        <button
                          onClick={() => {
                            deleteSubtask(detailModalTask.id, subtask.id);
                            const updatedSubtasks = detailModalTask.subtasks.filter(st => st.id !== subtask.id);
                            setDetailModalTask({ ...detailModalTask, subtasks: updatedSubtasks });
                          }}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Subtask Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={subtaskInput}
                      onChange={(e) => setSubtaskInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && subtaskInput.trim()) {
                          addSubtask(detailModalTask.id, subtaskInput);
                          const newSubtask = {
                            id: Date.now(),
                            text: subtaskInput,
                            completed: false
                          };
                          const updatedSubtasks = [...(detailModalTask.subtasks || []), newSubtask];
                          setDetailModalTask({ ...detailModalTask, subtasks: updatedSubtasks });
                          setSubtaskInput('');
                        }
                      }}
                      placeholder="Add a subtask..."
                      className="flex-1 px-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm hover:bg-gray-100 transition-all"
                    />
                    <button
                      onClick={() => {
                        if (subtaskInput.trim()) {
                          addSubtask(detailModalTask.id, subtaskInput);
                          const newSubtask = {
                            id: Date.now(),
                            text: subtaskInput,
                            completed: false
                          };
                          const updatedSubtasks = [...(detailModalTask.subtasks || []), newSubtask];
                          setDetailModalTask({ ...detailModalTask, subtasks: updatedSubtasks });
                          setSubtaskInput('');
                        }
                      }}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 hover:scale-105 transition-all text-sm font-medium shadow-md"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600 font-medium">Move to:</label>
                  <select
                    value={detailModalTask.column}
                    onChange={(e) => {
                      moveTaskToColumn(detailModalTask.id, e.target.value);
                      setDetailModalTask({ ...detailModalTask, column: e.target.value });
                    }}
                    className="px-3 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm shadow-sm hover:shadow-md transition-all"
                  >
                    <option value="inbox">📥 Inbox</option>
                    <option value="upnext">⏭️ Up Next</option>
                    <option value="waiting">⏳ Waiting</option>
                    <option value="duckbill">🤖 Assistant</option>
                    <option value="completed">✅ Completed</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this task?')) {
                      deleteTodo(detailModalTask.id);
                      setDetailModalTask(null);
                    }
                  }}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm font-medium hover:scale-105"
                >
                  Delete Task
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Archive Modal */}
        {showArchive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
              <div className="p-6 pb-4">
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
                        className="bg-gray-50 rounded-xl p-4 flex items-start justify-between gap-3 hover:shadow-md transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Check size={12} className="text-purple-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700 line-through">{task.text}</span>
                          </div>
                          {task.notes && (
                            <div className="text-xs text-gray-500 ml-5 mt-1 bg-white p-2 rounded-lg">
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
                          className="flex-shrink-0 text-xs px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 hover:scale-105 transition-all shadow-sm font-medium"
                          title="Restore to completed"
                        >
                          ♻️ Restore
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50">
                <button
                  onClick={() => setShowArchive(false)}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col">
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                    ⚙️ Settings
                  </h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-6">
                {/* Account Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Account</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Signed in as</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowSettings(false);
                          handleSignOut();
                        }}
                        className="text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>

                {/* Data Migration Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Data Migration</h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <p className="text-sm text-gray-600">
                      If you have tasks stored in localStorage that didn't sync to Firebase, you can force a re-sync here.
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      This is safe and will merge any local tasks with your cloud data without deleting anything.
                    </p>
                    <button
                      onClick={async () => {
                        setShowSettings(false);
                        await handleForceResync();
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105 font-medium"
                    >
                      🔄 Force Re-sync from localStorage
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">About</h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Cosmic Tasks</strong> - A cloud-synced todo app
                    </p>
                    <p className="text-xs text-gray-500">
                      Your tasks are automatically synced to Firebase and accessible from any device.
                    </p>
                    <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-200">
                      Current tasks: {todos.length} | Archived: {archivedTasks.length}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50">
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-all font-medium"
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

# Archive System - Testing & Safety Checklist

## ⚠️ IMPORTANT: What Archive Does
- **Archives tasks to separate localStorage key** (`cosmicArchivedTasks`)
- **Tasks are MOVED, not deleted** - they're safely stored
- **Can be restored** at any time from the Archive viewer
- **Console logging** shows exactly what's happening

## Test Plan

### Test 1: Manual Archive Button
1. Complete a few tasks (move to Completed column)
2. Click "📦 Archive All (X)" button in Completed column header
3. **Confirm dialog** appears - click OK
4. **Verify:**
   - ✅ Completed column is now empty
   - ✅ "View Archive" button appears at bottom
   - ✅ Check console: "📦 Manually archiving X completed tasks"
   - ✅ Check console: "📦 Archived tasks saved: X tasks in archive"
   - ✅ Alert shows "✅ Archived X tasks successfully!"

### Test 2: View Archive & Restore
1. Click "📦 View Archive (X tasks)" button at bottom
2. **Verify:**
   - ✅ Modal opens with archived tasks
   - ✅ Tasks show as completed (strikethrough)
   - ✅ Archived date is shown
   - ✅ Notes are preserved (if any)
3. Click "♻️ Restore" on a task
4. **Verify:**
   - ✅ Task returns to Completed column
   - ✅ Archive count decreases
   - ✅ Check console: "♻️ Restoring task from archive"

### Test 3: Auto-Archive on Monday
**Note:** Since it's not Monday, we can't test this live. Instead:
1. Check console logs on Monday for:
   - "🗓️ It's Monday! Checking for tasks to auto-archive..."
   - "📦 Auto-archiving X completed tasks from last week"
   - "✅ Auto-archive complete!"
2. OR: Temporarily modify code to test (see below)

### Test 4: Safety - Data Preservation
1. Before archiving, note down all completed tasks
2. Archive them
3. Open browser DevTools → Application → Local Storage
4. **Verify:**
   - ✅ `cosmicArchivedTasks` key exists
   - ✅ Contains JSON array with all archived tasks
   - ✅ Each task has: id, text, notes, archivedAt, archivedReason
5. Restore all tasks
6. **Verify:** All tasks are back exactly as before

### Test 5: Empty State Handling
1. Try clicking "Archive All" when Completed column is empty
2. **Verify:** Alert says "No completed tasks to archive"

### Test 6: localStorage Persistence
1. Archive some tasks
2. Refresh the page
3. **Verify:**
   - ✅ Archive still shows correct count
   - ✅ Can view archived tasks
   - ✅ Check console: "📦 Archived tasks saved: X tasks in archive"

## Manual Monday Test (Optional)
If you want to test auto-archive before Monday:

1. Open src/App.jsx
2. Find line with: `if (dayOfWeek === 1 && lastArchiveDate !== todayStr)`
3. Temporarily change to: `if (true)` // Force run
4. Refresh page
5. Check console logs
6. **REVERT CHANGE** back to Monday check
7. Clear `cosmicLastArchiveDate` from localStorage to test again

## Console Commands for Testing

Open browser console and run:

```javascript
// View archive data
JSON.parse(localStorage.getItem('cosmicArchivedTasks'))

// View active todos
JSON.parse(localStorage.getItem('cosmicTodos'))

// Check last archive date
localStorage.getItem('cosmicLastArchiveDate')

// Clear last archive date (to test Monday logic again)
localStorage.removeItem('cosmicLastArchiveDate')

// View all keys
Object.keys(localStorage)
```

## Safety Guarantees

✅ **No data deletion** - tasks are moved to archive, not deleted
✅ **Confirmation dialogs** - manual archive requires confirmation
✅ **Restore function** - can undo archives anytime
✅ **Console logging** - full transparency of what's happening
✅ **Separate storage** - archive in its own localStorage key
✅ **Metadata tracking** - archivedAt date and reason stored

## What to Watch For

❌ Tasks disappearing without going to archive
❌ Archive being empty when it shouldn't be
❌ Restore not working properly
❌ Console errors

If any of these occur, check console and localStorage immediately!

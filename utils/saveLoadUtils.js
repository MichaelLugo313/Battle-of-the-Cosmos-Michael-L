// Utility functions for saving and loading game state to localStorage

const SAVE_KEY_PREFIX = 'battle-cosmos-save-';
const CONTINUE_KEY = 'battle-cosmos-continue';

/**
 * Save game state to a specific slot
 * @param {number} slotId - The save slot (1-6)
 * @param {object} gameState - The game state to save
 * @returns {boolean} - Success status
 */
export function saveGameToSlot(slotId, gameState) {
  try {
    const saveData = {
      slotId,
      timestamp: new Date().toISOString(),
      ...gameState
    };
    
    localStorage.setItem(`${SAVE_KEY_PREFIX}${slotId}`, JSON.stringify(saveData));
    return true;
  } catch (error) {
    console.error('Error saving game:', error);
    return false;
  }
}

/**
 * Load game state from a specific slot
 * @param {number} slotId - The save slot (1-6)
 * @returns {object|null} - The saved game state or null if not found
 */
export function loadGameFromSlot(slotId) {
  try {
    const saveData = localStorage.getItem(`${SAVE_KEY_PREFIX}${slotId}`);
    if (!saveData) return null;
    
    return JSON.parse(saveData);
  } catch (error) {
    console.error('Error loading game:', error);
    return null;
  }
}

/**
 * Delete save data from a specific slot
 * @param {number} slotId - The save slot (1-6)
 * @returns {boolean} - Success status
 */
export function deleteSaveSlot(slotId) {
  try {
    localStorage.removeItem(`${SAVE_KEY_PREFIX}${slotId}`);
    return true;
  } catch (error) {
    console.error('Error deleting save:', error);
    return false;
  }
}

/**
 * Get all save slots with their data
 * @returns {Array} - Array of save slot objects
 */
export function getAllSaveSlots() {
  const slots = [];
  
  for (let i = 1; i <= 6; i++) {
    const saveData = loadGameFromSlot(i);
    
    if (saveData) {
      slots.push({
        id: i,
        isEmpty: false,
        ...saveData
      });
    } else {
      slots.push({
        id: i,
        isEmpty: true
      });
    }
  }
  
  return slots;
}

/**
 * Save continue state (auto-save for resuming game)
 * @param {object} gameState - The game state to save
 * @returns {boolean} - Success status
 */
export function saveContinueState(gameState) {
  try {
    const saveData = {
      timestamp: new Date().toISOString(),
      ...gameState
    };
    
    localStorage.setItem(CONTINUE_KEY, JSON.stringify(saveData));
    return true;
  } catch (error) {
    console.error('Error saving continue state:', error);
    return false;
  }
}

/**
 * Load continue state
 * @returns {object|null} - The continue state or null if not found
 */
export function loadContinueState() {
  try {
    const saveData = localStorage.getItem(CONTINUE_KEY);
    if (!saveData) return null;
    
    return JSON.parse(saveData);
  } catch (error) {
    console.error('Error loading continue state:', error);
    return null;
  }
}

/**
 * Check if continue state exists
 * @returns {boolean} - True if continue state exists
 */
export function hasContinueState() {
  try {
    const saveData = localStorage.getItem(CONTINUE_KEY);
    return !!saveData;
  } catch (error) {
    console.error('Error checking continue state:', error);
    return false;
  }
}

/**
 * Delete continue state
 * @returns {boolean} - Success status
 */
export function deleteContinueState() {
  try {
    localStorage.removeItem(CONTINUE_KEY);
    return true;
  } catch (error) {
    console.error('Error deleting continue state:', error);
    return false;
  }
}

/**
 * Format timestamp to readable date string
 * @param {string} timestamp - ISO timestamp
 * @returns {string} - Formatted date string
 */
export function formatSaveDate(timestamp) {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * Get the location name from story pages
 * @param {number} pageNumber - The current page number
 * @param {Array} storyPages - Array of story pages
 * @returns {string} - The location name
 */
export function getLocationName(pageNumber, storyPages) {
  const page = storyPages.find(p => p.id === pageNumber);
  return page ? page.title : 'Unknown Location';
}
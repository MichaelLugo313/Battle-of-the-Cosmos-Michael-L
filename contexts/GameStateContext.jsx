import { createContext, useContext, useState, useCallback } from 'react';

const GameStateContext = createContext();

export function GameStateProvider({ children }) {
  const [gameState, setGameState] = useState(null);

  const saveGameState = useCallback((state) => {
    setGameState(state);
  }, []);

  const loadGameState = useCallback(() => {
    return gameState;
  }, [gameState]);

  const clearGameState = useCallback(() => {
    setGameState(null);
  }, []);

  const hasGameState = useCallback(() => {
    return gameState !== null;
  }, [gameState]);

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        saveGameState,
        loadGameState,
        clearGameState,
        hasGameState
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}
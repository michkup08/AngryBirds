import React, { createContext, ReactNode, useState } from 'react';


type GameContextType = {
    score: number;
    setScore: (s: number) => void;
    lives: number;
    setLives: (l: number) => void;
    level: number;
    setLevel: (n: number) => void;
};


export const GameContext = createContext<GameContextType | null>(null);


export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [score, setScore] = useState<number>(0);
    const [lives, setLives] = useState<number>(3);
    const [level, setLevel] = useState<number>(1);


    return (
        <GameContext.Provider value={{ score, setScore, lives, setLives, level, setLevel }}>
            {children}
        </GameContext.Provider>
    );
};
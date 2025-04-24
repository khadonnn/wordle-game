import React, { useEffect } from 'react';
import './keyboard.css';
import Key from '@/components/key/key';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { decPos, incPos, setBoard } from '@/redux/boardSlice';

const Keyboard: React.FC = () => {
    const rows: string[] = [
        'q w e r t y u i o p',
        'a s d f g h j k l',
        'z x c v b n m',
    ];
    const dispatch = useDispatch();
    const position = useSelector((state: RootState) => state.board.pos);
    const board = useSelector((state: RootState) => state.board.board);

    const handleKeyInput = (key: string) => {
        const letter = key.toLowerCase();

        if (letter === 'backspace') {
            if (position <= 0) return;
            const newBoard = [...board];
            newBoard[position - 1] = '';
            dispatch(setBoard(newBoard));
            dispatch(decPos());
        } else if (letter === 'enter') {
            // TODO: handle enter logic
        } else if (/^[a-z]$/.test(letter)) {
            if (position >= board.length) return;
            const newBoard = [...board];
            newBoard[position] = letter.toUpperCase();
            dispatch(setBoard(newBoard));
            dispatch(incPos());
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => handleKeyInput(e.key);
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [board, position]);

    return (
        <div className='keyboard-container'>
            {rows.map((row, idx) => (
                <div className='row' key={idx}>
                    {idx === 2 && (
                        <span
                            className='letter-row'
                            onClick={() => handleKeyInput('Enter')}
                        >
                            Enter
                        </span>
                    )}
                    {row.split(' ').map((letter, idx2) => (
                        <div className='letter-row' key={idx2}>
                            <Key
                                letter={letter.toUpperCase()}
                                onClick={handleKeyInput}
                            />
                            {letter === 'm' && (
                                <span
                                    onClick={() => handleKeyInput('Backspace')}
                                >
                                    Back
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;

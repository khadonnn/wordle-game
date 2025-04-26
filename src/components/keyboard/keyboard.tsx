import React, { useEffect } from 'react';
import './keyboard.css';
import Key from '@/components/key/key';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { decPos, incPos, incRow, setBoard } from '@/redux/boardSlice';

const Keyboard: React.FC = () => {
    const rows: string[] = [
        'q w e r t y u i o p',
        'a s d f g h j k l',
        'z x c v b n m',
    ];
    const dispatch = useDispatch();
    const position = useSelector((state: RootState) => state.board.pos);
    const board = useSelector((state: RootState) => state.board.board);
    const row = useSelector((state: RootState) => state.board.row);
    const handleKeyInput = (key: string) => {
        const letter = key.toLowerCase();

        if (letter === 'backspace') {
            if (Math.floor((position - 1) / 5) < row) return;

            const newBoard = [...board];
            newBoard[position - 1] = '';
            dispatch(decPos());
            dispatch(setBoard(newBoard));
        } else if (letter === 'enter') {
            // TODO: handle enter logic
            if (position % 5 === 0 && position !== 0) {
                dispatch(incRow());
            }
            console.log('enter');
        } else if (/^[a-z]$/.test(letter)) {
            console.log(position);
            if (position >= board.length) return;
            if (Math.floor(position / 5) !== row) return;
            const newBoard = [...board];
            newBoard[position] = letter.toUpperCase();
            dispatch(incPos());
            dispatch(setBoard(newBoard));
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            handleKeyInput(e.key);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [board, position, row]);

    return (
        <div className='keyboard-container'>
            {rows.map((row, idx) => (
                <div className='row' key={idx}>
                    {idx == 2 && (
                        <span
                            className='letter-row'
                            onClick={() => handleKeyInput('Enter')}
                        >
                            Enter
                        </span>
                    )}
                    {row.split(' ').map((letter, idx2) => (
                        <div className='letter-row' key={idx2}>
                            <Key letter={letter.toUpperCase()} />
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

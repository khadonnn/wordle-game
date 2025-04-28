import React, { useEffect } from 'react';
import './keyboard.css';
import Key from '@/components/key/key';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { decPos, incPos, incRow, setBoard } from '@/redux/boardSlice';
import wordList from '../../words.json';
import { Bounce, toast } from 'react-toastify';
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
    const [isEnterPressed, setIsEnterPressed] = React.useState(false);
    const correcWord = useSelector(
        (state: RootState) => state.board.correctWord,
    );
    const board5Words: string = `${board[position - 5]}${board[position - 4]}${
        board[position - 3]
    }${board[position - 2]}${board[position - 1]}`.toLowerCase();
    const allwords = wordList.words.includes(board5Words);
    const handleKeyInput = (key: string) => {
        console.log(correcWord);
        const letter = key.toLowerCase();

        if (letter === 'backspace') {
            if (Math.floor((position - 1) / 5) < row) return;

            const newBoard = [...board];
            newBoard[position - 1] = '';
            dispatch(decPos());
            dispatch(setBoard(newBoard));
        } else if (letter === 'enter') {
            if (wordList.words.includes(board5Words) === false) {
                toast.error('Word not found🥲', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    transition: Bounce,
                });
            } else if (wordList.words.includes(board5Words)) {
                if (
                    position % 5 === 0 &&
                    position !== 0 &&
                    !isEnterPressed &&
                    Math.floor((position - 1) / 5) === row
                ) {
                    dispatch(incRow());
                    setIsEnterPressed(true);
                }
            }
            if (position === 30 && allwords) {
                toast.info('The correct word is : ' + correcWord, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                    transition: Bounce,
                });
            }
        } else if (/^[a-z]$/.test(letter)) {
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
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            setIsEnterPressed(false);
        };
    }, [board, position, row, isEnterPressed]);

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

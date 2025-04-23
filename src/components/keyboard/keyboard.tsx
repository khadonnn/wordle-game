import React from 'react';
import './keyboard.css';
import Key from '@/components/key/key';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { decPos, setBoard } from '@/redux/boardSlice';
const Keyboard: React.FC = () => {
    const rows: string[] = [
        'q w e r t y u i o p',
        'a s d f g h j k l',
        'z x c v b n m',
    ];
    const dispatch = useDispatch();
    const position = useSelector((state: RootState) => state.board.pos);
    const board = useSelector((state: RootState) => state.board.board);
    const clickBack = () => {
        if (position <= 0) return;
        const newBoard = [...board];
        newBoard[position - 1] = '';
        dispatch(setBoard(newBoard));
        dispatch(decPos());
    };
    return (
        <div className='keyboard-container'>
            {rows.map((row, idx) => {
                return (
                    <div className='row' key={idx}>
                        {idx === 2 && <span className='letter-row'>Enter</span>}
                        {row.split(' ').map((letter, idx) => {
                            return (
                                <div className='letter-row' key={idx}>
                                    <Key letter={letter.toUpperCase()} />
                                    {letter === 'm' && (
                                        <span onClick={clickBack}> Back </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
export default Keyboard;

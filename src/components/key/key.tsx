import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incPos, setBoard } from '../../redux/boardSlice';

import './key.css';
import { RootState } from '@/redux/store';

interface IProps {
    letter: string;
}

const Key: React.FC<IProps> = (props) => {
    const { letter } = props;
    const board = useSelector((state: RootState) => state.board.board);
    const position = useSelector((state: RootState) => state.board.pos);
    const row = useSelector((state: RootState) => state.board.row);
    const dispatch = useDispatch();
    const currentRow = Math.floor(position / 5);
    const chooseLetter = () => {
        if (position >= 30) return;
        if (currentRow > row) return;
        const newBoard = [...board];
        newBoard[position] = letter;
        dispatch(setBoard(newBoard));
        dispatch(incPos());
    };
    return (
        <div className='letter' onClick={chooseLetter}>
            {letter}
        </div>
    );
};

export default Key;

import React from 'react';
import './key.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { incPos, setBoard } from '@/redux/boardSlice';
interface IProps {
    letter: string;
}
const Key: React.FC<IProps> = (props) => {
    const { letter } = props;
    const board = useSelector((state: RootState) => state.board.board);
    const position = useSelector((state: RootState) => state.board.pos);
    const dispatch = useDispatch();
    const chooseLetter = () => {
        if (position >= 30) return;
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

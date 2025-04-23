import Keyboard from '@/components/keyboard/keyboard';
import Square from '../square/square';
import './board.css';
import React from 'react';
interface IProps {
    board: string[];
}

const Board: React.FC<IProps> = (props) => {
    const { board } = props;
    return (
        <>
            <div className='board'>
                {board.map((square, idx) => {
                    return (
                        <div key={idx}>
                            <Square val={square} squareIdx={idx} />
                        </div>
                    );
                })}
            </div>
            <div className='keyboard'>
                <Keyboard />
            </div>
        </>
    );
};

export default Board;

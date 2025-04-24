import React from 'react';
import './key.css';

interface IProps {
    letter: string;
    onClick?: (letter: string) => void;
}

const Key: React.FC<IProps> = ({ letter, onClick }) => {
    return (
        <div className='letter' onClick={() => onClick?.(letter)}>
            {letter}
        </div>
    );
};

export default Key;

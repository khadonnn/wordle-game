import React from 'react';
import './key.css';
interface IProps {
    letter: string;
}
const Key: React.FC<IProps> = (props) => {
    const { letter } = props;
    return <div className='letter'>{letter}</div>;
};
export default Key;

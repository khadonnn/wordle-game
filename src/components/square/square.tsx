import React from 'react';
import './square.css';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
interface IProps {
    val: string;
    squareIdx: number;
}

const Square: React.FC<IProps> = (props) => {
    const { val, squareIdx } = props;

    const position = useSelector((state: RootState) => state.board.pos);
    const correctWord = useSelector(
        (state: RootState) => state.board.correctWord,
    );
    const row = useSelector((state: RootState) => state.board.row);
    const [correct, setCorrect] = React.useState(false);
    const [close, setClose] = React.useState(false);
    const [wrong, setWrong] = React.useState(false);

    // change position square:
    const wordLastIndex = 4;
    const currentPos =
        position === 5
            ? wordLastIndex
            : position > 5 && position % 5 === 0
            ? wordLastIndex
            : (position % 5) - 1;
    const variants = {
        filled: {
            scale: [1.2, 1],
            transition: { duration: 0.2 },
        },
        unfilled: {
            scale: 1,
            transition: { duration: 0.2 },
        },
    };
    React.useEffect(() => {
        console.log(currentPos);
        console.log(correctWord[currentPos]);
        console.log(val);
        if (correctWord[currentPos] === val) {
            setCorrect(true);
        } else if (!correct && val !== '' && correctWord.includes(val)) {
            setClose(true);
        } else if (!correct && val !== '' && !correctWord.includes(val)) {
            setWrong(true);
        }
        return () => {
            setCorrect(false);
            setClose(false);
            setWrong(false);
        };
    }, [val]);
    //
    const status =
        (Math.floor(squareIdx / 5) < row &&
            (correct
                ? 'correct'
                : close
                ? 'close'
                : wrong
                ? 'wrong'
                : undefined)) ||
        '';
    return (
        <>
            <motion.div
                animate={val ? 'filled' : 'unfilled'}
                variants={variants}
            >
                <div id={status} className='square'>
                    {val}
                </div>
            </motion.div>
        </>
    );
};

export default Square;

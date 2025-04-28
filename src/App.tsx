import './App.css';
import Board from './components/board/board';
import Heading from './components/heading/heading';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ToastContainer } from 'react-toastify';

function App() {
    const board = useSelector((state: RootState) => state.board.board);
    return (
        <div className='App'>
            <Heading type='h1' text='Hello World' />
            <Heading type='subtitle' text='This is a subtitle' />
            <div className='board-container'>
                <Board board={board} />
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;

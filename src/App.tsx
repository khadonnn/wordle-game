import React from 'react';
import './App.css';
import Board from './components/board/board';
import Heading from './components/heading/heading';

function App() {
    const [board, setBoard] = React.useState<string[]>([
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
    ]);
    return (
        <div className='App'>
            <Heading type='h1' text='Hello World' />
            <Heading type='subtitle' text='This is a subtitle' />
            <div className='board-container'>
                <Board board={board} />
            </div>
        </div>
    );
}

export default App;

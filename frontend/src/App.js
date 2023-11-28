
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom';
import { ChatPage } from './Pages/ChatPage';
import { HomePage } from './Pages/HomePage';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' Component={HomePage}/>
      <Route path='/chats'Component={ChatPage}/>
      </Routes>
      
    </div>
  );
}

export default App;

import {Routes, Route} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import WordsPage from './pages/wordspage/wordspage.component';
import SignIn from './components/sign-in/sign-in.component';

import './App.css';

const App=()=> {
  return (
    <Routes>
     <Route path='/' element={<Header/>}>
       <Route index path='/' element={<HomePage/> }/>
       <Route path='/word' element={<WordsPage/> }/>
       <Route path='/sign-in' element={<SignIn/>}/>
      </Route>
    </Routes>
  )
}

export default App;

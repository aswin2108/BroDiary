import {Routes, Route} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import WordsPage from './pages/wordspage/wordspage.component';
import Authentication from './components/authentication/authentication';

import './App.css';

const App=()=> {
  return (
    <Routes>
     <Route path='/' element={<Header/>}>
       <Route index path='/' element={<HomePage/> }/>
       <Route path='/word' element={<WordsPage/> }/>
       <Route path='/auth' element={<Authentication/>}/>
      </Route>
    </Routes>
  )
}

export default App;

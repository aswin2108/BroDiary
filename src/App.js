import {Routes, Route} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import WordsPage from './pages/wordspage/wordspage.component';
import Authentication from './pages/authentication/authentication';
import DiaryPage from './pages/diarypage/diary.component';
import HistoryPage from './pages/historypage/historyPage.component';

import './App.css';

const App=()=> {
  return (
    <Routes>
     <Route path='/' element={<Header/>}>
       <Route index path='/' element={<HomePage /> }/>
       <Route path='/word' element={<WordsPage /> }/>
       <Route path='/auth' element={<Authentication />}/>
       <Route path='/diary' element={<DiaryPage />}/>
       <Route path='/diary/history' element={<HistoryPage />}/>
      </Route>
    </Routes>
  )
}

export default App;

import './App.css';
import { useEffect, Fragment} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { PDFDocument } from './components/documents/PDFDocument';
import { PDFViewer } from '@react-pdf/renderer';
import  ReactDOM  from 'react-dom';

//components
import Header from './components/header/header';
import DocumentDetails from './components/documents/details';
import Footer from './components/footer/footer';
import LoginHeader from './components/auth/header/header';
import Auth from './components/auth/login/Auth';

function App() {
  const dispatch = new useDispatch();
  const getDivisions = () => {
    fetch(`http://localhost:4000/divisions`)
        .then(res => res.json())
        .then(result => {
            console.log('result123' + result)
            dispatch({ type: 'LOAD_DIVISIONS', payload: result })
        })
        .catch(console.log)
}
  useEffect(() => {
    getDivisions()
}, [])



useEffect(() => {
    getSections()
}, [])

const getSections = () => {
    fetch(`http://localhost:4000/sections`)
        .then(res => res.json())
        .then(result => {
            console.log('result123' + result)
            dispatch({ type: 'LOAD_SECTIONS', payload: result })
        })
        .catch(console.log)
}

useEffect(() => {
  getUsers()
}, [])

const getUsers = () => {
  fetch(`http://localhost:4000/users`)
      .then(res => res.json())
      .then(result => {
          console.log('result123' + result)
          dispatch({ type: 'LOAD_USERS', payload: result })
      })
      .catch(console.log)
}

  const currentUser = useSelector(state => state.auth);

  return (

    <div className="App">
      {currentUser.length === 0 &&
        <>
        

          <LoginHeader/>
          <Auth />
          <Footer />
        </>
      }
      {currentUser.length > 0 &&
      //key={currentUser[0].id} user={currentUser[0]}
        <>
          <Header />
          <DocumentDetails />
          <Footer />
        </>
      }

    </div>
  );
}

export default App;


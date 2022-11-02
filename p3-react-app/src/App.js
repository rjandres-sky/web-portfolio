import './App.css';
import { useSelector } from 'react-redux';

//components
import Header from './components/header/header';
import DocumentDetails from './components/documents/details';
import Footer from './components/footer/footer';
import LoginHeader from './components/auth/header/header';
import Auth from './components/auth/login/Auth';

function App() {

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

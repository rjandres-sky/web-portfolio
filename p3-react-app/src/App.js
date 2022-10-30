import './App.css';
import { Provider } from 'react-redux';
import storeDocument from './reducers/storeDocument';

//components
import Header from './components/header/header';
import DocumentDetails from './components/documents/details';
import Footer from './components/footer/footer';

function App() {
  return (
    
    <div className="App">
       <Header/> 
       <Provider store={storeDocument}>
       <DocumentDetails/>
       </Provider>
       <Footer />
    </div>
  );
}

export default App;

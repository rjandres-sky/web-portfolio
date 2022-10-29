import './App.css';

//components
import Header from './components/header/header';
import DocumentDetails from './components/documents/details';
import Footer from './components/footer/footer';

function App() {
  return (
    
    <div className="App">
       <Header/> 
       <DocumentDetails/>
       <Footer />
    </div>
  );
}

export default App;

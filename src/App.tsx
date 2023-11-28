import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import "./styles/Global.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Daily Fresh';
  }, []);
  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  );
}

export default App;

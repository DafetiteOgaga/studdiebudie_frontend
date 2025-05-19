import './App.css';
import "./statics/css/bootstrap.min.css"
import "./statics/css/style.css"
import "./statics/css/responsive.css"
import Home from './components/index';
import Header from './components/Header';
import AppRoutes from './hooks/Routes';
import ShortFooter from './components/ShortFooter';

function App() {
  return (
    <div id="home" className="main_bg">
      <Header />
      <div className='app_content'>
        <AppRoutes>
          <Home />
        </AppRoutes>
      </div>
      <ShortFooter />
    </div>
  );
}

export default App;

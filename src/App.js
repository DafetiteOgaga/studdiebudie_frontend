import './App.css';
import "./statics/css/bootstrap.min.css"
import "./statics/css/style.css"
import "./statics/css/responsive.css"
import Home from './components/index';
import Header from './components/Header';
import AppRoutes from './Routes';

function App() {
  return (
    <div className="main_bg">
      <Header />
      <AppRoutes>
        <Home />
      </AppRoutes>
    </div>
  );
}

export default App;

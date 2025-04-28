import './App.css';
import "./statics/css/bootstrap.min.css"
import "./statics/css/style.css"
import "./statics/css/responsive.css"
// import "./statics/css/font-awesome.min.css"
// import "./statics/css/animate.css"
// import "./statics/css/custom.css"
// import "./statics/css/flashy.min.css"
// import "./statics/css/flaticon.css"
// import "./statics/css/magnific-popup.css"
// import "./statics/css/responsiveslides.css"
// import "./statics/css/timeline.css"
import Home from './components/index';
import Header from './components/Header';
import AppRoutes from './Routes';

function App() {
  return (
    <>
      <Header />
      <AppRoutes>
        <Home />
      </AppRoutes>
    </>
  );
}

export default App;

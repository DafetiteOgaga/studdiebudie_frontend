import './App.css';
import "./statics/css/bootstrap.min.css"
import "./statics/css/style.css"
import "./statics/css/responsive.css"
import Header from './components/Header';
import AppRoutes from './hooks/Routes';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div id="home" className="main_bg">
      <Header />
      <div className='app_content'>
        <AppRoutes />
      </div>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;

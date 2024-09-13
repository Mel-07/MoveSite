import'./App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'

function App() {

  return (
    <div className="App-container">
      <Header />
      <div className="container-page">
        <Outlet />
      </div>
    </div>
  );
}

export default App

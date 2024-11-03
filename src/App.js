
import './App.css';
import { JatekProvider } from './Context/JatekContext'; 
import Jatekter from './Components/Jatekter';

function App() {
  return (
   
    <div className="App">
      <header className="App-header">
       <h1>Memóriajáték</h1>
      </header>
      <main> 
      <JatekProvider>
        <Jatekter /> 
        </JatekProvider>
        </main> 
    </div>
   
  );
}

export default App;

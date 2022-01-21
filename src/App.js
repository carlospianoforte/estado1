import './App.css';
import { UseState } from './UseState.js';
import { ClassState } from './ClassState.js';

function App() {
  return (
    <div className="App">
      <UseState name="Use State"/>
      <ClassState name="ClassState"/>
    </div>
  );
}

export default App;

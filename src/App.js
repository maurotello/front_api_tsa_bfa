import './App.css';
import FormSealing from './Components/FormSealing';
import FormVerifier from './Components/FormVerifier';


function App() {
  return (
    <div className="App mt-20">
      <div>
      <div class="container mx-auto mt-20 flex flex-col w-full clear-both text-center">
        <div class="grid grid-cols-2">
          <div>
            <h1 className = "text-4xl font-bold text-indigo-600" >Sellador</h1>
            <FormSealing />
          </div>
          <div>
            <h1 className = "text-4xl font-bold text-indigo-600" >Verificador</h1>
            <FormVerifier />
          </div>
        </div>
       
        
      </div>
        
      </div>
    </div>
  );
}

export default App;

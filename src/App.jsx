import './App.css'
import Header from './shared/Header'
import TodosPage from './features/Todos/TodosPage'
import { useState } from 'react';
import Logon from './features/Logon';

function App() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  return(
    <div>
      <Header
        token = {token}
        onSetToken = {setToken}
        onSetEmail = {setEmail}
      >
      </Header>
      {token ? (
        <TodosPage token={token}></TodosPage>
      ):(
        <Logon
          onSetEmail={setEmail}
          onSetToken={setToken}
        >
        </Logon>
      )}
      
    </div>
  );
}

export default App

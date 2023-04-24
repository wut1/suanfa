
import { useEffect, useState } from 'react';
import './App.css';

function App() {


  const [list, setList] = useState([])


  

  return (
    <div className="App">
      <header className="App-header">

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {list.map((ele) => {
            return <li>
              <p>序号: {ele.id}</p>
              <section>
                <header>{ele.name}</header>
                <atticle>{ele.content}</atticle>
              </section>
            </li>
          })}

        </ul>
      </header>
    </div>
  );
}

export default App;

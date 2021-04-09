import './App.css';
import React from 'react';
import YoutubePlayer from './YoutubePlayer';

function App() {

  const [videoURL, setVideoURL] = React.useState("dQw4w9WgXcQ");
  const [timestamp, setTimestamp] = React.useState(0);

  return (
    <div className="App">
      <header className="App-header">
        
        <YoutubePlayer videoState={[videoURL, setVideoURL]} timestamp={timestamp}/>

        <button onClick={() => setVideoURL("LWcsWDKeNUw")}>Set video</button>
        <button onClick={() => setTimestamp(100)}>Set timestamp</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

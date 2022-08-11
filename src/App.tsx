import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';
function App() {
  const [title, setTitle] = React.useState('');
  const [headlines, setHeadlines] = React.useState<string[]>([]);
  const [secheadlines, setSecheadlines] = React.useState<string[]>([]);

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  React.useEffect(() => {
    getCurrentTab().then(tab => {
      console.log(tab);
    }).catch(err => {
      console.log(err);
    })

    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      console.log(tabs[0].id);
      chrome.tabs.sendMessage(
        tabs[0].id || 0,

        { type: 'GET_DOM' } as DOMMessage,


        (response: DOMMessageResponse) => {
          setTitle(response.title);
          setHeadlines(response.headlines);
          setSecheadlines(response.secheadlines);
        },
      );
      // console.log({ type: 'GET_DOM' } as DOMMessage);

    });
  }, []);

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
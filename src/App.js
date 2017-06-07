import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';

const tabs = [
  'Home',
  'Contact Us',
  'About',
  'My Account'
]

const initialState = {
  searchTxt: '',
  tabs: tabs,
  activeTab: 'About'
}

let appState = initialState

function clickTab (tabName, evt) {
  appState.activeTab = tabName
  renderNow()
}

// This component receives:
// > active - boolean
// > name - name of the tab
function Tab (props) {
  let className = 'tab'
  if (props.active) className += ' active'
  let clickFn = clickTab.bind(null, props.name)

  return <li className={className} onClick={clickFn}>{props.name}</li>
}

function changeSearchText (evt) {
  let newText = evt.currentTarget.value
  appState.searchTxt = newText
  renderNow()
}

function clickAddTabBtn (newText) {
  appState.searchTxt = ''
  appState.tabs.push(newText)
  renderNow()
}

function NewTabInput (props) {
  let clickFn = clickAddTabBtn.bind(null, props.txt)

  return <div>
      <input type="text" value={props.txt} onChange={changeSearchText} />
      <button onClick={clickFn}>Add Tab</button>
    </div>
}

function App (props) {
  var tabsComponents = tabs.map(function (tabName) {
    let isActive = tabName === props.activeTab
    return <Tab name={tabName} active={isActive} />
  })

  return <div>
      <NewTabInput txt={props.searchTxt} />
      <ul>{tabsComponents}</ul>
    </div>
}

function renderNow () {
  console.log(appState)
  ReactDOM.render(App(appState), document.getElementById('root'))
}

renderNow(initialState)

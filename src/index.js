/* global $ */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import _TOKEN from './_token'
import gitHubImg from './img/gitHubApple.jpg'
import gitHubMainImg from './img/gitHubMainImg.jpg'

const initialState = {
  isLoading: true,
  profileData: null,    // can be null or an object
  doesUserExist: false,
  username: ''
}

window.appState = initialState

fetchGitHubData('jennypenfield')

function fetchGitHubData (username) {
  let gitHubUrl = `https://api.github.com/users/` + username + _TOKEN
  $.getJSON(gitHubUrl).done(FetchProfileSuccess).fail(fetchProfileFailure)
}

function fetchProfileFailure () {
  window.appState.isLoading = false
  window.appState.profileData = null
  window.appState.doesUserExist = false
}

function FetchProfileSuccess (data) {
  window.appState.isLoading = false
  window.appState.profileData = data
  window.appState.doesUserExist = true
}

function GitHubName (profileData) {
  return (
    <h1 className='user-name'>{profileData.name}</h1>
  )
}

function GitHubPic (profileData) {
  return (
    <img className='github-profile-photo' src={profileData.avatar_url} alt='Github Profile Photo' />
  )
}

function GitHubBio (profileData) {
  return (
    <h4>{profileData.bio}</h4>
  )
}

function GitHubIsHireable (profileData) {
  if (profileData.hireable) {
    return (
      <div>
        <h3>Hireable?</h3>
        <p>Yes</p>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Hireable?</h3>
        <p>No</p>
      </div>
    )
  }
}

function GitHubProfileLinks (profileLink, blogLink) {
  return (
    <div className='profile-links'>
      <a href={profileLink} target='_blank' className='github-link'>GitHub Profile</a><br /><br />
      <a href={blogLink} target='_blank' className='blog-link'>Blog</a>
    </div>
  )
}

function GitHubProfileLocation (props) {
  return (
    <div>
      <h3>Location</h3>
      <p>{props.location}</p>
    </div>
  )
}

function GitHubSearchUserName () {
  return (
    <div>
      <input className='search-user-name' type='text' name='username'
        placeholder='GitHub Username'
        onChange={onChange}
        onKeyPress={onKeyPress} />
      <br />
      <input className='btn-search' onClick={clickSearchButton} type='submit' />
    </div>
  )
}

function onChange (evt) {
  window.appState.username = evt.target.value
}

function onKeyPress (key) {
  if (key.charCode === 13) {
    clickSearchButton()
  }
}

function clickSearchButton () {
  fetchGitHubData(window.appState.username)
}

function GitHubUserData (profileData) {
  return (
    <div>
      {GitHubName(profileData)}
      {GitHubPic(profileData)}
      {GitHubBio(profileData)}
      {GitHubProfileLinks(profileData)}
      {GitHubProfileLocation(profileData)}
      {GitHubIsHireable(profileData)}
    </div>
  )
}

function LoadingPage () {
  return <h1>Loading…</h1>
}

function userDoesNotExist () {
  return (<div>
    <img className='github-user-not-found-img' src={gitHubImg} alt='User Not Found' />
    <h1>User Not Found</h1></div>)
}

function mainImg () {
  return <img className='github-main-img' src={gitHubMainImg} alt='GitHub Image' />
}

function App (props) {
  if (props.isLoading) {
    return (<div><h1>GitHub Profile Search</h1>
      {LoadingPage()}</div>)
  } else if (!props.doesUserExist) {
    return (<div><h1>GitHub Profile Search</h1>
      {userDoesNotExist()}
      {GitHubSearchUserName()}</div>)
  } else {
    return (<div>
      <h1>GitHub Profile Search</h1>
      {mainImg()}
      {GitHubUserData(props.profileData)}
      {GitHubSearchUserName()}</div>)
  }
}

const ROOT_EL = document.getElementById('root')
function renderNow () {
  ReactDOM.render(App(window.appState), ROOT_EL)
  window.requestAnimationFrame(renderNow)
}
window.requestAnimationFrame(renderNow)

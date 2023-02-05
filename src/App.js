import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './components/LoginPage'
import JobsPage from './components/JobsPage'
import JobDetailsPage from './components/JobDetailsPage'
import HomePage from './components/HomePage'
import NotFoundPage from './components/NotFoundPage'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/jobs" component={JobsPage} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetailsPage} />
    <Route path="/not-found" component={NotFoundPage} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App

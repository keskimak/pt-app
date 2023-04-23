import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import CustomerPage from './components/CustomerPage';
import TrainingsPage from './components/TrainingsPage';
import HomePage from './components/Home';
import Customer from './Customer';

//Add styling to browserrouter

function App() {
  return (
    <div className="App">
      <AppBar position="static" color='secondary' >
        <Toolbar>
          <Typography variant='h6'>
            Personal trainer log
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Link to="/">Home</Link>{' '}
        <Link to="/customers">Customers</Link>{' '}
        <Link to="/trainings">Trainings</Link>{' '}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/customer/*" element={<Customer />} />
          <Route path="/trainings" element={<TrainingsPage />} />
          <Route path="*" element={<CustomerPage /> } />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

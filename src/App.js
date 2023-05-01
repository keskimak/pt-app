import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import CustomerPage from './components/Customer/CustomerPage';
import TrainingsPage from './components/Training/TrainingsPage';
import HomePage from './components/Home';




//Add styling to browserrouter

function App() {
  return (

    <div className="App">
      <AppBar position="static" color='secondary' >
        <Toolbar>
          <Typography variant='h6'>
            PT APP
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
      
        <Link to="/customers">Customers</Link>{' '}
        <Link to="/trainings">Trainings</Link>{' '}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/customers" element={<CustomerPage />} />
 
          <Route path="/trainings" element={<TrainingsPage />} />
        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;

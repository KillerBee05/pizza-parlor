import React, { useState } from 'react';
import Header from './components/header';
import Button from './components/button';
import { BrowserRouter as Router } from 'react-router-dom';
import ManageToppings from './components/manage-toppings';
import ManagePizzas from './components/manage-pizzas';
import './style.scss';

interface StateType {
  isOwner: boolean;
  isChef: boolean;
}

const INITIAL_STATE: StateType = {
  isOwner: false,
  isChef: false,
};

function App() {
  const [state, setState] = useState<StateType>(INITIAL_STATE)

  const { isChef,  isOwner} = state;

  const handleOwner = () => {
    setState({...state, isOwner: true, isChef: false})
  }

  const handleChef = () => {
    setState({...state, isChef: true, isOwner: false})
  }

  return (
    <Router>
      <div>
        <Header />
        <span  className='inline'>
          <Button style={{ color: "red", }} label={'Owner'} onClick={handleOwner} />
          <Button style={{ color: 'blue', marginLeft: '2rem' }} label={'Chef'} onClick={handleChef} />
        </span>

        { isChef && 
          <ManagePizzas />
        }

        { isOwner && 
          <ManageToppings />
        }
        


      </div>
    </Router>
  );
}

export default App;

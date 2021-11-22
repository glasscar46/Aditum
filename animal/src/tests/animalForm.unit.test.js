import React from "react";
import Animalform from '../pages/animalform'
import store from '../redux/store'
import {render, screen} from '@testing-library/react'
import {fireEvent} from'@testing-library/user-event/'
import { Provider } from "react-redux";
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom'

describe('AnimalForm Unit test', () => {
    const history = createMemoryHistory()
    test('should show all imput fields', () => {
      const { container} =  render(<Provider store={store}><Router history={history}><Animalform/></Router></Provider>)
      expect(screen.getByTestId('#name-input')).toBeInTheDocument();
      expect(screen.getByTestId('#type-input')).toBeInTheDocument();
    });



})
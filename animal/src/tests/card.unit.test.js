import { render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import React from 'react'
import Card from '../components/card';
import Item from '../components/item';
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import animalReducer from '../redux/animalSlice';


describe('Card Unit Test', () => {
    const store = configureStore({reducer: animalReducer})
    test('without children', () => {
        render(<Card/>);
        expect(screen.getByText(/Data de Nascimento/)).toBeInTheDocument();
        expect(screen.getByText(/Nome/)).toBeInTheDocument();
        expect(screen.getByText(/Tipo/)).toBeInTheDocument();
        expect(screen.getByText(/Peso/)).toBeInTheDocument();
        expect(screen.getByText(/Alterar/)).toBeInTheDocument();
        expect(screen.getByText(/Excluir/)).toBeInTheDocument();
        //expect(screen.getByText(/undefined/)).not.toBeInTheDocument()
    });
    test('with children', () => {
        const animal = { date: "10-12-2010", name: "cathy", weight: 10, _id: 1, type: 'dog' }
        const {container} = render(<Provider store={store}><Card><Item animal = {animal}/></Card></Provider>,{wrapper:MemoryRouter})
        expect(container.querySelector('td')).toBeInTheDocument();
    })
    
})

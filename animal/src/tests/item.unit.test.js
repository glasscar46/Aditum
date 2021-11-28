import { render, screen, fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import React from 'react'
import '@testing-library/jest-dom'
import Item from '../components/item';
import {Provider} from 'react-redux'
import {createMemoryHistory} from 'history'
import { configureStore } from '@reduxjs/toolkit';
import animalReducer,{deleteAnimal} from '../redux/animalSlice';
import { Router} from 'react-router-dom'
import userEvent from "@testing-library/user-event";
import { httpDelete } from '../utils';


jest.mock('../utils.js',()=>({
    httpDelete: jest.fn(),
    httpGet : jest.fn(),
    httpPost : jest.fn(),
    httpPut : jest.fn(),
}))

describe('item unit tests', () => {
    const store = configureStore({ reducer: animalReducer});
    test('without animal prop', () => {
        render(<Provider store={store}><table><tbody><Item/></tbody></table> </Provider>, { wrapper: MemoryRouter})
        expect(screen.getByText(/Nao foi possivel exibir o animal./i)).toBeInTheDocument();
    });
    test('empty props', () => {
        render(<Provider store={store}><table><tbody><Item animal={{}}/></tbody></table></Provider>,{wrapper : MemoryRouter})
        expect(screen.getByText(/Nao foi possivel exibir o animal./i)).toBeInTheDocument();
    });

    test('props valido', () => {

        const animal = { date: "10-12-2010", name: "cathy", weight: 10, _id: 1, type: 'dog' }
        render(<Provider store={store}><table><tbody><Item animal={animal} /></tbody></table></Provider>,{ wrapper: MemoryRouter});
        expect(screen.getByText(/cathy/i)).toBeInTheDocument();
        expect(screen.getByText(/10-12-2010/i)).toBeInTheDocument();
        expect(screen.getByText(/10 kg/i)).toBeInTheDocument();
        expect(screen.getByText(/dog/i)).toBeInTheDocument();
    });

    const history = createMemoryHistory()
    test('edit button', () => {
        const animal = { date: "10-12-2010", name: "cathy", weight: 10, _id: 1, type: 'dog' }
        const {container} = render(<Provider store={store}><Router history={history}><table><tbody><Item animal={animal} /></tbody></table></Router></Provider>);
        const leftclick = { button : 0 };
        userEvent.click(container.querySelector("#editLink"),leftclick);
        expect(history.location.pathname).toBe('/1/edit');
    });

//    test('delete button test', () => {
//         const animal = { date: "10-12-2010", name: "cathy", weight: 10, _id: 1, type: 'dog' }
//         httpDelete.mockImplementation(()=>Promise.resolve(animal._id));
//         const {container} = render(<Provider store={store}><Router history={history}><table><tbody><Item animal={animal} /></tbody></table></Router></Provider>);
//         const leftclick = { button : 0 };
//         fireEvent.click(container.querySelector("#deletebtn"),leftclick);
//         console.log(httpDelete)
//         expect(httpDelete).toHaveBeenCalledTimes(1);
//         expect(httpDelete).toHaveBeenCalledWith(1);
//     })



})

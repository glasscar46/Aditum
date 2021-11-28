import React from "react";
import AnimalList from "../pages/animalList";
import { configureStore } from "@reduxjs/toolkit";
import {render, screen} from '@testing-library/react'
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import AnimalReducer from "../redux/animalSlice";
import { MemoryRouter } from "react-router";
import animalSlice from "../redux/animalSlice";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));

let store;
// Mocking the state
const mockAppState = {
        status: 'not_loaded',
        error: null,
        animals: [{ date: "10-12-2010", name: "cathy", weight: 10, _id: 1, type: 'dog' }],
}
// Mocking the slice
jest.mock("../redux/animalSlice", () => ({
    selectAllAnimals: jest.fn()
}));
describe('Home page unit Test', () => {
    
    beforeEach(()=>{
        useSelector.mockImplementation((callback)=>callback(mockAppState))
    })

    afterEach(()=>{
        useSelector.mockClear();
    })
    // test('initial view', () => {
    //     store = configureStore({
    //         reducer:animalSlice });
          
    //     const {container} = render(<Provider store={store}><AnimalList/></Provider>,{ wrapper: MemoryRouter})
    //     expect(screen.getByText(/Novo Animal/)).toBeInTheDocument();
    //     expect(container.querySelector('td')).toBeInTheDocument();
    //     expect(screen.getByText(/cathy/)).toBeInTheDocument();
    // });
    
    
})

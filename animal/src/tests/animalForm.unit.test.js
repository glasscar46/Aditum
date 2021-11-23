import React from "react";
import Animalform from '../pages/animalform'
//import store from '../redux/store'
import { configureStore } from "@reduxjs/toolkit";
import AnimalReducer from "../redux/animalSlice";
import { act } from 'react-dom/test-utils';
import {render, screen, fireEvent} from '@testing-library/react'
import { Provider } from "react-redux";
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event'

describe('AnimalForm Unit test', () => {
    const history = createMemoryHistory()
    let store
    let name
    let date
    let type
    let submit
    let weight
    const leftclick = { button : 0}
    beforeEach( async ()=>{
        store = configureStore({
            reducer:{
                animals: AnimalReducer
            }
        })
      const { container } = render(<Provider store={store}><Router history={history}><Animalform/></Router></Provider>)
       name = await screen.getByTestId('name-input')
       date = await screen.getByTestId('date-input')
       type = await screen.getByTestId('type-input')
       weight = await screen.getByTestId('weight-input')
       submit = await screen.getByTestId('save-button')
    })
    test('should show all imput fields', () => {
      expect(screen.getByTestId('name-input')).toBeInTheDocument();
      expect(screen.getByTestId('type-input')).toBeInTheDocument();
      expect(screen.getByTestId('date-input')).toBeInTheDocument();
      expect(screen.getByTestId('weight-input')).toBeInTheDocument();
    });

    test('name_input  error message', async() => {
        fireEvent.input(name,{target: {value: 'ab'}})
        await act(async () => {
            fireEvent.submit(submit);
        });
        expect(screen.getByTestId('name-error').textContent).toBe('inserir um nome valido');
        fireEvent.input(name,{target: {value: 'abhcsdfcsdjckndcdscnsdcnsc'}})
        await act(async () => {
            fireEvent.submit(submit);
        });
        expect(screen.getByTestId('name-error').textContent).toBe('inserir um nome valido');
        fireEvent.input(name,{target: {value: 'abcd'}})
        await act(async () => {
            fireEvent.submit(submit);
        });
        expect(screen.getByTestId('name-error').textContent).not.toBe('inserir um nome valido');
    });

    test('date_input error message',async () => {
        fireEvent.input(date,{target: {value: '101-101-1999'}})
        await act(async () => {
            fireEvent.submit(submit);
        });
        expect(screen.getByTestId('date-error').textContent).toBe('inserir uma data valida');
        fireEvent.input(date,{target: {value: ''}})
        await act(async () => {
            fireEvent.submit(submit);
        });
        expect(screen.getByTestId('date-error').textContent).toBe('inserir uma data valida');
        fireEvent.input(date,{target: {value:'2019-10-10'}})
        await act(async () => {
            fireEvent.submit(submit);
        });
        expect(screen.getByTestId('date-error').textContent).toBe('');
    })

    test('type_input error message', async () => {
        userEvent.selectOptions(type,'')
        await act(async () => {
            fireEvent.submit(submit);
        });
        expect(screen.getByTestId('type-error').textContent).toBe("selecionar um tipo");

        userEvent.selectOptions(type,'Gato')
        await act(async () => {
            fireEvent.submit(submit);
        });
        expect(screen.getByTestId('type-error').textContent).toBe('');
    });

    test('weight-input error', async () => {
        fireEvent.input(weight,{target: {value: 1}})
        await act(async () => {
            fireEvent.submit(submit);
        });
        expect(screen.getByTestId('weight-error').textContent).toBe('');
        fireEvent.input(name,{target: {value: -15}})
        await act(async () => {
            fireEvent.submit(submit);
        });
        expect(screen.getByTestId('weight-error').textContent).toBe("colocar um peso valido(maior que 0)");
        fireEvent.input(name,{target: {value: -1}})
        await act(async () => {
            fireEvent.submit(submit);
        });
        expect(screen.getByTestId('weight-error').textContent).not.toBe("colocar um peso valido(maior que 0)");
    })
    
    
    
    


})
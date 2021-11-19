import { configureStore } from "@reduxjs/toolkit";
import animalReducer, {selectAllAnimals,selectAnimalsById,deleteAnimal,fetchAnimals,updateAnimal} from "../redux/animalSlice";
import {httpGet, httpDelete,httpPost,httpPut} from '../utils'


jest.mock('../utils.js',()=>({
    httpDelete: jest.fn(),
    httpGet : jest.fn(),
    httpPost : jest.fn(),
    httpPut : jest.fn(),
}))

describe('AnimalSlice unit tests', () => {

    let store;
    beforeEach(()=>{
        store = configureStore({ reducer : animalReducer})
    })

    afterEach(()=>{
        httpDelete.mockClear();
        httpGet.mockClear();
        httpPost.mockClear();
        httpPut.mockClear()
    })
    test('fetchAnimal fulfilled',async () => {
        httpGet.mockImplementation(()=>{
            Promise.resolve([
                { date: "10-12-2010", name: "cathy", weight: 10, _id: 1, type: 'dog' }
            ])
        });
        await store.dispatch(fetchAnimals());
        expect(store.getState().status).toBe('ready');
        expect(store.getState().error).toBe(null);
        expect(store.getState().entities['1']).toBe(
            { 
                date: "10-12-2010",
                name: "cathy",
                weight: 10,
                _id: 1,
                type: 'dog' 
            });
    });

  /*  test('dispatch fetch fullfiled', async () => {
        httpDelete.mockImplementation(() => Promise.reject("erro"));
        
        await store.dispatch(fetchAnimals());
        expect(store.getState().animais.status).toBe('failed');
        expect(store.getState().animais.error).toEqual("erro"
        );
    })
    */

    /*test('fetchAnimal rejected',async () => {
        httpGet.mockImplementation(()=>{
            Promise.reject('err msg')
        });
        await store.dispatch(fetchAnimals());
        expect(store.getState().status).toBe('failed');
        expect(store.getState().error).not.toBe('err msg');
        expect(store.getState().entities.length).toBe(0);
    });*/

    test('deleteAnimal fulfilled',async () => {
        httpDelete.mockImplementation(()=>Promise.resolve());
        await store.dispatch(deleteAnimal(1));
        expect(store.getState().status).toBe('ready');
        expect(store.getState().error).toBe(null);
        expect(store.getState().entities.length).toBe(0);
    })
    
})




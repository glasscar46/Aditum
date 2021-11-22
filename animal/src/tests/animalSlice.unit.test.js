import { configureStore } from "@reduxjs/toolkit";
import '@testing-library/jest-dom'
import '@testing-library/react'
import animalReducer, {deleteAnimal,fetchAnimals,saveAnimal,updateAnimal, getAnimal} from "../redux/animalSlice";
import {httpGet, httpDelete,httpPost,httpPut} from '../utils'


jest.mock('../utils.js',()=>({
    httpDelete: jest.fn(),
    httpGet : jest.fn(),
    httpPost : jest.fn(),
    httpPut : jest.fn(),
}))

describe('AnimalSlice unit tests', () => {
    const animalInitial = {date: "10-12-2010", name: "cathy", weight: 11, _id: 1, type: 'dog'};
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
            return(Promise.resolve([
                { date: "10-12-2010", name: "cathy", weight: 10, _id: 1, type: 'dog' }
            ]))
        });
        await store.dispatch(fetchAnimals());
        expect(store.getState().status).toBe('ready');
        expect(store.getState().error).toBe(null);
        expect(store.getState().entities['1']).toStrictEqual(
            { 
                date: "10-12-2010",
                name: "cathy",
                weight: 10,
                _id: 1,
                type: 'dog' 
            });
    });

    test('fetchAnimal rejected',async () => {
        httpGet.mockImplementation(()=>Promise.reject());
        await store.dispatch(fetchAnimals());
        expect(store.getState().status).toBe('failed');
        expect(store.getState().ids.length).toBe(0);
    });

    test('deleteAnimal fulfilled',async () => {
        httpDelete.mockImplementation(()=>Promise.resolve());
        await store.dispatch(deleteAnimal(1));
        expect(store.getState().status).toBe('ready');
        expect(store.getState().ids.length).toBe(0); ///ta certo??????
    });
    test('deleteAnimal rejected', async () => {
        httpPost.mockImplementation(()=>Promise.resolve(animalInitial));
        store.dispatch(saveAnimal(animalInitial));
        httpDelete.mockImplementation(()=>Promise.reject());
        await store.dispatch(deleteAnimal(1));
        expect(store.getState().status).toBe('failed');
        expect(store.getState().ids.length).toBe(1);
    })
    
    test('updateAnimal failed ', async () => {
        httpPost.mockImplementation(()=>Promise.resolve(animalInitial));
        store.dispatch(saveAnimal(animalInitial));
        httpPut.mockImplementation(()=>Promise.reject( "failed"));
        await store.dispatch(updateAnimal({ date: "10-12-2010", name: "cathy", weight: 10, _id: 1, type: 'dog' }))
        expect(store.getState().status).toBe("failed")
        expect(store.getState().entities["1"]).toStrictEqual(animalInitial);
    });

    test('updateAnimal fulfilled', async() => {
        httpPost.mockImplementation(()=>Promise.resolve(animalInitial));
        store.dispatch(saveAnimal(animalInitial));
        let newAnimal = {...animalInitial, weight : 10};
        httpPut.mockImplementation(()=>Promise.resolve(newAnimal));
        await store.dispatch(updateAnimal({ date: "10-12-2010", name: "cathy", weight: 10, _id: 1, type: 'dog' }))
        expect(store.getState().status).toBe("ready")
        expect(store.getState().entities["1"]).toStrictEqual(newAnimal);
    });

    test('saveAnimal success', async () => {
        httpPost.mockImplementation(()=>Promise.resolve(animalInitial));
        await store.dispatch(saveAnimal(animalInitial));
        expect(store.getState().status).toBe('ready');
        expect(store.getState().ids.length).toBe(1);
        expect(store.getState().entities["1"]).toStrictEqual(animalInitial);
    });
    test('saveAnimal failure', async() => {
        httpPost.mockImplementation(()=>Promise.reject());
        await store.dispatch(saveAnimal(animalInitial));
        expect(store.getState().status).toBe("failed");
        expect(store.getState().ids.length).toBe(0);
    });

    test('getAnimal success', async () => {
        httpGet.mockImplementation(()=>Promise.resolve([animalInitial]));
        await store.dispatch(getAnimal(1))
        expect(store.getState().status).toBe('ready');
        expect(store.getState().entities['1']).toStrictEqual(animalInitial);
    });

    test('getAnimal failure', async () => {
        httpGet.mockImplementation(()=>Promise.reject());
        await store.dispatch(getAnimal(1));
        expect(store.getState().status).toBe("failed");
        expect(store.getState().entities).toEqual({});
    });
    
    
})




import React from "react";
import Card from "../components/card";
import Item from "../components/item";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchAnimals, selectAllAnimals } from "../redux/animalSlice";

export default function AnimalList(props){
   const animals = useSelector(selectAllAnimals)
    const dispatch = useDispatch()
    const history = useHistory()
    const status = useSelector(state=>state.animals.status)
    const handleClick = (e)=>{
        history.push("/new")
        e.preventDefault() }
    useEffect(()=>{
        if(status === "not loaded"){
            dispatch(fetchAnimals)
        }
    },[status,dispatch])
    console.log(animals)
    return(
        <>
            <div className="container justify-content-md-center">
            <div className="row m-1 justify-content-md-left">
                <button type="button" onClick={handleClick} className="btn">Novo Animal</button>
            </div>
            <div className="row">
                <Card>
                    {animals?.map(animal=><Item animal={animal} key={animal._id}/>)}
                </Card>
            </div>
            </div>
        </>
    )
}
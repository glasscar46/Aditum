import React from "react";
import { useDispatch } from "react-redux";
import { deleteAnimal } from "../redux/animalSlice";
import { Link } from "react-router-dom";

export default function Item({animal}) {
    const dispatch = useDispatch()
    const handleDelete = (e)=>{
        dispatch(deleteAnimal(animal._id))
    }
   
    return(
    <tr style={{height: "10px"}}>
        <td>{animal.date}</td>
        <td>{animal.name}</td>
        <td>{animal.type}</td>
        <td>{animal.weight + " Kg"}</td>
        <td><a><Link to={`/${animal._id}/edit`}>Alterar</Link></a></td>
        <td><button type="button" className="btn btn-link" onClick={handleDelete}>Excluir</button></td>
    </tr>
 );

}

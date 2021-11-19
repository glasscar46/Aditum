import React from "react";
import { useDispatch } from "react-redux";
import { deleteAnimal } from "../redux/animalSlice";
import { Link } from "react-router-dom";

export default function Item({animal}) {
    const dispatch = useDispatch()
    const handleDelete = ()=>{
        dispatch(deleteAnimal(animal._id))
    }
   
    if (animal != null && animal.date != null && animal.name != null && animal.type != null && animal.weight != null) {
        return(
        <tr style={{height: "10px"}}>
            <td>{animal.date}</td>
            <td>{animal.name}</td>
            <td>{animal.type}</td>
            <td>{animal.weight + " Kg"}</td>
            <td><Link to={`/${animal._id}/edit`} id="editLink">Alterar</Link></td>
            <td><button id="deletebtn" type="button" className="btn btn-link" onClick={handleDelete}>Excluir</button></td>
        </tr>
     );
    } else {
        return(<tr><td colSpan={3}>Nao foi possivel exibir o animal.</td></tr>)
        
    }

}

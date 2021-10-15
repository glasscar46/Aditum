import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { saveAnimal, selectAnimalsById, updateAnimal } from '../redux/animalSlice';
import { AnimalSchema } from '../model/AnimalSchema';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
//

export default function AnimalForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(AnimalSchema)
    })
    const animalEdit = useSelector(state => selectAnimalsById(state, id));
    let date = new Date(animalEdit?.date)
    function dataFormatada(date) {
        let data = date,
            dia = data.getDate().toString().padStart(2, "0"),
            mes = (data.getMonth() + 1).toString().padStart(2, "0"),
            ano = data.getFullYear();
        return `${mes}/${dia}/${ano} `;
    }
    const handleSave = (animal) => {
        animal.date = dataFormatada(animal.date)
        if (animalEdit?._id) {
            dispatch(updateAnimal({ ...animal, _id: animalEdit._id }));
        }
        else {
            dispatch(saveAnimal(animal));
        }
        history.push("/");
    }
    const handleCancel = (e) => {
        history.push("/");
        e.preventDefault();
    }
    return (
        <Fragment>
            <div className="container justify-content-md-center m-5">
                <form className="needs-validation" onSubmit={handleSubmit(handleSave)}>
                    <div className=" border border-dark border-3 " >
                        <div className="row mt-2 mb-3 justify-content-center">
                            <label for="validationTooltip01" className="col-sm-2 col-form-label">
                                <b>Name</b>
                            </label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    {...register("name")}
                                    defaultValue={animalEdit?.name}
                                    name="name" />
                                <p style={{ color: "red" }}>{errors?.name ? "inserir um nome valido" : ""}</p>
                            </div>
                        </div>
                        <div className="row mb-3 justify-content-center">
                            <label for="validationTooltip01" className="col-sm-2 col-form-label">
                                <b>Tipo</b>
                            </label>
                            <div className="col-sm-6">
                                <select className="form-select form-select-lg" defaultValue={animalEdit?.type} name="type" {...register("type")}>
                                    <option value={null}></option>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Galinha">Galinha</option>
                                    <option value="Sapo">Sapo</option>
                                    <option value="Camelo">Camelo</option>
                                </select>
                                <p style={{ color: "red" }}>{errors?.type ? "selecionar um tipo" : ""}</p>
                            </div>
                        </div>
                        <div class="row mb-3 justify-content-center">
                            <label for="validationTooltip01" className="col-sm-2 col-form-label">
                                <b>Peso</b>
                            </label>
                            <div className="col-sm-6">
                                <input
                                    type="number"
                                    class="form-control"
                                    placeholder="Peso em kg"
                                    defaultValue={animalEdit?.weight}
                                    {...register("weight")}
                                    name="weight" /></div>
                            <p style={{ color: "red" }}>{errors?.weight ? "colocar um peso valido(maior que 0)" : ""}</p>
                        </div>
                        <div className="row mb-3 justify-content-center">
                            <label for="validationTooltip01" className="col-sm-2 col-form-label">
                                <b>Data de Nascimento</b>
                            </label>
                            <div className="col-sm-6">
                                <input
                                    type="date"
                                    className="form-control"
                                    defaultValue={date.toLocaleString()}
                                    {...register("date")}
                                    name="date" />
                                <p style={{ color: "red" }}>{errors?.date ? "inserir uma data valida" : ""}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <input type="submit" className="btn p-1 m-2" value="Salvar" />
                        <button type="button" className="btn p-1 m-2" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

import React from "react";
export default function Card(props) {
    //
    return (
        <div className="table-responsive-lg  border border-dark border-3 table-sm">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Data de Nascimento</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Peso</th>
                        <th scope="col">Alterar</th>
                        <th scope="col">Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>);
}

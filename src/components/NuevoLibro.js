import React, { useState } from 'react';
import { crearNuevoLibroAction } from '../actions/librosActions';
import { validacionExito, validacionError, iniciarValidacion } from '../actions/validacionActions';
import { useDispatch, useSelector } from 'react-redux';


const NuevoLibro = ({history}) => {

    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState('');

    const dispatch = useDispatch();
    const agregarLibro = (libro) => dispatch( crearNuevoLibroAction(libro) );
    const validarFormulario = () => dispatch( validarFormulario() );
    const exitoValidacion = () => dispatch( validacionExito() );
    const errorValidacion = () => dispatch( validacionError () );

    const error = useSelector(state => state.error.error );

    const agregarNuevoLibro = e => {
        e.preventDefault();
        
        if(nombre.trim() === '' || precio.trim() === '') {
            errorValidacion();
            return;
        }
        exitoValidacion();
        agregarLibro({
            nombre, precio
        });
        history.push('/');
    }

    return(
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold ">Agregar Nuevo Libro</h2>
                        <form
                            onSubmit={e => agregarNuevoLibro(e)}
                        >
                            <div className="form-group">
                                <label>Nombre Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre Libro"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio Libro" 
                                    value={precio}
                                    onChange={e => guardarPrecio(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                        </form>
                        { error ? <div className="font-weight-bold alert alert-danger">
                            Todos los campos son obligatorios </div> : null }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevoLibro;
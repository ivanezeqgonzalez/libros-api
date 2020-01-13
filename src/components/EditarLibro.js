import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerLibroEditarAction, editarLibroAction } from '../actions/librosActions';
import {validacionExito, validarFormularioAction, validacionError } from '../actions/validacionActions';

const EditarLibros = ({history, match}) => {
    const {id} = match.params;
    const nombreRef = useRef('');
    const precioRef = useRef('');
    const dispatch = useDispatch();
    const editarLibro = (libro) => dispatch( editarLibroAction(libro) );
    const validarFormulario = () => dispatch( validarFormularioAction() );
    const exitoValidacion = () => dispatch( validacionExito() ) ;
    const errorValidacion = () => dispatch( validacionError() ) ;
    
    useEffect(() => {
        dispatch( obtenerLibroEditarAction(id) );
    }, [dispatch, id]);

    let libro = useSelector(state => state.libros.libro );
    let error = useSelector(state => state.libros.error );
    if(!libro) return 'Cargando...';

    const submitEditarLibro = e => {
        e.preventDefault();
        validarFormulario();
      
        if(nombreRef.current.value.trim() === '' || precioRef.current.value.trim() === ''){
            errorValidacion();
            return;
        }
        
        exitoValidacion();
        editarLibro({
            id,
            nombre: nombreRef.current.value,
            precio: precioRef.current.value
        });

        history.push('/');
    }
        return (        
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Editar Libro</h2>
                        <form
                            onSubmit={submitEditarLibro}
                        >
                            <div className="form-group">
                                <label>Titulo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Titulo"
                                    defaultValue={libro.nombre}
                                    ref={nombreRef}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio"
                                    defaultValue={libro.precio} 
                                    ref={precioRef}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                        </form>
                        { error ? <div className="font-weight-bold alert alert-danger">
                            Hubo un error, intenta de nuevo </div> : null }
                     </div>
                </div>
            </div>
        </div>
    );
}

export default EditarLibros;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerLibrosAction } from '../actions/librosActions';
import Libro from './Libro';

const Libros = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const cargarLibros = () => dispatch( obtenerLibrosAction() );
        cargarLibros();
    }, []);

    const loading = useSelector(state => state.libros.loading );
    const error = useSelector(state => state.libros.error );
    const libros = useSelector(state => state.libros.libros );

    return (
        <React.Fragment>
            { error ? 
                <div className="font-weight-bold alert alert-danger text-center mt-4">
                    Hubo un error...
                </div> 
            : null }
                <h2 className="text-center my-5">Listado de Libros</h2>
                <table className="table table-striped">
                    <thead className="bg-primary table-dark">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>   
                    </thead>
                    <tbody>
                    {libros.map(libro => (                    
                        <Libro 
                            key={libro.id}
                            libro={libro}
                        />
                    ))}
                    </tbody>
                </table>
                { loading? 'Cargando...' : null }
        </React.Fragment>
    );
} 

export default Libros;
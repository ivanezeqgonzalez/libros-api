import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { borrarLibroAction } from '../actions/librosActions';
import Swal from 'sweetalert2'

const Producto = ({libro}) => {
    const {nombre, precio, id} = libro;
    console.log(libro)
    const dispatch = useDispatch();
    const confirmarEliminar = id => {
        console.log(id);
        
        Swal.fire({
            title: 'Estás seguro?',
            text: "Este cambio no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Eliminado!',
                    'El libro ha sido eliminado .',
                    'success'
                )
                dispatch( borrarLibroAction(id) );
            }
          })
    }
    
    return (
        <tr>
            <td>{nombre}</td>
            <td>{precio}</td>
            <td className="acciones">
                <Link 
                    to={`/libros/editar/${id}`}
                    className="btn btn-primary mr-2"    
                >Editar</Link>
                <button
                    onClick={() => confirmarEliminar(libro.id)}
                    className="btn btn-danger"
                >Eliminar</button>
            </td>
        </tr>
    );
}

export default Producto;
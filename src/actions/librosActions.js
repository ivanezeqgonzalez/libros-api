import {
    AGREGAR_LIBRO,
    AGREGAR_LIBRO_EXITO,
    AGREGAR_LIBRO_ERROR,
    COMENZAR_DESCARGA_LIBROS,
    COMENZAR_DESCARGA_ERROR,
    COMENZAR_DESCARGA_EXITOSA,
    OBTENER_LIBRO_ELIMINAR,
    LIBRO_ELIMINADO_EXITO,
    LIBRO_ELIMINADO_ERROR,
    OBTENER_LIBRO_EDITAR,
    LIBRO_EDTIAR_EXITO,
    LIBRO_EDTIAR_ERROR,
    COMENZAR_EDICION_LIBRO,
    LIBRO_EDICION_EXITO,
    LIBRO_EDICION_ERROR
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

export function crearNuevoLibroAction(libro) {
    return (dispatch) => {
        dispatch( nuevoLibro(libro) );

        clienteAxios.post('/libros', libro)
            .then( res => {
                console.log(res)
                dispatch( agregarLibroExito(libro) );
            })
            .catch(error => {
                dispatch( agregarLibroError(error) );
            })
    }
}

export const nuevoLibro = (libro) => ({
    type: AGREGAR_LIBRO,
    payload: libro
})

export const agregarLibroExito = libro => ({
    type: AGREGAR_LIBRO_EXITO,
    payload: libro
})

export const agregarLibroError = error => ({
    type: AGREGAR_LIBRO_ERROR,
    paylod: error
})

export function obtenerLibrosAction() {
    return (dispatch) => {
        dispatch( obtenerLibrosComienzo() );
        clienteAxios.get('/libros')
            .then( res => dispatch(descargaLibrosExitosa(res.data)) )
            .catch( err => dispatch(descargaLibrosError() ) )
    }
}

export const obtenerLibrosComienzo = () => ({
    type: COMENZAR_DESCARGA_LIBROS
})

export const descargaLibrosExitosa = libros => ({
    type: COMENZAR_DESCARGA_EXITOSA,
    payload: libros
})

export const descargaLibrosError = () => ({
    type: COMENZAR_DESCARGA_ERROR
})

export function borrarLibroAction( id ) {
    return (dispatch => {
        dispatch( obtenerLibrosEliminar(id) )
        clienteAxios.delete(`/libros/${id}`)
        .then(res => {
            console.log(res);
            dispatch( eliminarLibroExito(id ) )
        })
        .catch(err => {
            console.error(err)
        })
    })
}

export const obtenerLibrosEliminar = () => ({
    type: OBTENER_LIBRO_ELIMINAR,
})

export const eliminarLibroExito = id => ({
    type: LIBRO_ELIMINADO_EXITO,
    payload: id
})

export const eliminarProdcutoError = () => ({
    type: LIBRO_ELIMINADO_ERROR
})

export function obtenerLibroEditarAction(id) {
    return(dispatch => {
        dispatch( obtenerLibroEditar());
        clienteAxios.get(`/libros/${id}`)
        .then(res => {
            dispatch( obtenerLibroExito(res.data))
        })
        .catch(err => {
            console.log(err)
            dispatch(obtenerLibroEditarError());
        })
    })
}

export const obtenerLibroEditar = () => ({
    type: OBTENER_LIBRO_EDITAR
})

export const obtenerLibroExito = libro => ({
    type: LIBRO_EDTIAR_EXITO,
    payload: libro
})

export const obtenerLibroEditarError = () => ({
    type: LIBRO_EDTIAR_ERROR
})

export function editarLibroAction( libro ) {
    return (dispatch) => {
        dispatch( comenzarEdicionLibro() );

        clienteAxios.put(`/libros/${libro.id}`, libro)
            .then(res => {
                dispatch( editarLibroExito(res.data) )
                Swal.fire(
                    'Almacenado',
                    'El libro se actualizó correctamente',
                    'success'
                )
            })
            .catch(err => {
                console.log('here0')
                dispatch( editarLibroError() )
            })
    }
}

export const comenzarEdicionLibro = () => ({
    type: COMENZAR_EDICION_LIBRO
})

export const editarLibroExito = libro => ({
    type: LIBRO_EDICION_EXITO,
    payload: libro
})

export const editarLibroError = () => ({
    type: LIBRO_EDICION_ERROR
})
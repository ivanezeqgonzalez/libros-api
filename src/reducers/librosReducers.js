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

const initialState = {
    libros:  [],
    error: null,
    loading: false,
    libro: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case AGREGAR_LIBRO:
            return {
                ...state,
                error: null,
            }
        case AGREGAR_LIBRO_EXITO:
            return {
                ...state,
                error: null,
                libros: [...state.libros, action.payload]
            }
        case AGREGAR_LIBRO_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case COMENZAR_DESCARGA_LIBROS:
            return {
                ...state,
                loading: true,
                libro: {}
            }
        case COMENZAR_DESCARGA_EXITOSA:
            return {
                ...state,
                libros: action.payload,
                loading: false,
                error: false,
                libro: {}
            }
        case COMENZAR_DESCARGA_ERROR:
            return {
                ...state,
                libros: [],
                error: true,
                libro: {}
            }
        case OBTENER_LIBRO_ELIMINAR:
            return {
                ...state,
                error: null
            }
        case LIBRO_ELIMINADO_EXITO:
            return {
                ...state,
                libros: state.libros.filter( 
                    libro => libro.id !== action.payload.id
                    ),
                error: null
            }
        case LIBRO_ELIMINADO_ERROR:
            return {
                ...state,
                libros: [],
                error: true
            }
        case OBTENER_LIBRO_EDITAR:
            return {
                ...state,
                error: null
            }
        case LIBRO_EDTIAR_EXITO:
            return {
                ...state,
                error: null,
                libro: action.payload 
            }
        case LIBRO_EDTIAR_ERROR:
            return {
                ...state,
                error: true
            }
        case COMENZAR_EDICION_LIBRO:
            return {
                ...state,
                error: null
            }
        case LIBRO_EDICION_EXITO:
            return {
                ...state,
                error: null,
                libro: state.libro.map(libro => 
                    libro.id === action.payload.id ? 
                    libro = action.payload : libro
                    )
            }
        case LIBRO_EDICION_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }

}
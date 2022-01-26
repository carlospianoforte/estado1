import React from 'react'

const SECURITY_CODE = '123';

const UseReducer = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => dispatch({type: actionTypes.confirm});
    const onError = () => dispatch({type: actionTypes.error});
    const onCheck = () => dispatch({type: actionTypes.check});
    const onDelete = () => dispatch({type: actionTypes.delete});
    const onReset = () => dispatch({type: actionTypes.reset});
    
    const onWrite = (e) => {
        dispatch({
            type: actionTypes.write,
            payload: e.target.value,
        });
    };
   

    React.useEffect(() =>{

        if(!!state.loading){
 
            setTimeout(() => {
                console.log('validando...');
                if(state.value === SECURITY_CODE){
                    onConfirm();

                }else{
                    onError();
                }

            }, 2000);
        }

    }, [state.loading]);

    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>Eliminar {props.name}</h2>

                <p>Escribe codigo de seguridad</p>
                
                {(state.error) && (<p>Código incorrecto</p>)}

                {state.loading && <p>Cargando...</p>}

                <input 
                    placeholder='Código de seguridad' 
                    type="text"
                    value={state.value}
                    onChange={onWrite}
                />

                <button 
                    onClick={onCheck}
                    >
                        Comprobar
                </button>
            </div>
        );
    }else if (!!state.confirmed && !state.deleted){
        return(
            <>
                <p>Estado confirmacion. ¿Estas seguro?</p>
                <button 
                    onClick={onDelete}
                >
                        Si, eliminar
                </button>

                <button 
                    onClick={onReset}  
                    
                >
                        No, volver
                </button>


            </>
        );

    }else{
        return(
            <>
                <p>Eliminado con exito!</p>
                <button 
                    onClick={()=>{
                        onReset();
                    }}
                >
                        Resetear, volver atrás
                </button>
            </>
        );
    }
        
}


const initialState ={
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    confirm: 'CONFIRM',
    delete: 'DELETE',
    reset: 'RESET',
    check: 'CHECK',
    write: 'WRITE',
    error: 'ERROR',
};

const reducerObjet = (state, payload) => ({
    [actionTypes.error]: {
        ...state,
        loading: false,
        error: true,
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.write]: {
        ...state,
        value: payload,
    },
    [actionTypes.confirm]: {
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    },
    [actionTypes.delete]:{
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        deleted:false,
        confirmed:false,
        value: '',
    },
});

const reducer = (state, action) => {
    if(reducerObjet(state)[action.type]){
        return reducerObjet(state, action.payload)[action.type];
    } else {
        return state;
    }
};

export { UseReducer };




         
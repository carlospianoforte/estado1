import React from 'react'

const SECURITY_CODE = '123';

const UseState = (props) => {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true,
        });
    };

    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true,
        });
    };

    const onWrite = (newValue) => {
        setState({
            ...state, 
            value: newValue,
        });
    };

    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        });
    };

    const onDelete = () => {
        setState({
            ...state, 
            deleted: true,

        });
    };

    const onReset = () => {
        setState({
            ...state, 
            deleted:false,
            confirmed:false,
            value: '',

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
                    onChange={(e) => {onWrite(e.target.value)}
                }
                />

                <button 
                    onClick={() => {
                            onCheck();

                    }}
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
                    onClick={()=>{
                        onDelete();
                    }}
                >
                        Si, eliminar
                </button>

                <button 
                    onClick={()=>{
                        onReset();

                    }}
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


export { UseState };

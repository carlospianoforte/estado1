import React from 'react'

const SECURITY_CODE = '123';

class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false
        };
    }

    componentDidUpdate() {
        if (!!this.state.loading) {
            setTimeout(() => {
                if(SECURITY_CODE===this.state.value){
                    this.setState({error: false, loading: false});
                }else{
                    this.setState({error: true, loading: false});
                };
            }, 2000);
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>

                <p>Escribe codigo de seguridad</p>

                {(this.state.error && !this.state.loading)&& (<p>Código incorrecto</p>)}

                {this.state.loading && <p>Cargando...</p>}

                <input 
                    placeholder='Código de seguridad' 
                    type="text" 
                    value={this.state.value}
                    onChange={(e) => this.setState({value: e.target.value})}
                    />

                <button 
                    onClick={()=> this.setState({loading: true})}
                >Comprobar</button>
            </div>
        );
    }
}

export {ClassState};

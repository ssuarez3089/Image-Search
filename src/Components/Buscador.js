import React, { Component } from 'react';

class Buscador extends Component {

    busquedaRef = React.createRef();

    obtenerDatos = (e) => {
        e.preventDefault();
    
        //leemos el valor
        const termino = this.busquedaRef.current.value;
        
        this.props.datosBusqueda(termino);
    
    }

    render() { 
        return ( 
            <form onSubmit={this.obtenerDatos}>
                <div className="row">
                    <div className="form-group col-md-8"> 
                        <input ref={this.busquedaRef} className="form-control form-control-lg" type="text" placeholder="Search your image"/>
                    </div>
                </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block" value="Search." />
                    </div>
            </form>
         );
    }
}
 
export default Buscador;
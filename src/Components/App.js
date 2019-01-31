import React, { Component } from 'react';
import Buscador from './Buscador';
import Resultado from './Resultado';
import '../Css/App.css';

class App extends Component {


  state = {
    termino: '',
    imagenes: [],
    pagina: '',
    cargando: false,
    totalPaginas: '',
  }

  consultarAPI = async () => {
    const termino = this.state.termino;
    const pagina =  this.state.pagina;

    const url = `https://pixabay.com/api/?key=11453340-5c5d4073116c4de75a6f6367b&q=${termino}&per_page=30&page=${pagina}`;
   
    await fetch(url)
      .then(respuesta => {

        this.setState({
          cargando: true
        });
        return respuesta.json()
      } )
      .then(resultado => { 

        const totalPaginacion = Math.ceil(resultado.totalHits / 30);

          setTimeout(() => {
            this.setState({
              imagenes : resultado.hits,
              cargando: false,
              // math.ceil se utiliza para redondear el numero hacia arriba y se requiere cuando se crea una paginacion que siempre traiga un resultado mas
              totalPaginas: totalPaginacion
            })
          }, 500);  
      })

  }

  datosBusqueda = (termino) => {
      this.setState({
        termino: termino,
        pagina: 1
      }, () => {
        this.consultarAPI()
      })
  }

  paginaAnterior = () => {

    //leemos el state
    let pagina = this.state.pagina;

    //con esta funciona si llega a la pagina uno ya no puede retroceder
    if(pagina === 1) return null;
   
    //restar una pagina a la pagina actual
    pagina -= 1;

    //agregar cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarAPI();
      this.scroll();
    });
  }

  paginaSiguiente = () => {

     //leemos el state
    let {pagina} = this.state;

    const {totalPaginas} = this.state;

    //si la pagina actual es igual a la ultima pagina retorna un nulo
    //con esto hacemos destructuring de nuestro state de pagina y totalPaginas para usar un if
    if(pagina === totalPaginas) return null;

    //sumar una pagina a la actual
    pagina += 1;

    //agregar cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarAPI();
      this.scroll();
    })
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }
  render() {

    const cargando = this.state.cargando;

    let resultado;

    if(cargando) {
      resultado = <div className="spinner"></div>
    } else {
        resultado= <Resultado 
        imagenes={this.state.imagenes}
        paginaAnterior={this.paginaAnterior}
        paginaSiguiente={this.paginaSiguiente}
        pagina={this.state.pagina}
        totalPaginas={this.state.totalPaginas}
          />
    }

    return (
      <div className="app container">
          <div className="jumbotron">
            <p className="lead text-center">Image Search</p>
            <Buscador 
              datosBusqueda={this.datosBusqueda}
            />
          </div>
            <div className="row justify-content-center">
              {resultado}
            </div>
      </div>
    );
  }
}

export default App;

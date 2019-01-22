import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

//React component para hacerlo por clase
class App extends React.Component {
    //es lo mismo que inicializar el constructor con el super
    state = { lat: null, errorMessage: '' };

    //funcion que se lanza una vez montada la pagina
    componentDidMount() {
        //metodo de geolocalizacion
        window.navigator.geolocation.getCurrentPosition(
            //siempre setState para setear estados y se vuelve a llamar el render()
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    //funcion que se lanza en cada recarga de la pagina
    componentDidUpdate() {
        console.log('My component was just updated');
    }

    renderContent() {
        if(this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }
        if(!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }
        return <Spinner message="Please accept location request"/>;
    }
 
    render()
    {        
        return this.renderContent();
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));
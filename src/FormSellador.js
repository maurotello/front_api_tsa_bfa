import './App.css';
import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import { defaultClassNames } from 'react-dropzone-uploader';

class FormSellador extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dni: 0,
            name: '',
            file: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //const [archivo , setArchivo] = useState('');
    handleInputChange(event) {

        const { name, value } = event.target
        this.setState({ [name]: value })
        console.log(value); // valor del campo
        console.log(name); // name del campo
    }

    handleSubmit(event) {
        console.log(this.state.name);
        console.log(this.state.dni);
        let dni = this.state.dni;
        let name = this.state.name;
        //console.log(this.state.file);

        let fileReader = new FileReader();
        fileReader.addEventListener('loadend', function() {
            let cryptoDataArray = CryptoJS.lib.WordArray.create(fileReader.result)
            console.log('El hash es: ', CryptoJS.SHA256(cryptoDataArray).toString());

            // Progressive Hashing en https://cryptojs.gitbook.io/docs/
            let sha256 = CryptoJS.algo.SHA256.create();
            sha256.update(cryptoDataArray);
            sha256.update(dni);
            sha256.update(name);
            let hash = sha256.finalize();
            
            console.log('Hash Definitivo2: ', CryptoJS.SHA256(hash).toString());


        })
        fileReader.readAsArrayBuffer(this.state.file)

        event.target.reset()

        event.preventDefault();
    }
    guardarDatos(){

    }
    render() {
        return(
            <div>
                <div class="container mx-auto mt-20 flex w-full clear-both">
                    <form 
                        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full clear-both" 
                        enctype="multipart/form-data" 
                        onSubmit={this.handleSubmit}
                    >
                        <div class="block mb-4">
                            <label for="dni">
                                DNI
                            </label><br />
                            <input 
                                class="rounded text-black-500 form-input" 
                                type="number" 
                                name="dni" 
                                id="dni" 
                                placeholder="Ingrese su DNI sin puntos ni espacios" 
                                onChange={this.handleInputChange}
                                
                                required
                            />
                            
                        </div>
                        <div class="block mb-4">
                            <label for="name">
                                Nombre
                            </label><br />
                            <input 
                                class="rounded text-black-500 form-input" 
                                type="text" 
                                name="name" 
                                id="name" 
                                placeholder="Ingrese su nombre" 
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div class="block mb-4">
                            <input 
                                class="rounded text-blackf-500" 
                                placeholder="Seleccione un archivo" 
                                in="file" 
                                name="file" 
                                type="file"
                                onChange={(e)=>{this.state.file = e.target.files[0]}} 
                                required
                            />
                        </div>
                        <input 
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="submit" 
                            value="Submit"
                        />
                    </form>
                </div>
                <div class="container mx-auto mt-5 flex w-full clear-both">
                    
                </div>
            </div>
        );
    }
    
        // Este enlace es necesario para hacer que `this` funcione en el callback
        //this.handleClick = this.handleClick.bind(this);
}

/*
const FormSellador = () => {

    const [name, setName] = useState("");
    const [dni, setDni] = useState("");
    const [archivo , setArchivo] = useState('');
    
    const handleChange = (e) => {
    }
    
    const fileData = () => {
        if (this.state.selectedFile1) {
            return (
                <div>
                    <h2>File Details:</h2> 
                    <p>File Name: {this.state.selectedFile1.name}</p>
                    <p>File Type: {this.state.selectedFile1.type}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Seleccione un archivo y luego súbalo</h4>
                </div>
            );
        }
    };
  
    const guardarDatos = (e) => {
        e.preventDefault()
        console.log('objeto', archivo);
       
        let fileReader = new FileReader();
        fileReader.addEventListener('loadend', function() {
            let dni = getElementById('dni').value;
            console.log(dni);
            let cryptoDataArray = CryptoJS.lib.WordArray.create(fileReader.result)
            console.log('El hash como string finalmente es', CryptoJS.SHA256(cryptoDataArray).toString());
        })
        fileReader.readAsArrayBuffer(archivo)

        e.target.reset()
        setDni('')
        setName('')
        setArchivo('')

        console.log("SUBIENDO");
        
        //const formData = new FormData();
        //formData.append(
        //    "myFile",
        //    this.state.selectedFile,
        //    this.state.selectedFile.name,
        //);
    }
        // return
}
*/
export default FormSellador;

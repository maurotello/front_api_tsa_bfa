import '../App.css';
import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import { defaultClassNames } from 'react-dropzone-uploader';

class FormSealing extends React.Component{
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
        let dni = this.state.dni;
        let name = this.state.name;

        let fileReader = new FileReader();
        fileReader.addEventListener('loadend', function() {
            let cryptoDataArray = CryptoJS.lib.WordArray.create(fileReader.result)
            // Progressive Hashing en https://cryptojs.gitbook.io/docs/
            let sha256 = CryptoJS.algo.SHA256.create();
            sha256.update(cryptoDataArray);
            sha256.update(dni);
            sha256.update(name);
            let hash = sha256.finalize();
            console.log('Hash Definitivo1: ', hash.toString());
            /*
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: 'React Hooks POST Request Example' })
            };
            fetch("https://localhost:3000/videos/1", requestOptions) 
                .then( (response) => { 
                    return response.json() 
                })
                .then((data) => { 
                    console.log(data) 
                });
                .catch((error) => { 
                    console.log(error) 
                });

            */
        })
        fileReader.readAsArrayBuffer(this.state.file)
        event.target.reset()
        event.preventDefault();
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
}

export default FormSealing;

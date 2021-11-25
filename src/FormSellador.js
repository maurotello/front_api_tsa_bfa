import './App.css';
import CryptoJS from 'crypto-js';
import React, { useState } from 'react';

const FormSellador = () => {

    const [name, setName] = useState("");
    const [dni, setDni] = useState("");
    const [archivo , setArchivo] = useState('');
    
    const handleChange = (e) => {
    }
    
    const fileData = () => {
        if (this.state.selectedFile1) {
            console.log(this.state.selectedFile1);
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
  
    const guardarDatos = async (e) => {
        e.preventDefault()
        console.log('objeto', archivo);
       
        let fileReader = new FileReader();
        fileReader.addEventListener('loadend', function() {
            /*
             console.log(
              'finish read content as ArrayBuffer, osea aca termina de leer y convertir el archivo a un buffer',
              fileReader.result
             )
            */
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
        return (
            <div>
                <div class="container mx-auto mt-20 flex w-full clear-both">
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full clear-both" enctype="multipart/form-data" onSubmit={guardarDatos}>
                        <div class="block mb-4">
                            <label for="dni">
                                DNI
                            </label><br />
                            <input class="rounded text-black-500 form-input" type="number" name="dni" onChange={ (e) => setDni(e.target.value) } placeholder="Ingrese su DNI sin puntos ni espacios" />
                            
                        </div>
                        <div class="block mb-4">
                            <label for="name">
                                Nombre
                            </label><br />
                            <input class="rounded text-black-500 form-input" type="text" name="name" onChange={ (e) => setName(e.target.value) } placeholder="Ingrese si nombre" />
                        </div>
                        <div class="block mb-4">
                            <input class="rounded text-blackf-500" placeholder="Seleccione un archivo" in="file" name="file" type="file"  onChange={(e)=>{setArchivo(e.target.files[0])}} />
                        </div>
                        <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Submit" />
                    </form>
                </div>
                <div class="container mx-auto mt-5 flex w-full clear-both">
                    
                </div>
            </div>
        )
}
export default FormSellador;

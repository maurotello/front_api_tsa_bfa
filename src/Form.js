import './App.css';
import CryptoJS from 'crypto-js';
import React, { useState } from 'react';

class Form extends React.Component {
    
    state = {
        selectedFile: null
      };
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
  
    handleChange(event) {
        const input = document.querySelector('input[type="file"]');
        const file2 = input.files[0];
        this.state.selectedFile = file2;
        //console.log(this.state.selectedFile);
    }
    fileData = () => {
        if (this.state.selectedFile1) {
            //console.log(this.state.selectedFile1);
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
  
    handleSubmit(event) {
        event.preventDefault();
        console.log("SUBIENDO");
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(this.state.selectedFile);
        fileReader.onload = function () {
            console.log("Result: " + fileReader.result);
        };
        fileReader.onerror = function () {
            console.log("Error: " + fileReader.error);
        };
        
        console.log('SHA: ' + CryptoJS.SHA256(fileReader));
        //console.log('SHA2: ' + CryptoJS.SHA256(event.target.files[0]));
        
        
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name,
        );
        
    }
  
    render() {
        return (
            <div>
                <div class="container mx-auto mt-20 flex w-full clear-both">
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full clear-both" enctype="multipart/form-data" onSubmit={this.handleSubmit}>
                        <div class="block mb-4">
                            <label for="dni">
                                DNI
                            </label><br />
                            <input class="rounded text-black-500 form-input" type="number" name="dni" placeholder="Ingrese su DNI sin puntos ni espacios" />
                            
                        </div>
                        <div class="block mb-4">
                            <label for="nombre">
                                Nombre
                            </label><br />
                            <input class="rounded text-black-500 form-input" type="text" name="nombre" placeholder="Ingrese si nombre" />
                        </div>
                        <div class="block mb-4">
                            <label for="file">
                                File:
                                <input class="rounded text-blackf-500" placeholder="Seleccione un archivo" in="file" name="file" type="file" value={this.state.value} onChange={this.handleChange} />
                            </label>
                        </div>
                        <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Submit" />
                    </form>
                </div>
                <div class="container mx-auto mt-5 flex w-full clear-both">
                    {this.fileData()}
                </div>
            </div>
            
        );
    }
}
export default Form;

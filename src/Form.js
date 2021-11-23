import './App.css';
import CryptoJS from 'crypto-js';
import React from 'react';

class Form extends React.Component {
    state = {
        selectedFile1: null
      };
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        
        
        this.setState({ selectedFile1: event.target.files[0] });
    }
    fileData = () => {
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
  
    handleSubmit(event) {
        
        var file = event.target.files[0];
        console.log(file);
        var reader = new FileReader();
        let blob = reader.readAsText(file);

        this.state.sha = CryptoJS.SHA256(blob);
        console.log('SHA: ' + blob);
        
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile1,
            this.state.selectedFile1.name,
        );
        event.preventDefault();
    }
  
    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        File:
                        <input type="file" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {this.fileData()}
            </div>
        );
    }
}
export default Form;

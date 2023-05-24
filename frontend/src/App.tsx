import React from "react";
import axios from "axios";
function App() {

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        axios.get('https//localhost:3000/signin')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log("errrooooor")
                console.error(error.message);
            });
    };

    return (
        <div className="App">
            <h1>Create client</h1>
            <button onClick={(e) => handleSubmit(e)} >Submit</button>
        </div>
    );
}

export default App;

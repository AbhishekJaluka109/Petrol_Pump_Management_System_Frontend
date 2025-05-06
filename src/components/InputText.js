import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';

function InputText(props){
    const [input, setInput] = useState(props.value);
    function handleChange(event){
        setInput(event.target.value);
    }
    useEffect(() => {
        setInput(props.value);  // Ensure controlled component
    }, [props.value]);
    const handleBlur=()=>{
        if(input!=="")
        props.onChange(input);
    }
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{props.name}</Form.Label>
            <Form.Control type="Text" required={props.required} value={input} placeholder="" onChange={handleChange} onBlur={handleBlur}/>
        </Form.Group>
    )
}

export default InputText;
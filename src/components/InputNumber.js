import Form from 'react-bootstrap/Form';
import { useState ,useEffect} from 'react';

function InputNumber(props){
    const [input, setInput] = useState(parseFloat(props.value));
    useEffect(() => {
        setInput(parseFloat(props.value)); 
    }, []);
    function handleChange(event){
        setInput(parseFloat(event.target.value));
        props.onChange(parseFloat(event.target.value));
    }
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{props.name}</Form.Label>
            <Form.Control type="number" step="0.01" value={input?input:props.value} placeholder="" onChange={handleChange} required={props.required}/>
        </Form.Group>
    )
}

export default InputNumber;
import Form from 'react-bootstrap/Form';
import { useState ,useEffect} from 'react';

function InputDate(props){
    const [input, setInput] = useState(props.value);
    useEffect(() => {
            setInput(props.value); 
        }, [props.value]);
    function handleChange(event){
        setInput(event.target.value);
    }
    const handleBlur=()=>{
        if(input!=="")
        props.onChange(input);
    }
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{props.name}</Form.Label>
            <Form.Control type="Date" value={input} placeholder="" onChange={handleChange} required={props.required} onBlur={handleBlur}/>
        </Form.Group>
    )
}

export default InputDate;
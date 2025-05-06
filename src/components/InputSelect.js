import Form from 'react-bootstrap/Form';
import { useState ,useEffect} from 'react';

function InputSelect(props){
    const [input, setInput] = useState(props.value);
    useEffect(() => {
            setInput(props.value);  // Ensure controlled component
        }, [props.value]);
    function handleChange(event) {
        const selectedValue = event.target.value;
        setInput(selectedValue);
        props.onChange(selectedValue); 
    }
    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.name}</Form.Label>
            <Form.Select value={input} required={props.required} onChange={handleChange}>
                <option value="" disabled>Select</option>
                {props.enum.map((value, index) => (
                    <option key={index} value={value} >{value}</option>))}
            </Form.Select>
        </Form.Group>
    )
}

export default InputSelect;
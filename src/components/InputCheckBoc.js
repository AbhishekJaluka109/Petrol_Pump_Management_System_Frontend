import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function InputCheckbox(props) {
    const [checked, setChecked] = useState(props.value || false);

    function handleChange(event) {
        setChecked(event.target.checked);
        props.onChange(event.target.checked);
    }

    useEffect(() => {
        setChecked(props.value || false);
    }, [props.value]);

    return (
        <Form.Group className="mb-3" controlId={props.name}>
            <Form.Check 
                type="checkbox" 
                label={props.name} 
                checked={checked} 
                required={props.required} 
                onChange={handleChange} 
            />
        </Form.Group>
    );
}

export default InputCheckbox;

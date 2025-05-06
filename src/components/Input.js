import React from "react";
import InputText from "./InputText";
import InputNumber from "./InputNumber";
import InputSelect from "./InputSelect";
import InputDate from "./InputDate";

function Input(props){
    const onChange=(data)=>{
        return props.change(props.name,data);
    }
    if(props.type==='Text'){
        return <InputText name={props.name} value={props.value} required={props.required} onChange={onChange}/>
    }
    else if(props.type==='Number'){
        return <InputNumber name={props.name} value={props.value} required={props.required} onChange={onChange}/>
    }
    else if(props.type==='Select'){
        return <InputSelect name={props.name} value={props.value} required={props.required} onChange={onChange} enum={props.enum}/>
    }
    else if(props.type==='Date'){
        return <InputDate name={props.name} value={props.value} required={props.required} onChange={onChange} />
    }
    else if(props.type==='Boolean'){
        return <InputSelect name={props.name} value={props.value} required={props.required} onChange={onChange} enum={["True","False"]}/>
    }
}

export default Input;
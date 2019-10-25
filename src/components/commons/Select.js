import React from 'react';


const Select =(props)=>{

    const renderOptions =(options)=>{
        return <>
            {options.map(x=> <option key={x.value} value={x.value}>{x.label}</option>)}
        </>
    };

    return <>

        <div className='styled-select'>
            <select name='documentss' defaultValue={props.selectedField} onChange={props.onChange}>
                {renderOptions(props.options)}
            </select>
        </div>
    </>

};

export default Select;
import React from 'react';
import styled from 'styled-components';
import {ButtonsContainer} from '../commons/styled'

const Button = (props) => {



    const style = {
        background: props.state.color,
        width: '1em',
    };

    const addSelected = (e) => {
        const value = e.target.parentNode.value;
        if(props.state.isActive){
            console.log('activado');
            props.callbackAdd(value);
        }
        else {
            console.log('desactivado');
            props.callbackAdd(value);
        }
    };
    // className={isActive ? 'selected-button' : 'selection-button'}
    return(

        <button className={props.state.isActive ? 'selected-button' : 'selection-button'} value={props.state.value} onClick={addSelected}>
            <span style={style}/>
            <span className='button-div-middle'>{props.state.value}</span>
            <span className='button-div-extern button-div-final'>{props.state.cant}</span>
        </button>

    );

};

const DocumentsFilter = (props) => {

    const changeStateDataTrue = (value) => {
        const states = props.states;

        for(const state of states.states){
            if(state.value === value)
                state.isActive = true
        }

        return states;
    };

    const changeStateDataFalse = (value) => {
        const states = props.states;

        for(const state of states.states){
            if(state.value === value)
                state.isActive = false
        }

        return states;
    };

    const addSelected = (value) => {
        const array = props.selectedStates.slice();
        let states;
        if(!array.includes(value)){
            array.push(value);
            states = changeStateDataTrue(value);
            props.updateSelectedStates(array);
            props.updatesStates(states);
        }
        else {
            const index = array.indexOf(value);

            array.splice(index, 1);
            states = changeStateDataFalse(value);
            props.updateSelectedStates(array);
            props.updatesStates(states);
        }
    };

    const defaultState = () => {
        props.cleanDocumentsByState();
        props.updateSelectedStates([]);
    };

    const updateStates = () => {
        props.updateDocumentsByState();
    };

    const renderStates = () => {
        return props.states.states.map((state, index) => {
            return(
                <Button callbackAdd={addSelected} key={index} state={state}/>
            )
        })
    };

    return(
        <div className='container-1-1-2'>
            <label>{props.states.name}</label>
            <div>
                {renderStates()}
            </div>
            <ButtonsContainer>
                <button className='button-filter button-style' onClick={updateStates}>Filter</button>
                <button className='button-style' onClick={defaultState}>Clean</button>
            </ButtonsContainer>
        </div>

    );
};

export default DocumentsFilter;
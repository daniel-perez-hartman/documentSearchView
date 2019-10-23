import React from 'react';
import styled from 'styled-components';

function Button(props) {



    const style = {
        background: props.state.color,
        width: '1em',
    };

    function addSelected(e){
        const value = e.target.parentNode.value;
        if(props.state.isActive){
            console.log('activado');
            props.callbackAdd(value);
        }
        else {
            console.log('desactivado');
            props.callbackAdd(value);
        }
    }
    // className={isActive ? 'selected-button' : 'selection-button'}
    return(

        <button className={props.state.isActive ? 'selected-button' : 'selection-button'} value={props.state.value} onClick={addSelected}>
            <span style={style}/>
            <span className='button-div-middle'>{props.state.value}</span>
            <span className='button-div-extern button-div-final'>{props.state.cant}</span>
        </button>

    );

}

function DocumentsViewer(props){

    const StyledComponent = styled.div `
        display: flex;
        flex-direction: row;
        margin-top: 2em;
     `;

    function changeStateDataTrue(value){
        const states = props.states;

        for(const state of states.states){
            if(state.value === value)
                state.isActive = true
        }

        return states;
    }

    function changeStateDataFalse(value){
        const states = props.states;

        for(const state of states.states){
            if(state.value === value)
                state.isActive = false
        }

        return states;
    }

    function addSelected(value){
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
    }

    function defaultState(){
        props.cleanDocumentsByState();
        props.updateSelectedStates([]);
    }

    function updateStates(){
        props.updateDocumentsByState();
    }

    function renderStates(){
        return props.states.states.map((state, index) => {
            return(
                <Button callbackAdd={addSelected} key={index} state={state}/>
            )
        })
    }

    return(
        <div className='container-1-1-2'>
            <label>{props.states.name}</label>
            <div>
                {renderStates()}
            </div>
            <StyledComponent>
                <button className='button-filter button-style' onClick={updateStates}>Filter</button>
                <button className='button-style' onClick={defaultState}>Clean</button>
            </StyledComponent>
        </div>

    );
}

export default DocumentsViewer;
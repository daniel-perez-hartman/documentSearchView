import React from 'react';
import DocumentsFilter from "./DocumentsFilter";
import {Card} from "../commons/styled";
import Select from "../commons/Select";

const Filter = (props)=>{
    const options =[{value:"Status",label:"Status"},{value:"Gender",label:"Gender"}];

    return (
            <div className='container-1-1'>
                <Select selectedField={props.selectedField} onChange={props.onChangeStates} options={options} />
                <DocumentsFilter
                    states={props.statesData}
                    updateDocumentsByState={props.updateDocumentsByState}
                    cleanDocumentsByState={props.cleanDocumentsByState}
                    updateSelectedStates={props.updateSelectedStates}
                    updatesStates={props.updatesStates}
                    selectedStates={props.selectedStates}
                />
            </div>
    )
};

export default Filter;
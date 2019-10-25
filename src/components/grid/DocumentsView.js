import React from 'react';
import {Card, HeaderColumn, Input} from "../commons/styled";

const DocumentsView = (props) => {

    const renderTableData = () => {
        return props.documents.map((document) => {
            return(
                <tr key={document.id}>
                    <td>{document.name}</td>
                    <td>{document.status}</td>
                    <td>{document.gender}</td>
                </tr>
            );
        });
    };

    return (
        <div className='container-1-2'>
            <Input type='search' placeholder='Enter search text' onChange={props.updateDocumentsByText}/>
            <table>
                <thead>
                <tr>
                    <HeaderColumn>Name</HeaderColumn>
                    <HeaderColumn>Status</HeaderColumn>
                    <HeaderColumn>Gender</HeaderColumn>
                </tr>
                </thead>
                <tbody>
                {renderTableData()}
                </tbody>
            </table>
        </div>
    );
}

export default DocumentsView;
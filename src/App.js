import React, {useState} from 'react';
import './App.css';
import DocumentsViewer from "./DocumentsViewer";
import documentsData from './Data.json';

function App() {

    const [selectedField, setSelectedField] = useState('Status');
    const [documents, setDocuments] = useState(documentsData);
    const [selectedStates, setSelectedStates] = useState([]);
    const [inputText, setInputText] = useState('');
    const colors = ['#9900FF','#669900','#CC3300','#669999','#CCCC00','#666666','#CC6600','#66CC66','#000000','#FF0066'];

    let indexColors = 0;

    const defaultStates = constructObjectDefault(selectedField, documentsData);

    const [statesData, setStatesData] = useState(defaultStates);

    function onChangeDocumentsByStates(selectedStates, activeDocuments){
        const auxDocuments = activeDocuments;
        let resultDocuments = [];
        const field = selectedField.toLowerCase();
        if(selectedStates.length > 0){
            for(let state of selectedStates){
                auxDocuments.forEach((document) => {
                    if (document[field] === state)
                        resultDocuments.push(document);
                });
            }
            return resultDocuments
        }
        else return auxDocuments;
    }

    function onChangeDocumentsByText(auxText, selectedStates){
        const text = auxText.toLowerCase();
        const auxDocuments = onChangeDocumentsByStates(selectedStates, documentsData);
        if (text === '') {
            return auxDocuments;
        } else {
            const resultDocuments = [];
            auxDocuments.forEach((document, index) => {
                if (document.name.toLowerCase().includes(text) ||
                    document.status.toLowerCase().includes(text) ||
                    document.gender.toLowerCase().includes(text)) {
                    resultDocuments.push(auxDocuments[index]);
                }
            });
            return resultDocuments;
        }
    }

    function updateSelectedStates(selectedStates){
        indexColors = 0;
        setSelectedStates(selectedStates);
    }

    function updatesStates(states){
        indexColors = 0;
        setStatesData(states);
    }

    function updateStateData(arrayDocuments){
        const statesDataUpdated = statesData;

        console.log(statesDataUpdated);

        for(const state of statesDataUpdated.states){
            state.cant = getCount(state.value, selectedField.toLowerCase(), arrayDocuments)
        }
        return statesDataUpdated;
    }

    function updateDocumentsByState(){
        let arrayDocuments = [];
        indexColors = 0;
        console.log(selectedStates);
        if(selectedStates.length > 0) {
            arrayDocuments = onChangeDocumentsByStates(selectedStates, documents);
            setDocuments(arrayDocuments);
        }
        else{
            arrayDocuments = onChangeDocumentsByText(inputText, selectedStates);
            setDocuments(arrayDocuments);
        }

        const arrayStates = updateStateData(arrayDocuments);
        setStatesData(arrayStates);
    }

    function cleanDocumentsByState(){
        indexColors = 0;
        const arrayDocuments = onChangeDocumentsByText(inputText, []);
        setDocuments(arrayDocuments);
        const arrayStates = constructObjectDefault(selectedField, arrayDocuments);
        setStatesData(arrayStates);
    }

    function updateDocumentsByText(e){
        const text = e.target.value;
        indexColors = 0;
        const arrayDocuments = onChangeDocumentsByText(text, selectedStates);
        setDocuments(arrayDocuments);

        const arrayStates = updateStateData(arrayDocuments);
        setStatesData(arrayStates);

        setInputText(text);
    }

    function getCount(stateName, value, arrayDocuments){
        let count = 0;

        for(let document of arrayDocuments){
            if(document[value] === stateName){
                count++;
            }
        }

        return count;
    }

    function generateState(stateName, value, arrayDocuments){
        const state = {};
        state.value = stateName;
        state.cant = getCount(stateName, value, arrayDocuments);
        state.color = colors[indexColors];
        state.isActive = false;
        indexColors++;

        return state;
    }

    function generateArrayStates(value, arrayDocuments){
        const arrayParams = documentsData.map((document) => {
            return document[value]
        });

        const counterParams = [...new Set(arrayParams)];

        return counterParams.map((stateName) => {
            return generateState(stateName, value, arrayDocuments)
        });
    }

    function constructObjectDefault(selected, arrayDocuments){
        const searchData = {};
        searchData.name = selected;
        searchData.states = generateArrayStates(selected.toLowerCase(), arrayDocuments);

        return searchData;
    }

    function onChangeStates(e){
        indexColors = 0;
        setSelectedField(e.target.value);
        const arrayDocuments = onChangeDocumentsByText(inputText, []);
        const states = constructObjectDefault(e.target.value, arrayDocuments);
        setDocuments(arrayDocuments);
        setStatesData(states);
        setSelectedStates([]);
    }

    function renderTableData() {
        return documents.map((document) => {
            return(
                <tr key={document.id}>
                    <td>{document.name}</td>
                    <td>{document.status}</td>
                    <td>{document.gender}</td>
                </tr>
            );
        });
    }

  return (
     <div className="container-1">
         <div className='container-1-1'>
             <div className='styled-select'>
                 <select name='documents' defaultValue={selectedField} onChange={onChangeStates}>
                     <option value='Status'>Status</option>
                     <option value='Gender'>Gender</option>
                 </select>
             </div>

            <DocumentsViewer
                states={statesData}
                updateDocumentsByState={updateDocumentsByState}
                cleanDocumentsByState={cleanDocumentsByState}
                updateSelectedStates={updateSelectedStates}
                updatesStates={updatesStates}
                selectedStates={selectedStates}
            />
         </div>
         <div className='container-1-2'>
             <input type='search' placeholder='Enter search text' onChange={updateDocumentsByText}/>
             <table>
                 <thead>
                 <tr>
                     <th className='tableHead'>Name</th>
                     <th className='tableHead'>Status</th>
                     <th className='tableHead'>Gender</th>
                 </tr>
                 </thead>
                 <tbody>
                 {renderTableData()}
                 </tbody>
             </table>
         </div>
     </div>
  );
}

export default App;

import React, {useState} from 'react';
import './App.css';
import Filter from "./filter/Filter";
import documentsData from './mock-data/Data.json';
import DocumentsView from './grid/DocumentsView';
import {Layout} from "./commons/styled";

function App() {

    const [selectedField, setSelectedField] = useState('Status');
    const [documents, setDocuments] = useState(documentsData);
    const [selectedStates, setSelectedStates] = useState([]);
    const [inputText, setInputText] = useState('');
    const colors = ['#9900FF','#669900','#CC3300','#669999','#CCCC00','#666666','#CC6600','#66CC66','#000000','#FF0066'];

    let indexColors = 0;

    const constructObjectDefault = (selected, arrayDocuments) => {
        const searchData = {};
        searchData.name = selected;
        searchData.states = generateArrayStates(selected.toLowerCase(), arrayDocuments);

        return searchData;
    };

    const getCount = (stateName, value, arrayDocuments) => {
        let count = 0;

        for(let document of arrayDocuments){
            if(document[value] === stateName){
                count++;
            }
        }

        return count;
    };

    const generateState = (stateName, value, arrayDocuments) => {
        const state = {};
        state.value = stateName;
        state.cant = getCount(stateName, value, arrayDocuments);
        state.color = colors[indexColors];
        state.isActive = false;
        indexColors++;

        return state;
    };

    const generateArrayStates = (value, arrayDocuments) => {
        const arrayParams = documentsData.map((document) => {
            return document[value]
        });

        const counterParams = [...new Set(arrayParams)];

        return counterParams.map((stateName) => {
            return generateState(stateName, value, arrayDocuments)
        });
    };

    const defaultStates = constructObjectDefault(selectedField, documentsData);

    const [statesData, setStatesData] = useState(defaultStates);

    const onChangeDocumentsByStates = (selectedStates, activeDocuments) => {
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
    };

    const onChangeDocumentsByText = (auxText, selectedStates) => {
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
    };

    const updateSelectedStates = (selectedStates) => {
        indexColors = 0;
        setSelectedStates(selectedStates);
    };

    const updatesStates = (states) => {
        indexColors = 0;
        setStatesData(states);
    };

    const updateStateData = (arrayDocuments) => {
        const statesDataUpdated = statesData;

        console.log(statesDataUpdated);

        for(const state of statesDataUpdated.states){
            state.cant = getCount(state.value, selectedField.toLowerCase(), arrayDocuments)
        }
        return statesDataUpdated;
    };

    const updateDocumentsByState = () => {
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
    };

    const cleanDocumentsByState = () => {
        indexColors = 0;
        const arrayDocuments = onChangeDocumentsByText(inputText, []);
        setDocuments(arrayDocuments);
        const arrayStates = constructObjectDefault(selectedField, arrayDocuments);
        setStatesData(arrayStates);
    };

    const updateDocumentsByText = (e) => {
        const text = e.target.value;
        indexColors = 0;
        const arrayDocuments = onChangeDocumentsByText(text, selectedStates);
        setDocuments(arrayDocuments);

        const arrayStates = updateStateData(arrayDocuments);
        setStatesData(arrayStates);

        setInputText(text);
    };

    const onChangeStates = (e) => {
        indexColors = 0;
        setSelectedField(e.target.value);
        const arrayDocuments = onChangeDocumentsByText(inputText, []);
        const states = constructObjectDefault(e.target.value, arrayDocuments);
        setDocuments(arrayDocuments);
        setStatesData(states);
        setSelectedStates([]);
    };

  return (
     <Layout>
         <Filter selectedField={selectedField}
                 onChangeStates={onChangeStates}
                 statesData={statesData}
                 updateDocumentsByState={updateDocumentsByState}
                 cleanDocumentsByState={cleanDocumentsByState}
                 updateSelectedStates={updateSelectedStates}
                 selectedStates={selectedStates}
                 updatesStates={updatesStates}
         />
         <DocumentsView documents={documents} updateDocumentsByText={updateDocumentsByText}
         />
     </Layout>
  );
}

export default App;

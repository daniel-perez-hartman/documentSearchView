import styled from 'styled-components';

export const Layout = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const Input = styled.input`
    background: white;
    font-size: 1em;
    border: 0.125em solid black;
    border-radius: 0.1875em;
    margin-bottom: 1em;
    padding: 0.5em;
    height: 30px;

    :focus::placeholder {
    color: transparent;
    }
`;

export const HeaderColumn= styled.th`
    background: gainsboro;
    width: 12.5em;
`;

export const ButtonsContainer = styled.div `
    display: flex;
    flex-direction: row;
    margin-top: 2em;
`;
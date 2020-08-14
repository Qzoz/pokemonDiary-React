import React from 'react';

const modalContext = React.createContext();

const ModalConsumer = modalContext.Consumer;
const ModalProvider = modalContext.Provider;

export { ModalConsumer, ModalProvider };
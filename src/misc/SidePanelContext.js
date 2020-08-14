import React from 'react';

const sidePanelContext = React.createContext();

const SidePanelConsumer = sidePanelContext.Consumer;
const SidePanelProvider = sidePanelContext.Provider;

export { SidePanelConsumer, SidePanelProvider };
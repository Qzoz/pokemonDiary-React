import React, { Component } from "react";
import { ModalConsumer } from "../../misc/ModalContext";
import PokeModal from "./PokeModal";

class PokeModalController extends Component {
  render() {
    return (
      <ModalConsumer>
        {({ isModalOpen, activePokeId, onHideModal }) => {
          if (activePokeId === 0) return null;
          return (
            <PokeModal
              isModalOpen={isModalOpen}
              onModalClose={onHideModal}
              activePokeId={activePokeId}
            />
          );
        }}
      </ModalConsumer>
    );
  }
}

export default PokeModalController;

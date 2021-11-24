import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './frascos-de-fermentos.reducer';

export interface IFrascosDeFermentosEliminarDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FrascosDeFermentosEliminarDialog = (props: IFrascosDeFermentosEliminarDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/frascos-de-fermentos' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmEliminar = () => {
    props.deleteEntity(props.frascosDeFermentosEntity.id);
  };

  const { frascosDeFermentosEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="frascosDeFermentosEliminarDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="cCheeseApp.frascosDeFermentos.delete.question">Are you sure you want to delete this FrascosDeFermentos?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-frascosDeFermentos" data-cy="entityConfirmEliminarButton" color="danger" onClick={confirmEliminar}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Eliminar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ frascosDeFermentos }: IRootState) => ({
  frascosDeFermentosEntity: frascosDeFermentos.entity,
  updateSuccess: frascosDeFermentos.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FrascosDeFermentosEliminarDialog);

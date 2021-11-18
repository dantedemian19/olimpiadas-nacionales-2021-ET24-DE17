import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './salidas-de-almacen.reducer';

export interface ISalidasDeAlmacenDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SalidasDeAlmacenDeleteDialog = (props: ISalidasDeAlmacenDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/salidas-de-almacen' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.salidasDeAlmacenEntity.id);
  };

  const { salidasDeAlmacenEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="salidasDeAlmacenDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="cCheeseApp.salidasDeAlmacen.delete.question">Are you sure you want to delete this SalidasDeAlmacen?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-salidasDeAlmacen" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ salidasDeAlmacen }: IRootState) => ({
  salidasDeAlmacenEntity: salidasDeAlmacen.entity,
  updateSuccess: salidasDeAlmacen.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SalidasDeAlmacenDeleteDialog);

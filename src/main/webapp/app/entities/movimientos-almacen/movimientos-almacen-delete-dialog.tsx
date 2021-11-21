import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './movimientos-almacen.reducer';

export interface IMovimientosAlmacenDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MovimientosAlmacenDeleteDialog = (props: IMovimientosAlmacenDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/movimientos-almacen' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.movimientosAlmacenEntity.id);
  };

  const { movimientosAlmacenEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="movimientosAlmacenDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="cCheeseApp.movimientosAlmacen.delete.question">Are you sure you want to delete this MovimientosAlmacen?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-movimientosAlmacen" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ movimientosAlmacen }: IRootState) => ({
  movimientosAlmacenEntity: movimientosAlmacen.entity,
  updateSuccess: movimientosAlmacen.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MovimientosAlmacenDeleteDialog);

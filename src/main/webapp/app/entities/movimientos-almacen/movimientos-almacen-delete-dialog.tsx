import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './movimientos-almacen.reducer';

export interface IMovimientosAlmacenEliminarDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MovimientosAlmacenEliminarDialog = (props: IMovimientosAlmacenEliminarDialogProps) => {
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

  const confirmEliminar = () => {
    props.deleteEntity(props.movimientosAlmacenEntity.id);
  };

  const { movimientosAlmacenEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="movimientosAlmacenEliminarDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="cCheeseApp.movimientosAlmacen.delete.question">Are you sure you want to delete this MovimientosAlmacen?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-movimientosAlmacen" data-cy="entityConfirmEliminarButton" color="danger" onClick={confirmEliminar}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Eliminar
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

export default connect(mapStateToProps, mapDispatchToProps)(MovimientosAlmacenEliminarDialog);

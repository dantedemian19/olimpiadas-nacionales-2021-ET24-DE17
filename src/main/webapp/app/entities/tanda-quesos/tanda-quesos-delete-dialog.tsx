import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './tanda-quesos.reducer';

export interface ITandaQuesosEliminarDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TandaQuesosEliminarDialog = (props: ITandaQuesosEliminarDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/tanda-quesos' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmEliminar = () => {
    props.deleteEntity(props.tandaQuesosEntity.id);
  };

  const { tandaQuesosEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="tandaQuesosEliminarDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="cCheeseApp.tandaQuesos.delete.question">Are you sure you want to delete this TandaQuesos?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-tandaQuesos" data-cy="entityConfirmEliminarButton" color="danger" onClick={confirmEliminar}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Eliminar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ tandaQuesos }: IRootState) => ({
  tandaQuesosEntity: tandaQuesos.entity,
  updateSuccess: tandaQuesos.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TandaQuesosEliminarDialog);

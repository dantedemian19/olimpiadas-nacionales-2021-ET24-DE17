import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './tipo-de-queso.reducer';

export interface ITipoDeQuesoDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TipoDeQuesoDeleteDialog = (props: ITipoDeQuesoDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/tipo-de-queso' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.tipoDeQuesoEntity.id);
  };

  const { tipoDeQuesoEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="tipoDeQuesoDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="cCheeseApp.tipoDeQueso.delete.question">Are you sure you want to delete this TipoDeQueso?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-tipoDeQueso" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ tipoDeQueso }: IRootState) => ({
  tipoDeQuesoEntity: tipoDeQueso.entity,
  updateSuccess: tipoDeQueso.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoDeQuesoDeleteDialog);

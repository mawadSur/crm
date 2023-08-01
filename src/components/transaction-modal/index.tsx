import { Box, Modal } from '@mui/material';
import React from 'react';
import { Title } from './style.js';

export interface ITransactionModalProps {
  open: boolean;
  onClose: () => void;
  opportunity: any;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TransactionModal = ({ open, onClose, opportunity }: ITransactionModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Title>Customer</Title>
          <div>
            <b>Customer Name:</b> {'customer.name'}
          </div>
          <div>
            <b>Address:</b> {'customer.address'}
          </div>
          <div>
            <b>Home Number:</b> {'customer.homeNumber'}
          </div>
          <div>
            <b>Cell Number:</b> {'customer.cellNumber'}
          </div>
          <div>
            <b>Work Number:</b> {'customer.workNumber'}
          </div>
          <div>
            <b>Preferred Email:</b> {'customer.email'}
          </div>
          <div>
            <b>Other Email:</b> {'customer.otherEmail'}
          </div>
          <div>
            <b>Birthday:</b> {'new Date(customer.dateOfBirth).toDateString()'}
          </div>
          <div>
            <b>Last Modified:</b> {'new Date(customer.updatedAt).toLocaleString()'}
          </div>
          <div>{/* <b>Text Preferred:</b> {customer?.textPreferred ? 'Yes' : 'No'} */}</div>
        </Box>

        <Box style={{ marginTop: '20px' }}>
          <Title>Opportunity</Title>
          <div>
            <b>Vehicle:</b> {'opportunity.vehicle'}
          </div>
          <div>
            <b>Stock Number:</b> {'opportunity.stock'}
          </div>
          <div>
            <b>Trade:</b> {opportunity?.trade ? 'Yes' : 'No'}
          </div>
          <div>
            <b>Sales Team:</b> {'opportunity.salesTeam'}
          </div>
          <div>
            <b>Up Type:</b> {'opportunity.upType'}
          </div>
          <div>
            <b>Source:</b> {'opportunity.source'}
          </div>
          <div>
            <b>Date/Time Due:</b> {'new Date(opportunity.dateTimeDue).toLocaleString()'}
          </div>
          <div>
            <b>Sales Status:</b> {'opportunity.salesStatus'}
          </div>
          <div>
            <b>In Showroom:</b> {opportunity?.inShowroom ? 'Yes' : 'No'}
          </div>
          <div>
            <b>Demo:</b> {opportunity?.demo ? 'Yes' : 'No'}
          </div>
          <div>
            <b>Ask Money Down:</b> {opportunity?.askMoneyDown ? 'Yes' : 'No'}
          </div>
          <div>
            <b>Write Up:</b> {opportunity?.writeUp ? 'Yes' : 'No'}
          </div>
          <div>
            <b>TO:</b> {opportunity?.to ? 'Yes' : 'No'}
          </div>
          <div>
            <b>Manager Phone Call:</b> {opportunity?.managerPhoneCall ? 'Yes' : 'No'}
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default TransactionModal;

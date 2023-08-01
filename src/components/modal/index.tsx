import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Customer, Opportunity } from '../../models/index.js';
import { ModalContainer, ModalContent, HalfDiv, CloseButton } from './style.js';
// import { closeModal } from 'src/reducers/modalReducer.js';

const TransactionModal = ({ transactionId }) => {
  // const transactionId = useSelector((state: any) => state.transactionId);
  const isOpen = useSelector((state: any) => state.isOpen);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

  const handleOnClose = () => {
    console.log('closeModal');
    // dispatch(closeModal()); // set modal state to true to open the modal
  };

  if (transactionId) {
    console.log(
      'This is the transactionId, we need to load the right infromation for this value',
      transactionId,
    );
  }

  // if (!isOpen) {
  //   return null;
  // }

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton type="button" onClick={() => handleOnClose()}>
          X
        </CloseButton>
        <HalfDiv>
          <h2>Customer</h2>
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
          <div>
            <b>Text Preferred:</b> {customer.textPreferred ? 'Yes' : 'No'}
          </div>
        </HalfDiv>

        <HalfDiv>
          <h2>Opportunity</h2>
          <div>
            <b>Vehicle:</b> {'opportunity.vehicle'}
          </div>
          <div>
            <b>Stock Number:</b> {'opportunity.stock'}
          </div>
          <div>
            <b>Trade:</b> {opportunity.trade ? 'Yes' : 'No'}
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
            <b>In Showroom:</b> {opportunity.inShowroom ? 'Yes' : 'No'}
          </div>
          <div>
            <b>Demo:</b> {opportunity.demo ? 'Yes' : 'No'}
          </div>
          <div>
            <b>Ask Money Down:</b> {opportunity.askMoneyDown ? 'Yes' : 'No'}
          </div>
          <div>
            <b>Write Up:</b> {opportunity.writeUp ? 'Yes' : 'No'}
          </div>
          <div>
            <b>TO:</b> {opportunity.to ? 'Yes' : 'No'}
          </div>
          <div>
            <b>Manager Phone Call:</b> {opportunity.managerPhoneCall ? 'Yes' : 'No'}
          </div>
        </HalfDiv>
      </ModalContent>
    </ModalContainer>
  );
};

export default TransactionModal;

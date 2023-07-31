import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ModalContainer, ModalContent, HalfDiv } from './style.js';
import { closeModal } from 'src/reducers/modalReducer.js';

const TransactionModal = () => {
  const dispatch = useDispatch();
  const transactionId = useSelector((state: any) => state.transactionId);
  const isOpen = useSelector((state: any) => state.isOpen);
  const { register, handleSubmit } = useForm();

  const handleOnClose = () => {
    console.log('closeModal');
    dispatch(closeModal()); // set modal state to true to open the modal
  };

  const onSubmit = (data) => {
    // handle submit
  };

  if (transactionId) {
    console.log(
      'This is the transactionId, we need to load the right infromation for this value',
      transactionId
    );
  }

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HalfDiv>
            <h2>Customer</h2>
            <input {...register('name')} placeholder="Customer Name" />
            <input {...register('address')} placeholder="Address" />
            <input {...register('homeNumber')} placeholder="Home Number" />
            <input {...register('cellNumber')} placeholder="Cell Number" />
            <input {...register('workNumber')} placeholder="Work Number" />
            <input {...register('preferredEmail')} placeholder="Preferred Email" />
            <input {...register('otherEmail')} placeholder="Other Email" />
            <input {...register('birthday')} placeholder="Birthday" type="date" />
            <input
              {...register('lastModified')}
              placeholder="Last Modified"
              type="datetime-local"
            />
            <input {...register('textPreferred')} type="checkbox" />
          </HalfDiv>

          <HalfDiv>
            <h2>Opportunity</h2>
            <input {...register('vehicle')} placeholder="Vehicle" />
            <input {...register('stock')} placeholder="Stock Number" />
            <input {...register('trade')} type="checkbox" />
            <select {...register('salesTeam')}>
              <option value="">Select</option>
              <option value="team1">Team 1</option>
              <option value="team2">Team 2</option>
              {/* Add more teams here */}
            </select>
            <input {...register('upType')} placeholder="Up Type" />
            <input {...register('source')} placeholder="Source" />
            <input {...register('dateTimeDue')} placeholder="Date/Time Due" type="datetime-local" />
            <select {...register('salesStatus')}>
              <option value="">Select</option>
              <option value="working">Working</option>
              <option value="testDrive">Test Drive</option>
              <option value="offer">Offer</option>
              <option value="counter">Counter</option>
            </select>
            <input {...register('inShowroom')} type="checkbox" />
            <input {...register('demo')} type="checkbox" />
            <input {...register('askMoneyDown')} type="checkbox" />
            <input {...register('writeUp')} type="checkbox" />
            <input {...register('to')} type="checkbox" />
            <input {...register('managerPhoneCall')} type="checkbox" />
          </HalfDiv>

          <button type="button" onClick={() => handleOnClose()}>
            Close
          </button>
        </form>
      </ModalContent>
    </ModalContainer>
  );
};

export default TransactionModal;

import React from 'react';
import { Label } from '../../../components/common/index.js';

const CustomerReferences = (props) => {
  const origin = window.location.origin;
  const customer =
    props.record.populated?.customerId?.params?.name ??
    props.record.populated?.customerId?.params?._id ??
    '';
  const customerId = props.record.populated?.customerId?.params?._id ?? '';

  return (
    <div style={{ marginBottom: '24px' }}>
      {props.where === 'show' && <Label disabled={true}>Customer Reference</Label>}
      {customer && customerId ? (
        <a
          style={{ textDecoration: 'unset' }}
          href={`${origin}/admin/resources/customers/records/${customerId}/show`}
        >
          {customer}
        </a>
      ) : (
        'Customer Removed'
      )}
    </div>
  );
};
export default CustomerReferences;

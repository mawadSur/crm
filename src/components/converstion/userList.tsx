import React, { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  //   max-width: 800px;
  //   margin: 0 auto;
`;

const StyledTable = styled.table`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
`;

const TableHeader = styled.th`
  padding: 15px;
  text-align: left;
  background-color: #f5f5f5;
  color: #333;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:first-child {
    background-color: rgba(0, 0, 0, 0.01;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  color: #555;
`;

const dummyUsers = [
  { id: '1', username: 'Alice' },
  { id: '2', username: 'Bob' },
  { id: '3', username: 'Charlie' },
];

function userList() {
  const [users] = useState(dummyUsers);

  return (
    <TableContainer>
      <h1>Customer List</h1>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Username</TableHeader>
            <TableHeader>Username</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.username}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

export default userList;

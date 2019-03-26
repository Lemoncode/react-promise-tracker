import React from 'react';

export const Row = (user) => (
  <tr key={user.id}>
    <td>
      <span>{user.id}</span>
    </td>
    <td>
      <span>{user.name}</span>
    </td>
    <td>
      <span>{user.email}</span>
    </td>
  </tr>
);
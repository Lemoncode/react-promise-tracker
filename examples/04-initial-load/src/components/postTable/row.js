import React from 'react';

export const Row = (post) => (
  <tr key={post.id}>
    <td>
      <span>{post.id}</span>
    </td>
    <td>
      <span>{post.title}</span>
    </td>
    <td>
      <span>{post.body}</span>
    </td>
  </tr>
);
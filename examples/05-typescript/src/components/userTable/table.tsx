import * as React from 'react';
import { Table } from '../../common/table';
import { Header } from './header';
import { Row } from './row';

export const UserTable = (props) => (
  <Table
    title="Users"
    items={props.users}
    headerRender={Header}
    rowRender={Row}
  />
);

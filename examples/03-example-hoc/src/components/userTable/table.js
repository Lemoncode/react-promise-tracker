import React from 'react';
import { areas } from '../../common/constants/areas';
import { Spinner } from '../../common/components/spinner';
import { Table } from '../../common/components/table';
import { Header } from './header';
import { Row } from './row';

export const UserTable = (props) => (
  <div>
    <Table
      title="Users"
      items={props.users}
      headerRender={Header}
      rowRender={Row}
    />
    <Spinner
      config={{area: areas.user}}
    />
  </div>
);

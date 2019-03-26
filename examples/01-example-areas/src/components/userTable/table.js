import React, { Component } from 'react';
import { Spinner } from '../../common/components/spinner';
import { areas } from '../../common/constants/areas';
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
    area={areas.user}
  />
  </div>

);

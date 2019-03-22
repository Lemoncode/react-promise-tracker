import React, { Component } from 'react';
import { Spinner } from '../../common/components/spinner';
import { areas } from '../../common/constants/areas';
import { Table } from '../../common/components/table';
import { Header } from './header';
import { Row } from './row';

export const PostTable = (props) => (
  <div>
  <Table
    title="Posts"
    items={props.posts}
    headerRender={Header}
    rowRender={Row}
  />
  <Spinner
  area={areas.post}
  />
  </div>
);

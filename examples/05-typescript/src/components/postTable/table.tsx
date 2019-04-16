import * as React from 'react';
import { Table } from '../../common/table';
import { Header } from './header';
import { Row } from './row';

export const PostTable = (props) => (
  <Table
    title="Posts"
    items={props.posts}
    headerRender={Header}
    rowRender={Row}
  />
);

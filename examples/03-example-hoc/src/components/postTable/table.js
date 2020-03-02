import React from 'react';
import { areas } from '../../common/constants/areas';
import { Spinner } from '../../common/components/spinner';
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
      config={{area: areas.post}}
    />
  </div>
);

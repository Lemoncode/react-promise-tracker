import React from "react";
import { Table } from "../../../common/components";
import { Header } from "./header";
import { Row } from "./row";

export const PostTable = ({ posts }) => (
  <Table title="Posts" items={posts} headerRender={Header} rowRender={Row} />
);

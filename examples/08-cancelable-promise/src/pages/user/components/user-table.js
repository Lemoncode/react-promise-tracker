import React from "react";
import { Table } from "../../../common/components";
import { Header } from "./header";
import { Row } from "./row";

export const UserTable = ({ users }) => (
  <Table items={users} headerRender={Header} rowRender={Row} />
);

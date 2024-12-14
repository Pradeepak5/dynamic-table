import React from "react";
import Table from "./components/Table";
import { data } from "./data";

const App = () => {
  return (
    <div className="app">
      <h1>Simple Hierarchical Table</h1>
      <Table data={data} />
    </div>
  );
};

export default App;

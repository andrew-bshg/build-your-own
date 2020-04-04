import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
// import { useHistory } from 'react-router'
// import axios from "axios";
import { store } from "./store";
import { useStoreState } from "pullstate";
import "./App.css";
import Home from "./containers/Home";
import Summary from "./containers/Summary";
import Feature from "./containers/Feature";
import json from "./what.json";

function App() {
  //onComponentDidMount Equivalent
  useEffect(() => {
    // axios.get("https://bshpersona.com/personaAPI/data/GetBYOData").then(res => {
    //   console.log(res.data.ProductBuilder);
    //   const { group, ListValues, products } = res.data.ProductBuilder;
    //   store.update(s => {
    //     s.groups = group;
    //     s.listValues = ListValues;
    //     s.products = products;
    //   });
    // });
    // creating Initial Pullstate
    const { group, ListValues, products } = json.ProductBuilder;
    store.update(s => {
      s.groups = group;
      s.listValues = ListValues;
      s.products = products;
    });
  }, []);

  // const history = useHistory();
  // console.log(history);

  const listValues = useStoreState(store, s => s.listValues);
 
  return (
    <div className="App">
      <Switch>
        {/* Dynamically creating routes */}
        {listValues.map(listValue => (
          <Route key={listValue.listItemID} exact path={`/${listValue.listID}`}>
            <Feature
              keyName={listValue.keyName}
              key={listValue.listItemID}
              name={listValue.listName}
              items={listValue.listItems}
            />
          </Route>
        ))}
        {/* Final route */}
        <Route path="/summary">
          <Summary />
        </Route>
        {/* HOME ROUTE */}
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

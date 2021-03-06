import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Todo from "./components/Todo";
import AllTodo from "./components/AllTodo";
import axios from "axios";
import { useState, useEffect } from "react";
import EditItem from "./components/EditItem";
const BASE = process.env.REACT_APP_AIRTABLE_BASE;
const KEY = process.env.REACT_APP_AIRTABLE_KEY;
const URL = `https://api.airtable.com/v0/${BASE}/todo`;

const config = {
  headers: {
    Authorization: `Bearer ${KEY}`,
  },
};

function App() {
  const [todo, setTodo] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const fetchTodo = async () => {
      const res = await axios.get(URL, config);
      setTodo(res.data.records);
    };
    fetchTodo();
  }, [toggle]);

  return (
    <>
      <Navbar> </Navbar>{" "}
      <Switch>
        <Route exact path="/todo/:category">
          <Todo todo={todo} setToggle={setToggle} />{" "}
        </Route>{" "}
        <Route exact path="/allTodo">
          <AllTodo todo={todo} />{" "}
        </Route>{" "}
        <Route exact path="/todo/:category/edit/:id">
          <EditItem setToggle={setToggle} />{" "}
        </Route>{" "}
        <Route exact path="/">
          <Home />
        </Route>{" "}
      </Switch>{" "}
    </>
  );
}

export default App;

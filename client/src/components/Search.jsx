import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form className="d-flex " style={{ width: "100%" ,background:'inherit', outline:'none', border:'none'}} onSubmit={formHandler}>
      <Form.Control
        type="search"
        placeholder="Search..."
        className="me-2 "
        aria-label="Search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className="btn" ><i className="ri-search-line " style={{color:'#707070'}} ></i></button>
    </Form>
  );
};

export default Search;

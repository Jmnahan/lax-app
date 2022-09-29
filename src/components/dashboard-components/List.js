import { useState } from "react";

const List = (props) => {
    console.log(props.body)
    console.log(props.key)
  return (
    <div>
      <p>{props.body} line 6</p>
    </div>
  );
};

export default List;

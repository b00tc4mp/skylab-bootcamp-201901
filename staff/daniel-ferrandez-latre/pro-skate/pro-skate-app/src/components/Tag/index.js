import React from "react";

function Tag({tag}) {
  return (
    <>
    <li>
        <span class='tag is-success'>{tag}</span>
      </li>
    </>
  );
}

export default Tag;

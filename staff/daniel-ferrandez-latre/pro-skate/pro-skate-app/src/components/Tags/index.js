import React from "react";
import Tag from "../Tag"

function Tags({tagsItem}) {

  console.log(tagsItem)

  return (
    <>
      <div class='field is-grouped is-grouped-multiline'>
        <div class='control'>
          <div class='tags has-addons tags are-medium'>
            { 
              tagsItem.map(tag =>{
              return <Tag tag={tag}/>
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tags;

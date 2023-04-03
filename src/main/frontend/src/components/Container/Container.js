import React from 'react'
import "../../App";
import "./Container.css"
function Container(props) {
    return (
      <container className='containerBox'>
        <div className='containertext'>
          <h1>Container</h1>
          <h1><span> 내용  </span></h1>
        </div>
      </container>
    );
  }
  
  export default Container
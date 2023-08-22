import React, { useState } from 'react'

function Demo() {
    const [postData, setPostData]=useState({})
  return (
    <div>
        <input onChange={(e)=>setPostData({})} placeholder='Name'></input>
        <input onChange={(e)=>setPostData({})} placeholder='Number'></input>
        <input onChange={(e)=>setPostData({})} placeholder='Hobby'></input>
        <button>Add</button>
    </div>
  )
}

export default Demo
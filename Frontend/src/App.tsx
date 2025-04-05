
import { useState } from 'react'
import './App.css'
import { Card } from './Components/Card'
import { ContentModel } from './Components/ContentModel'
import { Button } from './Components/UI/Button'
import { PlusIcon } from './Icons/PlusIcon' 
import { ShareIcon } from './Icons/ShareIcon'

function App() {
const [model,setModel]=useState(false);
console.log(model)

  return (
    <div className='p-4'>
      <ContentModel open={model} onClose={()=>{setModel(false)}}/>    
      <div className='flex justify-end gap-2'>
        
        <Button  onClick={()=>setModel(true)}variant='primary' text='Add Content' size='md' starticon={<PlusIcon size='md' />} ></Button>
        <Button variant="secondary" text='Share Brain' size='md' starticon={<ShareIcon size='md' />}></Button>
      </div>
      <div className='flex gap-2'>
        <Card title='Project Idea' type='Youtube' link='https://www.youtube.com/watch?v=89CurjyigWA' />
        <Card title='Project Idea' type='twitter' link='https://x.com/elonmusk/status/1907323764729094230' />
      </div>


    </div>
  )
}

export default App

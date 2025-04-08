
import { useState } from 'react'
import './App.css'
import { Card } from './Components/UI/Card'
import { ContentModel } from './Components/UI/ContentModel'
import { Button } from './Components/UI/Button'
import { PlusIcon } from './Components/Icons/PlusIcon' 
import { ShareIcon } from './Components/Icons/ShareIcon'
import { SideBar } from './Components/UI/SideBar'

function App() {
const [model,setModel]=useState(false);
console.log(model)

  return (
    <div>
      <SideBar/>
      <div className='p-4 min-h-screen bg-slate-200 ml-72'>
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
    </div>
    
  )
}

export default App

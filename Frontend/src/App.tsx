
import './App.css'
import { Button } from './Components/UI/Button'
import { PlusIcon } from './Icons/PlusIcon'
import { ShareIcon } from './Icons/ShareIcon'

function App() {


  return (
  <div className='m-2'>
      
      <Button variant='primary' text='share' size='md'starticon={<PlusIcon size='sm'/>} ></Button>
      <Button variant="secondary" text='Add Content' size='md' starticon={<ShareIcon size='sm'/>}></Button>
      
    
  </div>
  )
}

export default App

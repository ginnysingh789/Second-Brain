
import './App.css'
import { Button } from './Components/UI/Button'
import { PlusIcon } from './Icons/PlusIcon'

function App() {


  return (
  <div className='m-2'>
      
      <Button variant='primary' text='share' size='md'starticon={<PlusIcon/>} ></Button>
      <Button variant="secondary" text='Add Content' size='md' starticon={<PlusIcon/>}></Button>
      
    
  </div>
  )
}

export default App

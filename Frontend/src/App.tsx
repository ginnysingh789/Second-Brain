
import './App.css'
import { Card } from './Components/Card'
import { Button } from './Components/UI/Button'
import { PlusIcon } from './Icons/PlusIcon'
import { ShareIcon } from './Icons/ShareIcon'

function App() {


  return (
    <div className='m-2 '>

      <Button variant='primary' text='Add Content' size='md' starticon={<PlusIcon size='md' />} ></Button>
      <Button variant="secondary" text='Share Brain' size='md' starticon={<ShareIcon size='md' />}></Button>
      <Card/>
     

    </div>
  )
}

export default App

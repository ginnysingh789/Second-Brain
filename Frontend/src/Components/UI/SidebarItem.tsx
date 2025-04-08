import { ReactElement } from "react"

interface sideItems{
    text:String,
    icon:ReactElement
}
export const SideBarItem=(prop:sideItems)=>{
    return(<div className="flex pb-4">
        
       <div className="pr-2">{prop.icon}</div>
       <div className="pr-2"> {prop.text}</div>
        
    </div>)

}
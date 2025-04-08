import { BrainIcon } from "../Icons/BrainIcon"
import { TwitterIcon } from "../Icons/TwitterIcon"
import { Youtube } from "../Icons/YoutubeIcon"
import { SideBarItem } from "./SidebarItem"

export const SideBar =()=>{
    return(<div className="h-screen bg-white border-r w-72 fixed left-0 top-0  ">
        <div className="text-2xl flex pb-3 pl-2.5 " ><div className="pr-2 text-purple-700" ><BrainIcon/></div>Brainly</div>
        <div className="pl-4">
            <SideBarItem text={"Twitter" } icon={<TwitterIcon/>}/>
            <SideBarItem text={"Youtube" } icon={<Youtube/>}/>
        </div>
    </div>)
    
}
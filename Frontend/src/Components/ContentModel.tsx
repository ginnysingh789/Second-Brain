import { CrossIcon } from "../Icons/CrossIcon"
import { Button } from "./UI/Button"

export const ContentModel = ({open,onClose}) => {
    return (
        <div>
            {open && <div className="w-screen h-screen  bg-red-200 top-0 left-0 fixed opacity-70 flex justify-center" >
                <div className="flex flex-col justify-center">
                    <span className="opacity-100 bg-white rounded p-4">
                        <div className="flex justify-end">
                            <div onClick={onClose}>
                            <CrossIcon size="md"/>
                            </div>
                            
                            </div>
                            <div>
                                <Input placeholder={"Title"}/>
                                <Input placeholder={"Type"}/>
                                <div className="flex justify-center mt-4">
                                    <Button variant="primary" text="Submit" size="md"/>
                                </div>
                            </div>
                        
                        
                    </span>
                </div>
            </div>}
        </div>
    )
}
function Input({onChange,placeholder}:{onChange:()=>void}){
    return<div className="mt-4">
        <input placeholder={placeholder} type={"text"} onChange={onChange} className="px-4 py-2 border rounded"></input>
         </div>

}
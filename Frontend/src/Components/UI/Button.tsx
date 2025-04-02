import { ReactElement } from "react";

export interface btwprop{
    variant:"primary"|"secondary",
    text:string,
    size:'sm'|'md'|'lg',
    starticon ?:ReactElement,
    endicon ?:ReactElement,
    onClick:()=>void

}
const VariantStyle = {
  primary: "bg-[#4e47e4] text-white", // Custom purple-600
  secondary: "bg-[#dfe8fe] text-[#4e47e4]" // Custom purple-400
};
const defaultStyle="rounded-md flex font-semibold text-xl  items-center";
const sizeStyle={
  "sm":"py-1 px-2",
  "md":"py-2 px-4",
  "lg":"py-4 px-6"
}

export const Button=(props:btwprop)=>{
  return(
    <button className={`${VariantStyle[props.variant]} ${defaultStyle} ${sizeStyle[props.size]}`}>{props.starticon ?<div className="pr-2">{props.starticon}</div>:null}{props.text}{props.endicon ?<div className="pr-2">{props.endicon}</div>:null}</button>//<Button> refers to  any custom Button Element which i dont  have 
  )
}

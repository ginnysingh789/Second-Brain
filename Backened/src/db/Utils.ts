//Generate Hash string for shareable link
export const generateRandon=(len:number)=>{
    let option="sjdfghjkghhdfgiouhghfsdj1495488";//
    let ans="";
    for(let i=0;i<len;i++)
    {
        ans+=option[Math.floor(Math.random()*len)]
    }
    return ans;
}
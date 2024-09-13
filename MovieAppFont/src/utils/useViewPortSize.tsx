import { useEffect,useState } from "react";

function useViewPortSize(widthToCheck:number|string,operator:string='>'):Array<number|boolean> {
    const [currentWindowwidth,setWidth] = useState<number|null>(null);
    const [match,setMatch] = useState<boolean|null>(null);

    useEffect(()=>{
    const checkWidth = ()=>{
        setWidth(window.innerWidth)

        switch (operator) {
            case '<': setMatch(matchMedia(`(width ${operator} ${widthToCheck}px)`).matches);
                
                break;
            case '>':setMatch(matchMedia(`(width ${operator} ${widthToCheck}px)`).matches);

                break;
        
            default:
                throw new Error('Not A Valid Operator')
                break;
        }
        
    }

    checkWidth()

    window.addEventListener('resize',checkWidth)
    
    return ()=>{
        window.removeEventListener('resize',checkWidth)
    }


    },[widthToCheck,operator])


    return [match,currentWindowwidth] as Array<number|boolean>
    
}

export{
    useViewPortSize
}
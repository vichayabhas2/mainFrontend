"use client";
import { Select, MenuItem } from "@mui/material";
import { useRef, useState } from "react";

export default function SelectSize({

  select,
}: {

  select: Function;
}) {
  const userRef = useRef("");
  const choices: ('S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL')[] = ['S' , 'M' , 'L' , 'XL' , 'XXL' , '3XL'];
  
  //const [chose, setChose] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL' | null>(null);
  return (
    <div className=" rounded-lg ">
      <Select
        variant="standard"
        name="location"
        id="location"
        
        className="h-[2em] w-[200px]"
      >
        {choices.map((choice: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL') => {
          return <MenuItem value={choice} onClick={()=>select(choice)}>{choice}</MenuItem>;
        })}
      </Select>
      
    </div>
  );
}

import React, { useState, useRef } from 'react';

interface Props {
  text: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const TypeScript: React.FC<Props> = ({handleChange}) => {
  const [ count, setCount ] = useState<number | null>(5);
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const changeThat = () => {
    
  }

  return (
    <div>
      <div ref={divRef}></div>
      <input ref={inputRef} onChange={changeThat}/>
    </div>
  )
}
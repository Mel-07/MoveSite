import React, { HTMLAttributes, ElementType } from 'react'
interface Props {
  tag?: ElementType;
  children: React.ReactNode;
  className?: string;
  props?: Omit<HTMLAttributes<ElementType>, 'tag'>;
}
function CustomElement({tag:Tag='div',children,className,...prop}:Props) {
  return (
    <Tag className={className} {...prop}>
        {children}
    </Tag>
  )
}

export default CustomElement;

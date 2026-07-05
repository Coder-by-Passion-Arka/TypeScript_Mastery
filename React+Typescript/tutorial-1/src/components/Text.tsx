// Polymorphic Component
import React from "react";

type TextProps =  {
    size ?: 'sm' | 'md' | 'lg'
    color ?: 'primary' | 'secondary'
    children: React.ReactNode // this element is can be any primitive datatype, JSXElement, List of R 
};
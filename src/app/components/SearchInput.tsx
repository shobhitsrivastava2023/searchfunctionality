"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { handler } from 'tailwindcss-animate'

export const SearchInput = () => {
  const searchParams = useSearchParams(); 
  const pathname = usePathname();
  const {replace} = useRouter(); 

 

  function handleSearch(term: string) { 
    const params = new URLSearchParams(searchParams); 
    if(term){ 
      params.set('query', term)
    }else{
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }


  
   return (
    <div>
       <Input type="email" placeholder="Search" 
       onChange= { (e) => {handleSearch(e.target.value);}} 
       defaultValue={searchParams.get('query')?.toString()}  />
    </div>
   )
}
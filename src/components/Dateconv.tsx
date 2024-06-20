'use client'

//import React from "react";




export default function DateConv({day,month,year,hours,minutes}:{day:string, month:string, year:number, hours:string,minutes:string}){
    //alert('hhhhhhhhh')
    //console.log(month)
    return(<>{day} {month} {year}, {hours}:{minutes}</> )// $

}

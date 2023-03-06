import Image from "next/image";
import fire from './fire_icon.png'
import discord from './discord_icon.png'

import appsync from './aws-appsync-logo.png'
import amplfiy from './aws-amplify-logo.png'

import aws from './dops-aws-logo2b.png'

export default function StarterButtons() {
  console.log()
  return (
    <div className="not-prose container pt-6">
      <div className="flex flex-row">
        <div className="flex-1" />
        <div className="flex-1" />
        <Image src={discord} alt={""} className="h-10 md:h-20 w-auto px-1"/>
        <div className="flex-1" />
        <div className="pt-3 md:pt-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </div>
      
        <div className="flex-1" />

        <Image src={appsync} alt={""} className="h-10 md:h-20 w-auto px-2"/>
        <Image src={amplfiy} alt={""} className="h-10 md:h-20 w-auto px-2"/>

        <div className="flex-1" />
        <div className="pt-3 md:pt-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 md:w-8 md:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </div>
        <div className="flex-1" />
        <Image src={fire} alt={""} className="h-10 md:h-20 w-auto px-1"/>
        <div className="flex-1" />
        <div className="flex-1" />
      </div>
      <div className="flex flex-row">
        <div className="flex-1" />
        <Image src={aws} alt={""} className="h-20 w-auto relative bottom-8"/>
        <div className="flex-1" />
      </div>
    </div>
    
  )
}
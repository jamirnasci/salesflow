'use client'

import ClientSection from "@/components/sections/ClientSection";
import ProductSection from "@/components/sections/ProductSection";
import SideBar from "@/components/SideBar";
import { useState } from "react";

export default function Home(){
    const [SelectedSection, setSelectedSection] = useState(()=> ClientSection)
    const [isSideBarVisible, setSideBarVisible] = useState(false)
    const switchSideBar = ()=>{
        setSideBarVisible(!isSideBarVisible)
    }    
    return(
        <div>
            <header className="flex h-[60px] z-10 items-center sticky top-0 bg-blue-600">
                <button className="text-white m-2" onClick={()=>{switchSideBar()}}>
                    <i className="fa-solid fa-bars text-xl m-0"></i>
                </button>
                <h2 className="text-white text-xl">Sales Flow</h2>
            </header>
            {isSideBarVisible ? <SideBar setSelectedSection={setSelectedSection}/> : null}
            <main>
                {<SelectedSection/>}
            </main>
        </div>
    )
}
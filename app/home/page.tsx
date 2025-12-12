'use client'

import LogoutButton from "@/components/LogoutButton";
import ClientSection from "@/components/sections/ClientSection";
import SideBar from "@/components/SideBar";
import { useState } from "react";

export default function Home() {
    const [SelectedSection, setSelectedSection] = useState(() => ClientSection)
    const [isSideBarVisible, setSideBarVisible] = useState(false)
    const switchSideBar = () => {
        setSideBarVisible(!isSideBarVisible)
    }
    return (
        <div>
            <header className="flex justify-between h-[60px] z-10 items-center sticky top-0 bg-blue-800">
                <div className="flex items-center">
                    <button className="text-white m-2 cursor-pointer" onClick={() => { switchSideBar() }}>
                        <i className="fa-solid fa-bars text-xl m-0"></i>
                    </button>
                    <h2 className="text-white text-xl">Sales Flow</h2>
                </div>
                <LogoutButton />
            </header>
            {isSideBarVisible ? <SideBar switchSideBar={switchSideBar} setSelectedSection={setSelectedSection} /> : null}
            <main>
                {<SelectedSection />}
            </main>
        </div>
    )
}
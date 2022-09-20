import Link from "next/link"

const Intro = () => {
    return (
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                writing.
            </h1>
            <div className="flex flex-col md:flex-row md:gap-2 text-center">      
                <h5 className="mb-3 md:mb-0">
                    <Link
                        href={"/posts"}
                    >
                        <a className="inline-flex">
                            Posts &nbsp; 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </a>
                    </Link>
                </h5>
                <h5 className="mx-3 hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-blue-900">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                    </svg>
                </h5>
                <h5>
                    <a 
                        href="https://github.com/azerpas" 
                        rel="noopener noreferrer" target="_blank"
                        className="underline decoration-[#171515]/30"
                    >
                        GitHub
                    </a>
                </h5>
                <h5>
                    <a 
                        href="https://www.linkedin.com/in/anthony-manikhouth/" 
                        rel="noopener noreferrer" target="_blank"
                        className="underline decoration-[#0e76a8]/30"
                    >
                        LinkedIn
                    </a>
                </h5>
            </div>
        </section>
    )
}

export default Intro

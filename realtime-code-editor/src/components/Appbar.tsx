

function Appbar() {
  return (
    <div className="bg-[#30353e] h-24 grid grid-cols-2 justify-center items-center text-lg text-light font-mono">
        <div className="pl-6 hover:cursor-pointer">
            <img width="100" height="50" src="/src/assets/logo-code-duro-2.png" alt="code duro" />
        </div>   
        <div className="grid grid-cols-2 lg:pl-96 md:pl-0 ">
            <div className="h-7 w-20 hover:cursor-pointer">signup</div>
            <div className="h-7 w-20 hover:cursor-pointer">login</div>
        </div>
    </div>
  )
}

export default Appbar


function Hero() {
  return (
    <div className="font-mono h-screen w-screen text-white" style={{backgroundColor: '#30353e'}}>
        <div className='text-3xl font-bold text-center mt-20'>
            Welcome to Code Duro - Real-time Collaborative Code Editor
        </div>
        <div className='text-center mt-10 text-md px-20 font-light'>
            Collaborate with developers around the world in real-time. Share code, debug together, and build amazing projects seamlessly.
        </div>
        <div>
            <button className="mt-10 px-6 py-3 bg-emerald-500 rounded text-black font-semibold hover:cursor-pointer">
                Get Started
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-10 px-10">
            <div className=''>
            <img className='mx-auto mt-10' width="600" height="400" src="/src/assets/collaboration.png" alt="collaboration" />
            </div>
        </div>
    </div>
  )
}

export default Hero
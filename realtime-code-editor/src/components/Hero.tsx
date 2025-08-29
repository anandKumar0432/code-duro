import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";

function Hero() {
  const navigate = useNavigate();

  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2, ease:"easeInOut" }}
    className="font-mono text-white w-screen" >
      <div className="text-3xl font-bold text-center mt-10">         
        Welcome to Code Duro - Real-time Collaborative Code Editor
      </div>

      <div className="text-center mt-10 text-md px-6 md:px-20 font-light">
        Collaborate with developers around the world in real-time. Share code, debug together, and build amazing projects seamlessly.
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => {
            const roomId = Math.random().toString(36).substring(2, 10);
            navigate(`/coderoom/${roomId}`);
          }}
          className="mt-10 px-6 py-3 bg-[#36454F] rounded text-white font-semibold hover:cursor-pointer hover:bg-[#536878]"
        >
          Get Started
        </button>
      </div>

      <div className="w-full flex justify-center mt-4">
        <div>
          <motion.img
            whileHover={{ 
              scale: 1.2
             }}
            whileTap={{ scale: 0.8 }}
            className="mx-auto mt-10 max-w-[600px] w-full h-auto"
            src="/src/assets/collaboration.png"
            alt="collaboration"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Hero

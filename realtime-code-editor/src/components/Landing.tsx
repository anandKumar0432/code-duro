import Appbar from './Appbar'
import Footer from './footer'
import Hero from './Hero'

function Landing() {
  return (
    <div className='min-h-screen min-w-screen'>
        <Appbar />
        <Hero />
        <Footer />
    </div>
  )
}

export default Landing
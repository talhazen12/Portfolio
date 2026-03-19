import ScrollyCanvas from '@/components/ScrollyCanvas'
import Tools from '@/components/Tools'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Scrollytelling Section */}
      <ScrollyCanvas />
      
      {/* Tools Section */}
      <Tools />

      {/* About Me Section */}
      <About />

      {/* Work Grid Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />
    </main>
  )
}

import Header from '@/components/header'
import BackgroundGradient from '@/components/background'
import { Hero } from '@/components/hero'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6">
        <Hero />
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground py-6">
        Not affiliated with GitHub
      </footer>
    </main>
  )
}

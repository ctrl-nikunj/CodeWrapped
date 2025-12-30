export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <a
        href="/api/auth/login/github"
        className="px-6 py-3 rounded-md bg-white text-black"
      >
        Generate My GitHub Wrapped
      </a>
    </main>
  )
}

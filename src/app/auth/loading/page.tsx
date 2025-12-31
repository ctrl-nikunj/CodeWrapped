import BackgroundGradient from "@/components/background"
import Header from '@/components/header'
import OAuthLoading from './oauth-loading'

export default function OAuthLoadingPage() {
    return (
        <main className="relative min-h-screen flex flex-col overflow-hidden">
            <BackgroundGradient />
            <Header />

            <section className="flex-1 flex items-center justify-center px-6">
                <OAuthLoading />
            </section>
        </main>
    )
}

import { getWrappedSummary } from '@/lib/wrapped'
import WrappedView from './wrapped-view'
import Header from '@/components/header'
import BackgroundGradient from '@/components/background'
import { Card } from '@/components/ui/card'

export default async function WrappedPage() {
    const data = await getWrappedSummary()
    console.log(data)
    return (
        <main className="min-h-screen flex flex-col">
            <BackgroundGradient />
            <Header />
            <section className="flex-1 flex items-center justify-center p-4 md:p-8">
                <Card className="w-full max-w-5xl border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden flex flex-col items-center justify-center min-h-[600px]">
                    <WrappedView data={data} />
                </Card>
            </section>
        </main>
    )
}

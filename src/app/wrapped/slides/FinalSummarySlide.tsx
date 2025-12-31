'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import { toPng } from 'html-to-image'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Pie, PieChart } from 'recharts'
import { Trophy, Medal, Calendar } from 'lucide-react'


export default function FinalSummarySlide({ data, restart }: any) {
    const ref = useRef<HTMLDivElement>(null)

    const exportImage = async () => {
        if (!ref.current) return

        const dataUrl = await toPng(ref.current, {
            cacheBust: true,
            pixelRatio: 2,
        })

        const link = document.createElement('a')
        link.download = 'github-wrapped.png'
        link.href = dataUrl
        link.click()
    }

    const COLORS = [
        'oklch(0.646 0.222 41.116)',
        'oklch(0.6 0.118 184.704)',
        'oklch(0.398 0.07 227.392)',
        'oklch(0.828 0.189 84.429)',
        'oklch(0.769 0.188 70.08)',
    ]

    const languages = data.languages.percentages.slice(0, 5)
    const chartConfig = languages.reduce((acc: ChartConfig, lang: any, index: number) => {
        acc[lang.name] = {
            label: lang.name,
            color: COLORS[index % COLORS.length],
        }
        return acc
    }, {} satisfies ChartConfig)

    const chartData = languages.map((lang: any, index: number) => ({
        ...lang,
        fill: COLORS[index % COLORS.length],
    }))

    const totalCommits = data.commits.totalCommits
    const longestStreak = data.commits.streak.longestStreak
    const peak = data.commits.peak
    const peakDate = new Date(peak.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

    const byRepo = data.commits.byRepo;
    const topRepos = Object.entries(byRepo)
        .sort((a, b) => (b[1] as number) - (a[1] as number))
        .slice(0, 3);

    const heatValues = Object.entries(data.commits.byDay as Record<string, number>).map(
        ([date, count]) => ({ date, count })
    )

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] text-center space-y-6 w-full max-w-6xl px-4 py-8">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 md:p-8 rounded-3xl bg-background border shadow-2xl w-full grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
            >
                {/* Header */}
                <div className="md:col-span-4 text-left mb-2">
                    <h1 className="text-2xl md:text-4xl font-extrabold flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <span><span className='font-heading text-4xl md:text-5xl italic text-transparent bg-clip-text bg-linear-to-b from-green-600 to-black'>GitHub</span> Wrapped 2024</span>
                        <span className="text-muted-foreground text-lg md:text-xl font-mono font-normal">@{data.user?.username || 'You'}</span>
                    </h1>
                </div>

                {/* 1. Total Commits (Big Block) */}
                <div className="md:col-span-2 p-6 rounded-xl bg-white shadow-xl border border-muted flex flex-col items-center justify-center space-y-2">
                    <span className="text-muted-foreground font-medium font-mono uppercase tracking-wider text-xs md:text-sm">Total Commits</span>
                    <span className="text-5xl md:text-7xl font-black">{totalCommits}</span>
                </div>

                {/* 2. Streak Card */}
                <div className="md:col-span-1 min-h-[160px]">
                    <div className="h-full w-full flex flex-col items-center justify-center p-6 rounded-xl bg-linear-to-br from-orange-500 to-red-600 text-white shadow-xl">
                        <span className="text-4xl mb-2">🔥</span>
                        <span className="text-sm font-medium font-mono opacity-90 uppercase tracking-wider">Longest Streak</span>
                        <span className="text-4xl font-bold">{longestStreak} days</span>
                    </div>
                </div>

                {/* 3. Peak Day */}
                <div className="md:col-span-1 p-6 rounded-xl shadow-xl bg-white border border-muted flex flex-col items-center justify-center space-y-2 relative overflow-hidden min-h-[160px]">
                    <span className="text-muted-foreground font-medium font-mono uppercase tracking-wider text-xs md:text-sm">Most Productive</span>
                    <span className="text-2xl md:text-3xl font-bold">{peakDate}</span>
                    <span className="text-sm text-muted-foreground">{peak.commits} commits</span>
                </div>

                {/* 4. Top Languages (Pie) */}
                <div className="md:col-span-2 row-span-2 p-6 rounded-xl shadow-xl border border-muted flex flex-col relative h-[400px]">
                    <span className="text-muted-foreground font-medium font-mono uppercase tracking-wider text-sm mb-4 text-left">Top Languages</span>
                    <div className="flex-1 flex items-center justify-center">
                        <ChartContainer config={chartConfig} className="w-full h-full pb-8">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={4}
                                />
                            </PieChart>
                        </ChartContainer>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center mb-0">
                        {languages.slice(0, 3).map((lang: any, i: number) => (
                            <div key={lang.name} className="flex items-center gap-1.5 text-xs">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                {lang.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. Top Repos List */}
                <div className="md:col-span-2 row-span-2 p-6 rounded-xl shadow-xl border border-muted flex flex-col h-[400px]">
                    <span className="text-muted-foreground font-medium uppercase tracking-wider text-sm mb-6 text-left font-mono">Top Repositories</span>
                    <div className="space-y-4 flex-1 overflow-y-auto">
                        {topRepos.map(([name, count], i) => (
                        <div key={name} className={`flex items-center justify-between p-3 rounded-xl border ${i === 0 ? 'bg-amber-500/10 border-amber-400' : i === 1 ? 'bg-gray-500/10 border-gray-400' : i === 2 ? 'bg-amber-700/10 border-amber-600' : ''}`}>
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {i === 0 && <Trophy className="w-5 h-5 text-amber-400 shrink-0" />}
                                    {i === 1 && <Medal className="w-5 h-5 text-gray-400 font-mono shrink-0" />}
                                    {i === 2 && <Medal className="w-5 h-5 text-amber-700 font-mono shrink-0" />}
                                    <span className="font-medium truncate">{name.split('/').pop()}</span>
                                </div>
                                <span className="text-sm font-mono text-muted-foreground ml-2">{count as number}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
            <div className="flex gap-4">
                <Button variant="outline" onClick={restart}>
                    Restart
                </Button>
                <Button onClick={exportImage}>
                    Download Image
                </Button>
            </div>
        </div>
    )
}

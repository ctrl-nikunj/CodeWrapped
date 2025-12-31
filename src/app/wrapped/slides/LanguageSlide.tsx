'use client'

import { motion } from 'framer-motion'
import {
    PieChart,
    Pie,
    Cell,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const COLORS = [
    'oklch(0.646 0.222 41.116)',
    'oklch(0.6 0.118 184.704)',
    'oklch(0.398 0.07 227.392)',
    'oklch(0.828 0.189 84.429)',
    'oklch(0.769 0.188 70.08)',
]

export default function LanguageSlide({ data, next, prev }: any) {
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

    return (
        <div className="flex flex-col items-center text-center space-y-10">
            {/* Title */}
            <motion.h2
                className="text-5xl font-extrabold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Your year in <span className="font-heading text-6xl font-normal italic">languages</span>
            </motion.h2>

            {/* Chart */}
            <motion.div
                className="w-[260px] h-[260px]"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 }}
            >
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={70}
                            outerRadius={110}
                            paddingAngle={3}
                        />
                        <ChartTooltip content={<ChartTooltipContent className='bg-white/80 border-none backdrop-blur-2xl' />} />
                    </PieChart>
                </ChartContainer>
            </motion.div>

            {/* Legend */}
            <motion.div
                className="flex flex-wrap justify-center gap-4 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {languages.map((lang: any, i: number) => (
                    <div key={lang.name} className="flex items-center gap-2">
                        <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        />
                        <span className="text-muted-foreground">
                            {lang.name} — {lang.value}%
                        </span>
                    </div>
                ))}
            </motion.div>

            {/* Navigation */}
            <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
            >
                <Button variant="ghost" onClick={prev}>
                    ← Back
                </Button>
                <Button onClick={next}>
                    Next →
                </Button>
            </motion.div>
        </div>
    )
}

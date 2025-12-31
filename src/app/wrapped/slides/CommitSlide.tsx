'use client'

import { motion } from 'framer-motion'
import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid
} from 'recharts'
import { Button } from '@/components/ui/button'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export default function CommitSlide({ data, next, prev }: any) {
    const monthData = Object.entries(data.commits.byMonth).map(
        ([month, count]) => ({
            month,
            commits: count,
        })
    )
    const chartConfig = {
        commit:{
            label: 'Commits',
            color: 'oklch(0.398 0.07 227.392)',
        }
    } satisfies ChartConfig

    return (
        <div className="flex flex-col items-center text-center space-y-10 w-full">
            {/* Title */}
            <motion.h2
                className="text-5xl font-extrabold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Your <span className='font-heading text-6xl italic '>commit</span> rhythm
            </motion.h2>

            {/* Chart */}
            <motion.div
                className="w-full max-w-3xl h-[260px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
            >
                <ChartContainer config={chartConfig} className='w-full h-full'>
                    <BarChart data={monthData}>
                    <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent className='bg-white/90 border-none backdrop-blur-2xl' />} />
                        <Bar
                            dataKey="commits"
                            radius={[6, 6, 0, 0]}
                            fill={chartConfig.commit.color}
                            className="text-foreground"
                        />
                    </BarChart>
                </ChartContainer>
            </motion.div>

            {/* Total */}
            <motion.div
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {data.commits.totalCommits} total commits this year
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

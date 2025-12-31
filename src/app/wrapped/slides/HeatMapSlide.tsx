'use client'

import { motion } from 'framer-motion'
import HeatMap from '@uiw/react-heat-map'
import { Button } from '@/components/ui/button'
import { Tooltip } from 'react-tooltip'

export default function HeatmapSlide({ data, next, prev }: any) {
    const values = Object.entries(data.commits.byDay as Record<string, number>).map(
        ([date, count]) => ({
            date,
            count,
        })
    )

    const WEEKS = 53
    const CELL_SIZE = 14
    const GAP = 3
    const heatmapWidth = WEEKS * (CELL_SIZE + GAP)


    const activeDays = values.length
    const maxCount = Math.max(...values.map(v => v.count), 1)

    return (
        <div className="flex flex-col items-center text-center space-y-10">
            {/* Title */}
            <motion.h2
                className="text-4xl font-extrabold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Your coding footprint
            </motion.h2>

            {/* Heatmap */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='items-center justify-center max-w-[calc(100vw-6rem)] overflow-x-auto'
            >
                <HeatMap
                    value={values}
                    width={heatmapWidth}
                    startDate={new Date('2025-01-01')}
                    endDate={new Date('2025-12-31')}
                    rectSize={CELL_SIZE}
                    space={GAP}
                    panelColors={{
                        0: '#ebedf0',          // very light grey
                        [Math.ceil(maxCount * 0.25)]: '#c6e48b',
                        [Math.ceil(maxCount * 0.5)]: '#7bc96f',
                        [Math.ceil(maxCount * 0.75)]: '#239a3b',
                        [maxCount]: '#196127', // darkest green
                    }}
                    rectRender={(props, data) => {
                        if (!data.count) return <rect {...props} rx={2} ry={2} />;
                        return (
                            <rect
                                {...props}
                                rx={2}
                                ry={2}
                                data-tooltip-id="heatmap-tooltip"
                                data-tooltip-html={`
                                    <div class="p-1">
                                        <div class="font-bold text-sm mb-1">${data.count} contributions</div>
                                        <div class="text-xs opacity-70">
                                            ${new Date(data.date).toLocaleDateString(undefined, {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                                        </div>
                                    </div>
                                `}
                            />
                        );
                    }}
                />
                <Tooltip
                    id="heatmap-tooltip"
                    style={{
                        backgroundColor: "white",
                        color: "#000",
                        borderRadius: "8px",
                        opacity: 1,
                        zIndex: 50
                    }}
                />
            </motion.div>

            {/* Summary */}
            <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
            >
                You coded on <span className="font-semibold">{activeDays}</span> different days this year
            </motion.p>

            {/* Navigation */}
            <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
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

'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function PeakMomentSlide({ data, next, prev }: any) {
    const { commits, date, day } = data.commits.peak
    const peakDate = new Date(date).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })

    return (
        <div className="flex flex-col items-center justify-center text-center space-y-10 min-h-[70vh]">
            <motion.h2
                className="text-5xl font-extrabold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                You <span className='font-heading text-6xl italic'>commited</span> the hardest on
            </motion.h2>

            <motion.div
                className="space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
            >
                <div className="text-5xl font-semibold">{peakDate}</div>
            </motion.div>

            <motion.p
                className="text-muted-foreground max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                You made {commits} commits on a single day.
                That's crazzyyyy..
            </motion.p>

            <motion.div
                className="flex gap-4 pt-6"
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

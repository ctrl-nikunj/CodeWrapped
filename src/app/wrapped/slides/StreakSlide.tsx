'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function StreakSlide({ data, next, prev }: any) {
    const { longestStreak, currentStreak, activeToday } =
        data.commits.streak

    return (
        <div className="flex flex-col items-center text-center space-y-10">
            {/* Title */}
            <motion.h2
                className="text-5xl font-extrabold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                You <span className="font-heading text-6xl font-normal italic">showed</span> up.
            </motion.h2>

            {/* Streak Cards */}
            <motion.div
                className="flex gap-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
            >
                <StreakCard
                    emoji="🔥"
                    label="Longest streak"
                    value={longestStreak}
                />

                <StreakCard
                    emoji="⚡"
                    label="Current streak"
                    value={currentStreak}
                    highlight={activeToday}
                />
            </motion.div>

            {/* Status */}
            <motion.p
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {activeToday
                    ? 'You committed today. Keep it going.'
                    : 'No commits today — tomorrow is a new chance.'}
            </motion.p>

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

function StreakCard({
    emoji,
    label,
    value,
    highlight,
}: {
    emoji: string
    label: string
    value: number
    highlight?: boolean
}) {
    return (
        <div
            className={`flex flex-col items-center px-8 py-6 rounded-xl shadow-xl border border-muted
        ${highlight && 'scale-110'}`}
        >
            <div className="text-4xl">{emoji}</div>
            <div className="text-3xl font-bold mt-2">{value}</div>
            <div className="text-sm text-muted-foreground mt-1">{label}</div>
        </div>
    )
}

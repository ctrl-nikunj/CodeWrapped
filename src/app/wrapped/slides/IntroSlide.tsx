'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function IntroSlide({ data, next }: any) {
    const { user, commits, repos, languages } = data

    return (
        <div className="flex flex-col items-center text-center space-y-8">
            {/* Avatar */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative h-28 w-28 rounded-full overflow-hidden ring-4 ring-foreground/10"
            >
                <Image
                    src={user.avatar}
                    alt={user.username}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="space-y-2"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    Your GitHub Wrapped
                </h1>
                <p className="text-muted-foreground italic text-lg">
                    @{user.username}
                </p>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex gap-6 text-sm text-muted-foreground"
            >
                <Stat label="Commits" value={commits.totalCommits} />
                <Stat label="Repos" value={commits.repo} />
                <Stat label="Languages" value={languages.count} />
            </motion.div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
            >
                <Button size="lg" onClick={next} className="px-8">
                    Start →
                </Button>
            </motion.div>
        </div>
    )
}

function Stat({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            <span>{label}</span>
        </div>
    )
}

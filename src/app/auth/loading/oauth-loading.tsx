'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OAuthLoading() {
    const router = useRouter()

    useEffect(() => {
        const t = setTimeout(() => {
            router.replace('/wrapped')
        }, 2200)

        return () => clearTimeout(t)
    }, [router])

    return (
        <div className="text-center space-y-6">
            <motion.div
                className="text-3xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Preparing your GitHub Wrapped…
            </motion.div>

            <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Analyzing commits, languages, and streaks
            </motion.p>

            <motion.div
                className="mx-auto h-10 w-10 rounded-full border-4 border-muted border-t-foreground animate-spin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            />
        </div>
    )
}

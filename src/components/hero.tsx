'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export function Hero() {
    return (
        <div className="max-w-2xl text-center space-y-6">
            <motion.h2
                className="text-4xl md:text-7xl font-extrabold tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                Your year in <motion.span className="font-mono text-7xl italic" initial={{ filter: 'blur(10px)' }} animate={{ filter: 'blur(0px)' }} transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}>code.</motion.span>
            </motion.h2>

            <motion.p
                className="text-muted-foreground text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            >
                Commits. Languages. Streaks.
                See how you built in 2025.
            </motion.p>

            <motion.div
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
            >
                <Link href="/api/auth/login/github">
                    <Button size="lg" className="px-8 py-6 text-base rounded-xl">
                        <GitHubLogoIcon scale={10} />
                        Continue with GitHub
                    </Button>
                </Link>
            </motion.div>
        </div>
    )
}

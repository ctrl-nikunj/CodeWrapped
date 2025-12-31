'use client'

import { motion } from 'framer-motion'

export default function BackgroundGradient() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
                className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-linear-to-tr from-purple-500/30 to-pink-500/30 blur-3xl"
                animate={{
                    x: [0, 110, 0],
                    y: [0, 90, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-linear-to-tr from-blue-500/30 to-cyan-500/30 blur-3xl"
                animate={{
                    x: [0, -40, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    )
}

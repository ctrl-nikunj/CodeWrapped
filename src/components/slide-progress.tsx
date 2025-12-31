'use client'

import { motion } from 'framer-motion'

export function SlideProgress({
    total,
    current,
}: {
    total: number
    current: number
}) {
    return (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {Array.from({ length: total }).map((_, i) => (
                <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full"
                    animate={{
                        opacity: i === current ? 1 : 0.3,
                        scale: i === current ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        backgroundColor: 'currentColor',
                    }}
                />
            ))}
        </div>
    )
}

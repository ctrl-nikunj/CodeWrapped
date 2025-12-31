'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideProgress } from '@/components/slide-progress'
import IntroSlide from './slides/IntroSlide'
import LanguageSlide from './slides/LanguageSlide'
import StreakSlide from './slides/StreakSlide'
import CommitSlide from './slides/CommitSlide'
import HeatmapSlide from './slides/HeatMapSlide'
import PeakMomentSlide from './slides/PeakMomentSlide'
import TopRepoSlide from './slides/TopRepoSlide'
import FinalSummarySlide from './slides/FinalSummarySlide'


const slides = [
    IntroSlide,
    LanguageSlide,
    StreakSlide,
    CommitSlide,
    HeatmapSlide,
    PeakMomentSlide,
    TopRepoSlide,
    FinalSummarySlide
]

export default function WrappedView({ data }: { data: any }) {
    const [step, setStep] = useState(0)

    const Slide = slides[step]

    const next = () => setStep(s => Math.min(s + 1, slides.length - 1))
    const prev = () => setStep(s => Math.max(s - 1, 0))
    const restart = () => setStep(0)

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault()
                next()
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault()
                prev()
            }
        }

        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])


    return (
        <div className="w-full h-full">
            <SlideProgress total={slides.length} current={step} />
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    className="w-full h-full flex items-center justify-center p-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <Slide
                        data={data}
                        next={next}
                        prev={prev}
                        restart={restart}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

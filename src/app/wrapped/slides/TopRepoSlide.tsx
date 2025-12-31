import { motion } from 'framer-motion'
import { Trophy, Medal } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TopRepoSlide({ data, next, prev }: any) {
    const byRepo = data.commits.byRepo;
    const sortedRepos = Object.entries(byRepo).sort((a, b) => (b[1] as number) - (a[1] as number));
    const top3 = sortedRepos.slice(0, 3);

    // Podium order items: [2nd, 1st, 3rd]
    // Map to original sorted indices: [1, 0, 2]
    const podiumIndices = [1, 0, 2];

    const podiumConfig = {
        0: { // 1st Place
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            border: "border-amber-400/20",
            icon: Trophy,
            height: "h-64",
            scale: 1.1,
            delay: 0.4
        },
        1: { // 2nd Place
            color: "text-gray-300",
            bg: "bg-gray-300/10",
            border: "border-gray-300/20",
            icon: Medal,
            height: "h-48",
            scale: 1,
            delay: 0.2
        },
        2: { // 3rd Place
            color: "text-amber-700",
            bg: "bg-amber-700/10",
            border: "border-amber-700/20",
            icon: Medal,
            height: "h-32",
            scale: 0.9,
            delay: 0.6
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[70vh] space-y-12">
            <motion.h2
                className="text-5xl font-extrabold tracking-tight text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Your <span className='font-heading text-6xl italic'>most loved</span> repositories
            </motion.h2>

            <div className="flex items-end justify-center gap-4 w-full max-w-5xl px-4">
                {podiumIndices.map((rankIndex) => {
                    const repo = top3[rankIndex];
                    if (!repo) return null; // Handle < 3 repos

                    const [name, count] = repo;
                    const config = podiumConfig[rankIndex as keyof typeof podiumConfig];
                    const Icon = config.icon;

                    return (
                        <motion.div
                            key={name}
                            className={`flex flex-col items-center flex-1 max-w-[280px]`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: config.delay, type: "spring", stiffness: 100 }}
                        >
                            {/* Icon & Details */}
                            <div className="flex flex-col items-center mb-4 space-y-2">
                                <Icon className={`w-12 h-12 ${config.color} mb-2`} />
                                <span className="font-heading text-2xl md:text-3xl italic text-center leading-tight break-all">
                                    {name.split('/').pop()}
                                </span>
                                <span className="text-muted-foreground font-semibold">
                                    {count as number} commits
                                </span>
                            </div>

                            {/* Podium Block */}
                            <motion.div
                                className={`w-full ${config.height} ${config.bg} ${config.border} border rounded-t-xl backdrop-blur-sm relative group`}
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: config.delay + 0.2, duration: 0.5 }}
                                style={{ transformOrigin: "bottom" }}
                            >
                                <div className={`absolute inset-0 bg-linear-to-t from-transparent to-${config.color.split('-')[1]}-500/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation */}
            <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
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
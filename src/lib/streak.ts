import { getCommitActivity } from "./commit"

function toDateKey(date: string) {
    return new Date(date).toISOString().split('T')[0]
}

export function calculateStreaks(dailyMap: Record<string, number>) {
    const days = Object.keys(dailyMap).sort()
    if (days.length === 0) {
        return {
            currentStreak: 0,
            longestStreak: 0,
            activeToday: false,
        }
    }

    let longest = 1
    let current = 1

    const todayKey = toDateKey(new Date().toISOString())
    const yesterdayKey = toDateKey(
        new Date(Date.now() - 86400000).toISOString()
    )

    for (let i = 1; i < days.length; i++) {
        const prev = new Date(days[i - 1])
        const curr = new Date(days[i])

        const diff =
            (curr.getTime() - prev.getTime()) / 86400000

        if (diff === 1) {
            current++
            longest = Math.max(longest, current)
        } else {
            current = 1
        }
    }

    // Determine current streak (must touch today or yesterday)
    const lastDay = days[days.length - 1]
    let currentStreak = 0

    if (lastDay === todayKey) {
        currentStreak = current
    } else if (lastDay === yesterdayKey) {
        currentStreak = current
    }

    return {
        currentStreak,
        longestStreak: longest,
        activeToday: lastDay === todayKey,
    }
}

export default async function getStreakData(token: string, username: string) {
    const activity = await getCommitActivity(token, username)
    return calculateStreaks(activity.byDay)
}
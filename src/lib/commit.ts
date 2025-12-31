import { calculateStreaks } from "./streak"

// lib/github/commits.ts
export async function fetchAllCommits(
    token: string,
    username: string
) {
    const res = await fetch(
        `https://api.github.com/search/commits?q=author:${username}&per_page=100`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.cloak-preview+json',
            },
            next: { revalidate: 3600 },
        }
    )

    if (!res.ok) throw new Error('Commit fetch failed')
    const data = await res.json()
    return data.items || []
}

export function buildCommitAnalytics(commits: any[]) {

    const month: Record<string,string> = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    }

    const byDay: Record<string, number> = {}
    const byRepo: Record<string, number> = {}
    const byMonth: Record<string, number> = {}

    for (const c of commits) {
        const date = c.commit.author.date.slice(0, 10)
        const repo = c.repository.full_name.split('/')[1]

        byDay[date] = (byDay[date] ?? 0) + 1
        byRepo[repo] = (byRepo[repo] ?? 0) + 1
        byMonth[month[date.slice(5, 7)]] = (byMonth[month[date.slice(5, 7)]] ?? 0) + 1
    }

    const repoTotal = Object.entries(byRepo).length

    const peakCommits = Math.max(...Object.values(byDay))
    const peakDate = Object.entries(byDay).find(([_, count]) => count === peakCommits)?.[0]
    const peakDay = new Date(peakDate!).toLocaleDateString(undefined, {
        weekday: 'long'
    })
    return {
        totalCommits: commits.length,
        byDay,
        byRepo,
        byMonth,
        repo: repoTotal,
        streak: calculateStreaks(byDay),
        peak:{
            commits: peakCommits,
            date: peakDate,
            day: peakDay
        },
    }
}

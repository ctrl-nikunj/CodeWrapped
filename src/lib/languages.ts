type LanguageStats = {
    bytes: Record<string, number>
    percentages: {
        name: string
        value: number
    }[]
}

export async function getLanguageStats(
    token: string,
    repos: any[]
): Promise<LanguageStats> {
    const bytes: Record<string, number> = {}

    for (const repo of repos) {
        if (repo.fork) continue

        const res = await fetch(
            repo.languages_url,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github+json',
                },
            }
        )

        if (!res.ok) continue

        const data = await res.json()

        for (const [lang, count] of Object.entries(data)) {
            bytes[lang] = (bytes[lang] || 0) + (count as number)
        }
    }

    const total = Object.values(bytes).reduce(
        (a, b) => a + b,
        0
    )

    const percentages = Object.entries(bytes)
        .map(([name, value]) => ({
            name,
            value: Math.round((value / total) * 100),
        }))
        .sort((a, b) => b.value - a.value)

    return { bytes, percentages }
}
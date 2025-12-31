type LanguageStats = {
    bytes: Record<string, number>
    percentages: {
        name: string
        value: number
    }[]
    count: number
}

export async function getLanguageStats(
    repos: any[]
): Promise<LanguageStats> {
    const languageRequests = repos
        .filter(r => !r.fork)
        .map(repo =>
            fetch(repo.languages_url, {
                headers: {
                    Accept: 'application/vnd.github+json',
                },
                next: { revalidate: 86400 }, // languages barely change
            }).then(r => r.ok ? r.json() : null)
        )
    const data = await Promise.all(languageRequests)
    const bytes: Record<string, number> = data.reduce((acc, lang) => {
        if (!lang) return acc
        Object.entries(lang).forEach(([lang, bytes]) => {
            acc[lang] = (acc[lang] || 0) + (bytes as number)
        })
        return acc
    }, {} as Record<string, number>)

    const percentages: { name: string; value: number }[] = []

    const totalBytes = Object.values(bytes).reduce((acc, bytes) => acc + bytes, 0)

    Object.entries(bytes).forEach(([lang, bytes]) => {
        percentages.push({
            name: lang,
            value: Math.ceil((bytes / totalBytes) * 100),
        })
    })
    percentages.sort((a, b) => b.value - a.value)

    const count = percentages.length

    return {
        bytes,
        percentages,
        count,
    }
}
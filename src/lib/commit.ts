type CommitActivity = {
    totalCommits: number
    byDay: Record<string, number>
    byRepo: Record<string, number>
}

export async function getCommitActivity(
    token: string,
    username: string
): Promise<CommitActivity> {
    const since = new Date()
    since.setFullYear(since.getFullYear() - 1)

    const reposRes = await fetch(
        'https://api.github.com/user/repos?per_page=100',
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json',
            },
        }
    )

    const repos = await reposRes.json()

    let totalCommits = 0
    const byDay: Record<string, number> = {}
    const byRepo: Record<string, number> = {}

    for (const repo of repos) {
        if (repo.fork) continue

        const commitsRes = await fetch(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?author=${username}&since=${since.toISOString()}&per_page=100`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github+json',
                },
            }
        )

        if (!commitsRes.ok) continue

        const commits = await commitsRes.json()
        if (!Array.isArray(commits)) continue

        byRepo[repo.name] = commits.length
        totalCommits += commits.length

        for (const commit of commits) {
            const date =
                commit.commit.author?.date?.slice(0, 10)
            if (!date) continue

            byDay[date] = (byDay[date] || 0) + 1
        }
    }

    return {
        totalCommits,
        byDay,
        byRepo,
    }
}

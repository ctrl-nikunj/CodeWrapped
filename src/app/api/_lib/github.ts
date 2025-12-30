export async function githubFetch(
    path: string,
    token: string
) {
    const res = await fetch(`https://api.github.com${path}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
        },
    })

    if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`)
    }

    return res.json()
}

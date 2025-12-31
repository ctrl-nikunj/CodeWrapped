import { cookies } from 'next/headers'
import { githubFetch } from '@/app/api/_lib/github'
import { buildCommitAnalytics, fetchAllCommits } from '@/lib/commit'
import { getLanguageStats } from '@/lib/languages'

export const revalidate = 600

export async function getWrappedSummary() {
    const cookieStore = await cookies()
    const token = cookieStore.get('gh_token')?.value
    if (!token) throw new Error('Unauthorized')

    const [user, repos] = await Promise.all([
        githubFetch('/user', token),
        githubFetch('/user/repos?per_page=100', token),
    ])

    const commitsData = await fetchAllCommits(token, user.login)
    const commits = buildCommitAnalytics(commitsData)
    const languages = await getLanguageStats(repos)

    return {
        user: {
            name: user.name,
            username: user.login,
            avatar: user.avatar_url,
        },
        commits,
        languages,
    }
}

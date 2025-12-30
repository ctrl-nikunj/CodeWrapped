import { cookies } from 'next/headers'
import { githubFetch } from '@/app/api/_lib/github'
import { getCommitActivity } from '@/lib/commit'
import { getLanguageStats } from '@/lib/languages'
import getStreakData from './streak'

export async function getWrappedSummary() {
    const cookieStore = await cookies()
    const token = cookieStore.get('gh_token')?.value
    if (!token) throw new Error('Unauthorized')

    const user = await githubFetch('/user', token)
    const repos = await githubFetch('/user/repos?per_page=100', token)

    const commits = await getCommitActivity(
        token,
        user.login
    )

    const languages = await getLanguageStats(token, repos)

    const streakData = await getStreakData(token, user.login)

    return {
        user: {
            name: user.name,
            username: user.login,
            avatar: user.avatar_url,
        },
        commits,
        languages,
        streakData,
    }
}

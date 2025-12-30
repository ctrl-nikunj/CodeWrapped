import { getWrappedSummary } from '@/lib/wrapped'

export default async function WrappedPage() {
    const data = await getWrappedSummary()

    return (
        <div className="p-10 space-y-6">
            <h1 className="text-3xl font-bold">
                {data.user.name}'s GitHub Wrapped
            </h1>
            <div>
                <h2 className="text-xl font-semibold">
                    Top Languages
                </h2>

                <ul className="mt-2 space-y-1">
                    {data.languages.percentages
                        .slice(0, 5)
                        .map(lang => (
                            <li key={lang.name}>
                                {lang.name}: {lang.value}%
                            </li>
                        ))}
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold">
                    Commit Activity
                </h2>
                <ul className="mt-2 space-y-1">
                    {Object.entries(data.commits.byRepo)
                        .slice(0, 5)
                        .map(([repo, count]) => (
                            <li key={repo}>
                                {repo}: {count}
                            </li>
                        ))}
                </ul>
            </div>
            <div>
                <h2 className="text-xl font-semibold">
                    Streak Activity
                </h2>
                <ul className="mt-2 space-y-1">
                    <li>Longest Streak: {data.streakData.longestStreak}</li>
                    <li>Current Streak: {data.streakData.currentStreak}</li>
                    <li>Active Today: {data.streakData.activeToday ? 'Yes' : 'No'}</li>
                </ul>
            </div>
        </div>
    )
}

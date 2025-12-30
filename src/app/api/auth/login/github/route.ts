import { NextResponse } from 'next/server'

export async function GET() {
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        redirect_uri: `${process.env.BASE_URL}/api/auth/callback/github`,
        scope: 'read:user repo',
    })

    return NextResponse.redirect(
        `https://github.com/login/oauth/authorize?${params}`
    )
}

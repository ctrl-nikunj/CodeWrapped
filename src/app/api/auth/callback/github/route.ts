import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const code = new URL(req.url).searchParams.get('code')
    if (!code) {
        return NextResponse.json({ error: 'Missing code' }, { status: 400 })
    }

    const tokenRes = await fetch(
        'https://github.com/login/oauth/access_token',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            }),
        }
    )

    const { access_token } = await tokenRes.json();
    
    (await cookies()).set('gh_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    })

    return NextResponse.redirect(
        new URL('/wrapped', process.env.BASE_URL)
    )
}

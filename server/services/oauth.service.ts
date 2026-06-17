type OAuthProfile = {
  provider: 'google' | 'github';
  providerId: string;
  email: string;
  name?: string;
};

const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';
const SERVER_URL = process.env.SERVER_URL ?? 'http://localhost:3001';

export function getOAuthRedirectUri(provider: 'google' | 'github'): string {
  return `${SERVER_URL}/auth/${provider}/callback`;
}

export function buildFrontendCallbackUrl(token: string): string {
  return `${FRONTEND_URL}/auth/callback?token=${encodeURIComponent(token)}`;
}

export function getGoogleAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? '',
    redirect_uri: getOAuthRedirectUri('google'),
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'online',
    prompt: 'select_account',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export function getGitHubAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID ?? '',
    redirect_uri: getOAuthRedirectUri('github'),
    scope: 'read:user user:email',
    state,
  });
  return `https://github.com/login/oauth/authorize?${params}`;
}

export async function fetchGoogleProfile(code: string): Promise<OAuthProfile> {
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      redirect_uri: getOAuthRedirectUri('google'),
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenRes.ok) throw new Error('Google token exchange failed');
  const { access_token } = await tokenRes.json() as { access_token: string };

  const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!profileRes.ok) throw new Error('Google profile fetch failed');
  const profile = await profileRes.json() as { id: string; email: string; name?: string };

  return { provider: 'google', providerId: profile.id, email: profile.email, name: profile.name };
}

export async function fetchGitHubProfile(code: string): Promise<OAuthProfile> {
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: getOAuthRedirectUri('github'),
    }),
  });

  if (!tokenRes.ok) throw new Error('GitHub token exchange failed');
  const { access_token } = await tokenRes.json() as { access_token: string };

  const [userRes, emailsRes] = await Promise.all([
    fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${access_token}`, Accept: 'application/json' },
    }),
    fetch('https://api.github.com/user/emails', {
      headers: { Authorization: `Bearer ${access_token}`, Accept: 'application/json' },
    }),
  ]);

  if (!userRes.ok || !emailsRes.ok) throw new Error('GitHub profile fetch failed');

  const user = await userRes.json() as { id: number; name?: string; login: string };
  const emails = await emailsRes.json() as { primary: boolean; email: string }[];
  const primaryEmail = emails.find((e) => e.primary)?.email;

  if (!primaryEmail) throw new Error('GitHub primary email not available');

  return {
    provider: 'github',
    providerId: String(user.id),
    email: primaryEmail,
    name: user.name ?? user.login,
  };
}

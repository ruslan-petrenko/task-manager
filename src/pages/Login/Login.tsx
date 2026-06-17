import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import UiInput from '@/components/common/UiInput/UiInput';
import { useAuth } from '@/context/AuthContext';
import { login } from '@/api/auth';
import styles from './Login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    try {
      const { token, user } = await login({ email, password });
      setAuth(token, user);
      navigate('/');
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setError(message ?? 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>Sign in to your account</p>

        {error && <p className={styles.errorBanner}>{error}</p>}

        <div className={styles.fields}>
          <UiInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <UiInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className={styles.submitBtn} onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>

        <p className={styles.footer}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

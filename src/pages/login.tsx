import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import Input from '../components/Input';
import Button from '../components/Button';
import { useToaster } from '../components/Toaster';
import Link from 'next/link';

export default function Login() {
  const { login, token } = useAuth();
  const router = useRouter();
  const { showToast } = useToaster();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (token) {
    router.push('/');
    return null;
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username or email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      await login(formData.username, formData.password);
      showToast('Login successful! Welcome back.', 'success');
      router.push('/');
    } catch {
      showToast('Invalid credentials. Please try again.', 'error');
      setErrors({ general: 'Invalid username or password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <div className="w-full max-w-md px-4 flex flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <Link href="/" aria-label="Go to landing page">
            <div className="w-14 h-14 bg-emerald-600 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-emerald-700 transition">
              <span className="text-white font-bold text-2xl">ب</span>
            </div>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome back</h1>
          <p className="text-gray-600 text-base">Sign in to your Bangedara account</p>
        </div>
        {errors.general && (
          <div className="mb-6 w-full p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
            {errors.general}
      </div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <Input
            id="username"
            label="Username or Email"
            type="text"
            autoComplete="username"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            error={errors.username}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            placeholder="Enter your username or email"
            required
            className="w-full"
          />
          <Input
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={errors.password}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            }
            placeholder="Enter your password"
            required
            className="w-full"
          />
          <div className="flex items-center justify-between w-full">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 transition"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link 
              href="/forgot-password" 
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition"
            >
              Forgot password?
            </Link>
          </div>
          <Button 
            type="submit" 
            loading={loading}
            size="lg"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold tracking-wide btn-hover"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <div className="mt-8 text-center text-sm text-gray-600 w-full">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-emerald-600 hover:underline font-semibold">Sign up for free</Link>
        </div>
      </div>
    </div>
  );
} 
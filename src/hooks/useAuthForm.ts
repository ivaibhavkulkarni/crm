import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthFormData {
  [key: string]: string;
}

interface UseAuthFormProps {
  endpoint: string;
  onSuccess?: () => void;
  redirectTo?: string;
}

export function useAuthForm({ endpoint, onSuccess, redirectTo }: UseAuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<AuthFormData>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Request failed');
        setLoading(false);
        return;
      }

      if (onSuccess) {
        onSuccess();
      }

      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
}


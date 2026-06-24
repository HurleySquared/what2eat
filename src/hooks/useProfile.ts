import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import type { User } from '@/types/user';

const EMPTY_USER: User = { nickname: '', email: '', password: '' };

export type ProfileMode = 'edit' | 'create';

interface UseProfileReturn {
  form: User;
  mode: ProfileMode;
  saved: boolean;
  showPassword: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
  togglePassword: () => void;
  startCreate: () => void;
  cancelCreate: () => void;
}

export function useProfile(): UseProfileReturn {
  const { user, updateUser } = useUser();
  const [mode, setMode] = useState<ProfileMode>('edit');
  const [form, setForm] = useState<User>({ ...user });
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    updateUser(form);
    setSaved(true);
    setMode('edit');
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const startCreate = () => {
    setForm(EMPTY_USER);
    setSaved(false);
    setMode('create');
  };

  const cancelCreate = () => {
    setForm({ ...user });
    setSaved(false);
    setMode('edit');
  };

  return {
    form,
    mode,
    saved,
    showPassword,
    handleChange,
    handleSubmit,
    togglePassword,
    startCreate,
    cancelCreate,
  };
}

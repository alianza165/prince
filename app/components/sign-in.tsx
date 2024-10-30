import React from 'react';
import { signIn } from 'next-auth/react';

export function SignIn() {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await signIn('google', {
    redirect_uri: 'http://localhost:3000/' // This is your redirect URI
});
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Sign in with Google</button>
    </form>
  );
}

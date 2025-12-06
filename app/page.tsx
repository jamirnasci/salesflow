'use client'

import UserForm from '@/components/forms/UserForm';
import Modal from '@/components/Modal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; // Descomente em um projeto Next.js real

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false)
  const switchModal = () => {
    setModalVisible(!isModalVisible)
  }
  const router = useRouter(); // Descomente em um projeto Next.js real

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password
    })

    if(result?.error){
      alert('Falha ao realizar login, verifique suas credenciais')
    }else{
      router.push('/home')
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* --- Card de Login --- */}
        <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-indigo-600">

          {/* --- Cabeçalho --- */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              SalesFlow
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              Acesse sua conta
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* --- Campo Email --- */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço de E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="seu.usuario@dominio.com"
              />
            </div>

            {/* --- Campo Senha --- */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="********"
              />
            </div>

            {/* --- Mensagem de Erro --- */}
            {error && (
              <div className="p-3 text-sm font-medium text-red-700 bg-red-100 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* --- Botão de Login --- */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent 
                         rounded-lg shadow-sm text-lg font-semibold text-white 
                         bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                         disabled:bg-indigo-400 transition duration-150"
            >
              {loading ? 'Entrando...' : 'Entrar no SalesFlow'}
            </button>
          </form>

          {/* --- Links de Ajuda --- */}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        {/* --- Link de Cadastro --- */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <button className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={() => {
              switchModal()
            }}>
              Registre-se agora
            </button>
          </p>
        </div>

      </div>
      { isModalVisible ? <Modal title='Criar conta' Node={<UserForm />} setModalVisible={switchModal} /> : null}
    </div>
  );
};

export default LoginPage;
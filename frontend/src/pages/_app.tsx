import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="A simple and elegant todo app built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="todo, next.js, task manager" />
        <meta name="author" content="Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-blue-500 text-white p-4 fixed top-0 w-full flex justify-between items-center">
          <h1 className="text-xl font-bold">Todo App</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
        <footer className="bg-blue-500 text-white p-4 text-center fixed bottom-0 w-full">
          <p>&copy; 2025 Todo App</p>
        </footer>
      </div>
    </ApolloProvider>
  );
}

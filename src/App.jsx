import './App.css';
import { Link, Outlet, useLocation, useRoutes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './pages/Home';
import { SandwichBuilder } from './pages/SandwichBuilder';
import React from 'react';
import { clsx } from 'clsx';
import { HamburgerMenu } from './components/HamburgerMenu';

function App() {
	const routes = useRoutes([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: 'sandwich-builder',
					element: <SandwichBuilder />,
				},
			],
		},
	]);
	const location = useLocation();
	if (!routes) return null;
	return (
		<AnimatePresence mode='wait'>
			{React.cloneElement(routes, { key: location.pathname })}
		</AnimatePresence>
	);
}

function Layout() {
	const { pathname } = useLocation();

	return (
		<div className='max-w-7xl grid grid-rows-[min-content_1fr] grid-cols-1 px-6 pb-6 mx-auto h-full'>
			<header className='px-0 lg:pt-8'>
				<nav className='flex items-center justify-between sm:justify-normal sm:gap-20'>
					<div className='w-[48px] h-[48px] lg:w-[80px] lg:h-[80px] bg-titan-white rounded-full flex justify-center items-center shrink-0 grow-0'>
						<p className='text-primary text-base font-bold'>m</p>
					</div>
					<div className='hidden sm:flex flex-col w-fit mx-0 relative'>
						<Link
							to='/'
							className={clsx(
								'text-black font-normal text-base leading-5',
								pathname === '/' && 'font-semibold'
							)}
						>
							Home
						</Link>
						{pathname === '/' && (
							<div className='bg-primary absolute -bottom-2 h-[2px] w-full' />
						)}
					</div>
					<div className='hidden sm:flex flex-col w-fit mx-0 relative'>
						<Link
							to='/sandwich-builder'
							className={clsx(
								'text-black font-normal text-base leading-5',
								pathname === '/sandwich-builder' && 'font-semibold'
							)}
						>
							Make your Sandwich
						</Link>
						{pathname === '/sandwich-builder' && (
							<div className='bg-primary absolute -bottom-2 h-[2px] w-full' />
						)}
					</div>

					<div className='block sm:hidden'>
						<HamburgerMenu />
					</div>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default App;

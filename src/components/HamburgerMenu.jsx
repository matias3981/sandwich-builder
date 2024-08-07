import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuVariants = {
	closed: {
		clipPath: `circle(30px at calc(100% - 48px - 30px) -48px)`,
		backgroundColor: 'var(--titan-white)',
	},
	open: {
		clipPath: `circle(200% at calc(100% - 48px - 30px) 40px)`,
		backgroundColor: '#FFFFFF',
	},
};

const linksWrapperVariants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.2 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};

const linksVariants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

export function HamburgerMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const { pathname } = useLocation();
	return (
		<>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className='w-[48px] h-[48px] rounded-full bg-titan-white flex justify-center items-center shrink-0 grow-0'
			>
				<div className='flex flex-col gap-1'>
					<motion.div
						animate={{ rotate: isOpen ? -45 : 0, transition: { bounce: 0 } }}
						className='w-2 bg-primary h-[2px] self-end mr-[2px] origin-right'
					/>
					<motion.div
						animate={{ rotate: isOpen ? 45 : 0, transition: { bounce: 0 } }}
						className='w-4 bg-primary h-[2px]'
					/>
					<motion.div
						animate={{ rotate: isOpen ? -45 : 0, transition: { bounce: 0 } }}
						className='w-2 bg-primary h-[2px] self-start ml-[2px] origin-left'
					/>
				</div>
			</button>

			<motion.div
				key='menu'
				variants={menuVariants}
				initial='closed'
				animate={isOpen ? 'open' : 'closed'}
				transition={{ ease: 'easeOut', duration: isOpen ? 1 : 0.3 }}
				className='absolute inset-0 top-[48px] z-10'
			>
				<motion.div
					className='flex flex-col justify-center items-stretch gap-14 h-full'
					variants={linksWrapperVariants}
				>
					<motion.div
						variants={linksVariants}
						className='flex flex-col w-fit mx-auto gap-3'
					>
						<Link
							to='/'
							className={clsx(
								'text-black font-normal text-base leading-5',
								pathname === '/' && 'font-semibold'
							)}
						>
							Home
						</Link>
						{pathname === '/' && <div className='bg-primary h-[2px] w-full' />}
					</motion.div>
					<motion.div
						variants={linksVariants}
						className='flex flex-col w-fit mx-auto gap-3'
					>
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
							<div className='bg-primary h-[2px] w-full' />
						)}
					</motion.div>
				</motion.div>
			</motion.div>
		</>
	);
}

import { useSandwich } from '@/hooks/useSandwich';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function Summary() {
	const total = useSandwich((state) => state.total);
	const time = useSandwich((state) => state.time);
	const weight = useSandwich((state) => state.weight);
	const calories = useSandwich((state) => state.calories);
	const setAddedToCart = useSandwich((state) => state.setAddedToCart);
	const addedToCart = useSandwich((state) => state.addedToCart);
	const resetSandwich = useSandwich((state) => state.resetSandwich);
	const [purchaseCompleted, setPurchaseCompleted] = useState(false);
	const timer = useRef();

	useEffect(() => {
		if (purchaseCompleted) {
			setTimeout(() => {
				setPurchaseCompleted(false);
				setAddedToCart(false);
				resetSandwich();
			}, 10000);
		}
	}, [purchaseCompleted, setAddedToCart, resetSandwich]);

	function handlePurchase() {
		setAddedToCart(!addedToCart);
		if (timer.current && addedToCart) {
			clearTimeout(timer.current);
			timer.current = null;
		} else {
			timer.current = setTimeout(() => {
				setPurchaseCompleted(true);
			}, 4000);
		}
	}

	return (
		<div className='flex flex-col gap-6 justify-center'>
			<h3 className='hidden lg:block text-black font-semibold text-4xl leading-normal'>
				Summary
			</h3>
			<hr className='hidden lg:block border-t-2 border-titan-white' />
			<div className='flex flex-nowrap items-center justify-between mt-auto'>
				<p className='text-primary font-extrabold text-4xl'>
					${Number(total).toFixed(2)}
				</p>
				<motion.button
					disabled={purchaseCompleted}
					initial='initial'
					animate={{ backgroundColor: addedToCart ? '#FF4D4F' : '#B956F5' }}
					onClick={handlePurchase}
					className='bg-primary text-titan-white font-semibold text-base p-4 max-w-48 w-full rounded-full relative overflow-hidden'
				>
					<AnimatePresence>
						{purchaseCompleted && (
							<motion.div
								className='absolute inset-0 z-0 flex items-center justify-center bg-green-500'
								initial='hidden'
								animate='visible'
								exit={{ x: '100%' }}
								variants={{
									hidden: { x: '-100%' },
									visible: {
										x: ['-100%', '-80%', '-70%', '-45%', 0],
										transition: {
											times: [0, 0.1, 0.2, 0.9, 1],
											duration: 3,
											delayChildren: 3.25,
										},
									},
								}}
							>
								<motion.p
									variants={{
										hidden: { opacity: 0, scale: 1.25 },
										visible: { opacity: 1, scale: 1 },
									}}
								>
									Order received!
								</motion.p>
							</motion.div>
						)}
					</AnimatePresence>
					{addedToCart ? 'Cancel' : 'Checkout'}
				</motion.button>
			</div>
			<div className='hidden lg:flex bg-titan-white py-4 px-6 justify-between rounded-full'>
				<div className='flex gap-2 items-center'>
					<img
						className='p-2 bg-[#B956F5] rounded-full'
						src='/images/clock.svg'
						alt='time to prepare the sandwich'
					/>
					<p className='text-black text-sm font-semibold'>
						{Number(time).toFixed()} min
					</p>
				</div>
				<div className='flex gap-2 items-center'>
					<img
						className='p-2 bg-[#F58F56] rounded-full'
						src='/images/weight.svg'
						alt='weight'
					/>
					<p className='text-black text-sm font-semibold'>{weight} gr</p>
				</div>
				<div className='flex gap-2 items-center'>
					<img
						className='p-2 bg-[#FF4D4F] rounded-full'
						src='/images/calories.svg'
						alt='calories'
					/>
					<p className='text-black text-sm font-semibold'>{calories} kcal</p>
				</div>
			</div>
		</div>
	);
}

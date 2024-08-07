import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const visible = { opacity: 1, y: 0, transition: { duration: 0.3 } };
const exit = { opacity: 0, y: -10, transition: { duration: 0.3 } };

const titleVariants = {
	hidden: { opacity: 0, y: 10 },
	visible,
	exit,
};

const imageVariants = {
	hidden: { opacity: 0, y: 10 },
	visible,
	exit,
};

const buttonVariants = {
	hidden: { opacity: 0, y: 10 },
	visible,
	exit,
};

export function Home() {
	const navigate = useNavigate();

	return (
		<motion.section
			initial='hidden'
			animate='visible'
			exit='exit'
			variants={{
				visible: { transition: { delayChildren: 0.1, staggerChildren: 0.2 } },
			}}
			className='h-full relative flex flex-col justify-between gap-4 sm:flex-row'
		>
			<div className='px-6 pt-10 lg:px-0 sm:self-center'>
				<motion.h1
					variants={titleVariants}
					className='text-black font-semibold text-5xl leading-normal sm:max-w-64'
				>
					Make Your Sandwich
				</motion.h1>
			</div>
			<motion.div className='relative flex flex-col sm:self-center sm:max-w-[50%]'>
				<motion.img
					variants={imageVariants}
					className='z-[-1] overflow-visible aspect-[2/2] sm:aspect-auto object-cover sm:object-initial'
					src={'/images/glob.svg'}
					alt=''
				/>
				<motion.img
					variants={imageVariants}
					src='/images/deconstructed_sandwich.webp'
					alt='An awesome sandwich'
					className='absolute bottom-2 z-[-1] overflow-visible aspect-[1/1.1] object-cover'
				/>
				<div className='absolute bottom-[30%] left-0 right-0 mx-auto w-fit sm:mx-0 sm:bottom-0 sm:translate-y-full sm:-translate-x-1/2 lg:-translate-y-full lg:-translate-x-full'>
					<motion.button
						variants={buttonVariants}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.8 }}
						className='select-none  w-[120px] h-[120px] px-6 uppercase bg-primary text-titan-white font-extrabold text-base leading-5 rounded-full flex justify-center items-center'
						onClick={() => navigate('/sandwich-builder')}
					>
						Let&apos;s make it
					</motion.button>
				</div>
			</motion.div>
		</motion.section>
	);
}

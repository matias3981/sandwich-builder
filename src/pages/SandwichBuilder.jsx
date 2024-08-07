import { Ingredients } from '@/components/Ingredients';
import { Sandwich } from '@/components/Sandwich';
import { Summary } from '@/components/Summary';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export function SandwichBuilder() {
	return (
		<section className='flex flex-col items-stretch h-full overflow-hidden'>
			<div className='flex flex-col flex-1 mt-4 lg:mt-14 lg:flex-1 lg:flex lg:flex-row lg:justify-center'>
				<div className='flex-1 lg:max-w-[480px] lg:flex-1 relative'>
					<img
						className='absolute max-h-full inset-0 m-auto lg:max-w-full'
						src='/images/builder_glob.svg'
						alt=''
					/>
					<div className='w-full h-full min-h-[45dvh]'>
						<Canvas camera={{ position: [1.25, 1.5, 3], fov: 30, far: 100 }}>
							<ambientLight />
							<Suspense>
								<Sandwich />
							</Suspense>
						</Canvas>
					</div>
				</div>
				<div className='hidden lg:block basis-[436px]'>
					<Summary />
				</div>
				<div className='flex flex-col gap-4 lg:hidden '>
					<Ingredients />
					<Summary />
				</div>
			</div>
			<div className='hidden lg:block'>
				<Ingredients />
			</div>
		</section>
	);
}

import { INGREDIENTS, useSandwich } from '@/hooks/useSandwich';

export function Ingredients() {
	const addIngredient = useSandwich((state) => state.addIngredient);

	return (
		<div className='max-w-screen-lg overflow-hidden m-auto mt-6'>
			<ul className='flex gap-6 overflow-x-auto '>
				{Object.keys(INGREDIENTS).map((ingredient) => (
					<li
						key={`ingredient_${INGREDIENTS[ingredient].name}`}
						className='rounded-[32px] border-solid border border-titan-white px-4 py-6 basis-36 shrink-0'
					>
						<div className='max-w-full h-10'>
							<img
								className='w-full h-full object-scale-down'
								src={INGREDIENTS[ingredient].image}
								alt=''
							/>
						</div>
						<p className='text-center text-black text-base font-semibold my-3'>
							{INGREDIENTS[ingredient].name}
						</p>

						<button
							onClick={() => addIngredient(ingredient)}
							className='w-full py-2 bg-titan-white rounded-full flex items-center justify-center'
						>
							<p className='font-semibold text-sm text-black'>Add</p>
							<img src='/images/plus.svg' width='16px' height={'16px'} alt='' />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

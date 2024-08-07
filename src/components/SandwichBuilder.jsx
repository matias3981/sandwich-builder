import { INGREDIENTS, useSandwich } from '@/hooks/useSandwich';
import { Button } from '@/components/ui/button';

export function SandwichBuilder() {
	const addIngredient = useSandwich((state) => state.addIngredient);
	const total = useSandwich((state) => state.total);
	const [addedToCart, setAddedToCart] = useSandwich((state) => [
		state.addedToCart,
		state.setAddedToCart,
	]);
	return (
		<section className='w-full p-8 h-[460px]'>
			{addedToCart ? (
				<div className='flex flex-col gap-1'>
					<h2 className='text-2xl font-semibold'>Your sandwich</h2>
					<p className='text-slate-700'>
						<span className='font-semibold'>Total</span> - ${total.toFixed(2)}
					</p>
					<p className='text-slate-700'>
						Order sent to the kitchen! Your sandwich will be ready in 5 minutes
					</p>
					<Button className={'mt-3'} onClick={() => setAddedToCart(false)}>
						Cancel order
					</Button>
				</div>
			) : (
				<>
					<div>
						<h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl'>
							La Sandwicherie
						</h1>
						<p className='text-sm text-muted-foreground'>
							The best sandwiches on Valencia, Spain!
						</p>
					</div>
					<div className='mt-4'>
						<p className='text-md text-slate-700'>
							Compose your sandwich by adding ingredients
						</p>
						<div className='overflow-hidden'>
							<ul className='flex gap-2 overflow-x-auto py-4'>
								{Object.keys(INGREDIENTS).map((ingredient) => (
									<li
										key={'ingredient' + INGREDIENTS[ingredient].id + ingredient}
									>
										<Button onClick={() => addIngredient(ingredient)}>
											{`${ingredient} ${INGREDIENTS[ingredient].icon}`}
										</Button>
									</li>
								))}
							</ul>
						</div>
					</div>
					<Button onClick={() => setAddedToCart(true)}>
						Add to cart ${total.toFixed(2)}
					</Button>
				</>
			)}
		</section>
	);
}

import { INGREDIENTS, useSandwich } from '@/hooks/useSandwich';
import { Float, Gltf, Text3D } from '@react-three/drei';
import { Suspense } from 'react';
import fontPath from '../assets/3d-fonts/Inter_Regular.json';
import { animated, useSpring } from '@react-spring/three';
const INGREDIENT_SCALE = 3;
const INGREDIENT_SCALE_Y = 5;

export function Ingredient({ ingredient, showPrice, ...props }) {
	const { positionY } = useSpring({ positionY: props['position-y'] });
	const { scale } = useSpring({
		from: {
			scale: 0.5,
		},
		to: {
			scale: 1,
		},
	});

	const removeIngredient = useSandwich((state) => state.removeIngredient);
	const addedToCart = useSandwich((state) => state.addedToCart);
	return (
		<animated.group {...props} scale={scale} position-y={positionY}>
			{showPrice && !addedToCart && (
				<Suspense>
					<group
						onClick={(e) => {
							e.stopPropagation();
							removeIngredient(ingredient);
						}}
					>
						<mesh position-x={0.7} position-y={0.042}>
							<planeGeometry args={[0.6, 0.16]} />
							<meshStandardMaterial color='white' opacity={0.42} transparent />
						</mesh>
						<Text3D
							font={fontPath}
							scale={0.1}
							position-x={0.45}
							bevelEnabled
							bevelSegments={3}
							bevelThickness={0.001}
						>
							${INGREDIENTS[ingredient.name].price.toFixed(2)}
							<meshBasicMaterial color='black' />
						</Text3D>
						<Text3D
							font={fontPath}
							scale={0.1}
							position-x={0.86}
							bevelEnabled
							bevelSegments={3}
							bevelThickness={0.001}
						>
							X<meshBasicMaterial color='red' />
						</Text3D>
					</group>
				</Suspense>
			)}
			<Float
				floatingRange={addedToCart ? [0, 0] : [-0.01, 0.01]}
				speed={addedToCart ? 0 : 3}
				rotationIntensity={0.3}
			>
				<Gltf
					position={[0, 0, 0]}
					src={INGREDIENTS[ingredient.name].src}
					scale={INGREDIENT_SCALE}
					scale-y={
						INGREDIENT_SCALE_Y * (ingredient.name === 'bread' ? 1.5 : 0.5)
					}
				/>
			</Float>
		</animated.group>
	);
}

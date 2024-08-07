import { useSandwich } from '@/hooks/useSandwich';
import { Ingredient } from './Ingredient';
import { CameraControls, ContactShadows } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion-3d';
import { Box3, Vector3 } from 'three';
import { useAnimationControls } from 'framer-motion';

const INGREDIENT_SPACING = 0.2;
const INGREDIENT_SPACING_FINAL = 0.06;

export function Sandwich(props) {
	const sandwichRef = useRef();
	const ingredients = useSandwich((state) => state.ingredients);
	const addedToCart = useSandwich((state) => state.addedToCart);
	const cameraRef = useRef();
	const boxRef = useRef(new Box3());
	const sizeRef = useRef(new Vector3());
	const controls = useAnimationControls();

	const ingredientSpacing = addedToCart
		? INGREDIENT_SPACING_FINAL
		: INGREDIENT_SPACING;

	useEffect(() => {
		boxRef.current?.setFromObject(sandwichRef.current);
		boxRef.current?.getSize(sizeRef.current);

		// cameraRef.current.enabled = false;
		// Disable rotation
		cameraRef.current.azimuthRotateSpeed = 0;
		cameraRef.current.polarRotateSpeed = 0;
		// Disable zoom
		cameraRef.current.dollySpeed = 0;
		cameraRef.current.setLookAt(
			1.25,
			1.5 + sizeRef.current.y,
			3 + sizeRef.current.y,
			0,
			0,
			0,
			true
		);
	}, [ingredients]);

	useEffect(() => {
		if (addedToCart) {
			controls.start({
				rotateY: 360,
				transition: {
					duration: 500,
					ease: 'linear',
					repeat: Infinity,
				},
			});
		} else {
			controls.start({
				rotateY: 0,
				transition: {
					duration: 0,
				},
			});
		}
	}, [addedToCart, controls]);

	return (
		<motion.group
			animate={{
				y: (-ingredients.length * ingredientSpacing) / 2,
			}}
		>
			<motion.group {...props} animate={controls} ref={sandwichRef}>
				{ingredients.map((ingredient, index) => (
					<Ingredient
						key={ingredient.id + ingredient.name}
						ingredient={ingredient}
						showPrice={index > 0 && index < ingredients.length - 1}
						position-y={index * ingredientSpacing}
					/>
				))}
			</motion.group>
			<ContactShadows position-y={-0.5} opacity={0.6} />
			<CameraControls ref={cameraRef} minDistance={0} enabled />
		</motion.group>
	);
}

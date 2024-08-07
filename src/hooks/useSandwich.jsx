import { create } from 'zustand';
import Bread from '../assets/models/Bread_Slice_Bread_0.glb';
import Lettuce from '../assets/models/Lettuce_Slice_Lettuce_0.glb';
import Tomato from '../assets/models/Tomato_Slice_Tomato_0.glb';
import Cheese from '../assets/models/Cheese_Slice_Cheese_0.glb';
import Chicken from '../assets/models/Chicken_Slice_Chicken_0.glb';
import Salami from '../assets/models/Salami_Slice_Salami_0.glb';
import Bacon from '../assets/models/Bacon_Slice_Bacon_0.glb';
import Patty from '../assets/models/Patty_Slice_Patty_0.glb';
import Ketchup from '../assets/models/Ketchup_Slice_Ketchup_0.glb';
import Mustard from '../assets/models/Mustard_Slice_Mustard_0.glb';
import Mayo from '../assets/models/Mayo_Slice_Mayo_0.glb';
import Cucumber from '../assets/models/Cucumber_Slice_Cucumber_0.glb';
import Egg from '../assets/models/Egg_Slice_Egg_0.glb';
import Mushroom from '../assets/models/Mushroom_Slice_Mushroom_0.glb';
import Onion from '../assets/models/Onion_Slice_Onion_0.glb';
import Pepper from '../assets/models/Pepper_Slice_Pepper_0.glb';
import Pickle from '../assets/models/Pickle_Slice_Pickles_0.glb';

import { useGLTF } from '@react-three/drei';

export const INGREDIENTS = {
	bread: {
		src: Bread,
		name: 'Bread',
		price: 0.5,
		image: '/images/ingredients/bread_slice.png',
		time: 0.5, // minutes
		weight: 30, // grams per slice
		calories: 80,
	},
	lettuce: {
		src: Lettuce,
		name: 'Lettuce',
		price: 0.5,
		image: '/images/ingredients/lettuce_slice.png',
		time: 0.2, // minutes
		weight: 15, // grams per leaf
		calories: 5,
	},
	tomato: {
		src: Tomato,
		name: 'Tomato',
		price: 0.5,
		image: '/images/ingredients/tomato_slice.png',
		time: 0.5, // minutes
		weight: 20, // grams per slice
		calories: 4,
	},
	cheese: {
		src: Cheese,
		name: 'Cheese',
		price: 1,
		image: '/images/ingredients/cheese_slice.png',
		time: 0.2, // minutes
		weight: 20, // grams per slice
		calories: 70,
	},
	chicken: {
		src: Chicken,
		name: 'Chicken',
		price: 2,
		image: '/images/ingredients/chicken_slice.png',
		time: 3, // minutes
		weight: 50, // grams per slice
		calories: 80,
	},
	cucumber: {
		src: Cucumber,
		name: 'Cucumber',
		price: 0.5,
		image: '/images/ingredients/cucumber_slice.png',
		time: 0.2, // minutes
		weight: 10, // grams per slice
		calories: 1,
	},
	salami: {
		src: Salami,
		name: 'Salami',
		price: 1,
		image: '/images/ingredients/salami_slice.png',
		time: 0.2, // minutes
		weight: 10, // grams per slice
		calories: 40,
	},
	bacon: {
		src: Bacon,
		name: 'Bacon',
		price: 1,
		image: '/images/ingredients/bacon_slice.png',
		time: 2, // minutes (assuming pre-cooked)
		weight: 10, // grams per slice
		calories: 50,
	},
	patty: {
		src: Patty,
		name: 'Patty',
		price: 2,
		image: '/images/ingredients/patty_slice.png',
		time: 5, // minutes
		weight: 100, // grams
		calories: 250,
	},
	ketchup: {
		src: Ketchup,
		name: 'Ketchup',
		price: 0,
		image: '/images/ingredients/ketchup_slice.png',
		time: 0.1, // minutes
		weight: 10, // grams per tablespoon
		calories: 15,
	},
	mustard: {
		src: Mustard,
		name: 'Mustard',
		price: 0,
		image: '/images/ingredients/mustard_slice.png',
		time: 0.1, // minutes
		weight: 10, // grams per tablespoon
		calories: 10,
	},
	mayo: {
		src: Mayo,
		name: 'Mayo',
		price: 0,
		image: '/images/ingredients/mayo_slice.png',
		time: 0.1, // minutes
		weight: 10, // grams per tablespoon
		calories: 90,
	},
	egg: {
		src: Egg,
		name: 'Egg',
		price: 1,
		image: '/images/ingredients/egg_slice.png',
		time: 7, // minutes (assuming hard-boiled)
		weight: 50, // grams per egg
		calories: 70,
	},
	mushrooms: {
		src: Mushroom,
		name: 'Mushrooms',
		price: 0.5,
		image: '/images/ingredients/mushrooms_slice.png',
		time: 1, // minutes
		weight: 15, // grams per slice
		calories: 5,
	},
	onion: {
		src: Onion,
		name: 'Onion',
		price: 0.5,
		image: '/images/ingredients/onion_rings.png',
		time: 0.2, // minutes
		weight: 10, // grams per ring
		calories: 4,
	},
	pepper: {
		src: Pepper,
		name: 'Pepper',
		price: 0.5,
		image: '/images/ingredients/pepper_slice.png',
		time: 0.2, // minutes
		weight: 10, // grams per slice
		calories: 2,
	},
	pickle: {
		src: Pickle,
		name: 'Pickle',
		price: 0.5,
		image: '/images/ingredients/pickle_slice.png',
		time: 0.2, // minutes
		weight: 15, // grams per slice
		calories: 3,
	},
};

Object.keys(INGREDIENTS).forEach((key) => {
	useGLTF.preload(INGREDIENTS[key].src);
});

export const useSandwich = create((set) => ({
	ingredients: [
		{
			id: 0,
			name: 'bread',
		},
		{
			id: 1,
			name: 'bread',
		},
	],
	total: 0,
	time: 0,
	weight: 0,
	calories: 0,
	addIngredient: (ingredient) =>
		set((state) => ({
			total: state.total + INGREDIENTS[ingredient].price,
			time: state.time + INGREDIENTS[ingredient].time,
			weight: state.weight + INGREDIENTS[ingredient].weight,
			calories: state.calories + INGREDIENTS[ingredient].calories,
			ingredients: [
				...state.ingredients.slice(0, -1),
				{
					name: ingredient,
					id: state.ingredients.length,
				},
				{
					name: 'bread',
					id: 1,
				},
			],
		})),
	removeIngredient: (ingredient) => {
		return set((state) => ({
			total: state.total - INGREDIENTS[ingredient.name]?.price || 0,
			time: state.time - INGREDIENTS[ingredient.name]?.time || 0,
			weight: state.weight - INGREDIENTS[ingredient.name]?.weight || 0,
			calories: state.calories - INGREDIENTS[ingredient.name]?.calories || 0,
			ingredients: state.ingredients.filter((i) => i.id !== ingredient.id),
		}));
	},
	resetSandwich: () =>
		set({
			ingredients: [
				{
					id: 0,
					name: 'bread',
				},
				{
					id: 1,
					name: 'bread',
				},
			],
			total: 0,
			time: 0,
			weight: 0,
			calories: 0,
		}),
	setAddedToCart: (addedToCart) => set({ addedToCart }),
}));

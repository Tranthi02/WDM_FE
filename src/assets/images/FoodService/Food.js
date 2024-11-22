import Food from './food.jpeg';

const foodlists = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1, 
    title: "Shrimp",
    price: 200,
    status: "OK", 
    image: Food, 
    slug: "food",
}));

const getAllFoods = () => foodlists;

const getFoodById = (id) =>
    foodlists.find((element) => element.id === id);

const getFoodBySlug = (slug) =>
    foodlists.find((element) => element.slug === slug);

const getFoods = (count) => {
    const max = foodlists.length - count;
    const min = 0;
    const start = Math.floor(Math.random() * (max - min) + min);
    return foodlists.slice(start, start + count);
};

const foodData = {
    getAllFoods,
    getFoodById,
    getFoodBySlug,
    getFoods,
};

export default foodData;

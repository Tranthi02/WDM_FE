import Service from './service.jpeg';

const servicelists = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1, 
    title: "Piano",
    price: 200,
    status: "OK",
    image: Service, 
    slug: "service",
}));

const getAllServices = () => servicelists; 

const getServiceById = (id) =>
    servicelists.find((element) => element.id === id);

const getServiceBySlug = (slug) =>
    servicelists.find((element) => element.slug === slug);

const getServices = (count) => {
    const max = servicelists.length - count;
    const min = 0;
    const start = Math.floor(Math.random() * (max - min) + min);
    return servicelists.slice(start, start + count);
};

const serviceData = {
    getAllServices,
    getServiceById,
    getServiceBySlug,
    getServices,
};

export default serviceData;

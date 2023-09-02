const { faker } = require("@faker-js/faker");

const generateProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.alpha(4),
        price: faker.commerce.price({ min: 100, max: 99999, dec: 0 }),
        stock: faker.string.numeric({length: {min:1, max: 5}, exclude: [`0`]}),
        category: faker.commerce.department(),
        thumbnail: faker.image.urlLoremFlickr({category: `product`})
    };
};

module.exports.generateProducts = (cant) => {
    const products = [];
    for (let i = 0; i < cant; i++) {
        products.push(generateProduct());
    }
    return products;
};

/* 

[
    'airline', 'animal',
    'app', 'cell_phone',
    'color', 'commerce',
    'company', 'database',
    'date', 'finance',
    'hacker', 'internet',
    'location', 'lorem',
    'metadata', 'music',
    'person', 'phone_number',
    'science', 'team',
    'vehicle', 'word'
]
department
[
    'Books', 'Movies',
    'Music', 'Games',
    'Electronics', 'Computers',
    'Home', 'Garden',
    'Tools', 'Grocery',
    'Health', 'Beauty',
    'Toys', 'Kids',
    'Baby', 'Clothing',
    'Shoes', 'Jewelery',
    'Sports', 'Outdoors',
    'Automotive', 'Industrial'
]
person
[
    'bio_part', 'bio_pattern',
    'bio_supporter', 'female_first_name',
    'female_middle_name', 'female_prefix',
    'first_name', 'gender',
    'last_name', 'last_name_pattern',
    'male_first_name', 'male_middle_name',
    'male_prefix', 'middle_name',
    'name', 'prefix',
    'sex', 'suffix',
    'title', 'western_zodiac_sign'
] */
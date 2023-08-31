const faker = require("@faker-js/faker");

module.exports.generateProducts = (cant) => {
    return {
        id: faker.database.mongodbObjectId(),
        nombre: faker.person.firstName(),
        apellido: faker.person.lastName(),
        nacimiento: faker.date.birthdate(),
        telefono: faker.phone.number()
    }
}

const generateProduct = () => {
    return {
        _id: faker.en.string,
        title: faker.en.commerce
    }
}

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
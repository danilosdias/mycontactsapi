const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);

    return response.json(categories);
  }

  async show(request, response) {
    const { name } = request.params;
    const category = await CategoriesRepository.findByName(name);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName(name);

    if (categoryExists) {
      return response.status(400).json({ error: 'This name category is already in use' });
    }

    const category = await CategoriesRepository.crate({ name });

    return response.status(201).json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const contactExists = await CategoriesRepository.findById(id);
    if (!contactExists) {
      return response.status(400).json({ error: 'Contact not found' });
    }

    console.log(contactExists.name);

    if (contactExists.name === name) {
      return response.status(400).json({ error: 'This name category is already in use' });
    }

    const category = await CategoriesRepository.update(id, { name });

    return response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);
    return response.sendStatus(204);
  }
}

module.exports = new CategoryController();

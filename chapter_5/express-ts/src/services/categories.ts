import { CategoryRequest } from '../models/dto/categories';
import Category from '../models/entity/category';
import CategoriesRepository from '../repositories/categories';

class CategoriesService {
  static async getCategories(): Promise<Category[]> {
    let listCategory: Category[] = [];

    listCategory = await CategoriesRepository.getCategoriesCache();

    if (listCategory.length === 0) {
      listCategory = await CategoriesRepository.getCategories();
    }

    return listCategory;
  }

  static async createCategory(category: CategoryRequest): Promise<Category> {
    const categoryToCreate: Category = {
      name: category.name,
    };
    const createdCategory = await CategoriesRepository.createCategory(
      categoryToCreate
    );

    // Get all categories from postgre
    const listCategory = await CategoriesRepository.getCategories();

    // Set list category to redis
    await CategoriesRepository.setCategoriesCache(listCategory);

    return createdCategory;
  }
}

export default CategoriesService;

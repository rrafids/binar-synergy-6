import { Request, Response } from 'express';
import { CategoryRequest } from '../models/dto/categories';
import Category from '../models/entity/category';
import { DefaultResponse } from '../models/dto/default';
import CategoriesService from '../services/categories';

class CategoriesHandler {
  async getCategories(req: Request, res: Response) {
    const categoryList: Category[] = await CategoriesService.getCategories();

    const response: DefaultResponse = {
      status: 'OK',
      message: 'Success retrieving data',
      data: {
        categories: categoryList,
      },
    };

    res.status(200).send(response);
  }

  async createCategory(req: Request, res: Response) {
    const payload: CategoryRequest = req.body;

    // Payload validation
    if (!payload.name) {
      const response: DefaultResponse = {
        status: 'BAD_REQUEST',
        message: 'Name cannot be empty',
        data: {
          created_category: null,
        },
      };

      res.status(400).send(response);
    }

    const createdCategory: Category = await CategoriesService.createCategory(
      payload
    );

    const response: DefaultResponse = {
      status: 'CREATED',
      message: 'Category succesfully created',
      data: {
        created_category: createdCategory,
      },
    };

    res.status(201).send(response);
  }
}

export default CategoriesHandler;

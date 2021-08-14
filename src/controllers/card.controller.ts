import express from 'express';
import CardService, { IGettedCard } from '../services/card.service';
import cloudinary from '../utils/cloudinary';

interface QueryName {
  name: String
}
class CardController {
  async create(req: any, res: express.Response) {
    try {
      let image;
      if (req.file?.path) {
        const response = await cloudinary.uploader.upload(req.file?.path);
        image = response.secure_url;
      }
      const card = await CardService.create(req.body, image);
      res.json(card);
    } catch (err) {
        return res.status(500).json(err.message);
    }
  }

  async getAll(req: express.Request<{}, {}, {}, QueryName>, res: express.Response) {
    try {
      let cards: IGettedCard;
      if (req.query.name) {
        cards = await CardService.getAllByCategoryName(req.query.name);
      } else {
        cards = await CardService.getAll();
      }
      return res.json(cards);
    } catch (err) {
       return res.status(500).json(err);
    }
  }

  async getOne(req: express.Request, res: express.Response) {
    try {
      const card = await CardService.getOne(req.params.id);
      return res.json(card);
    } catch (err) {
        return res.status(500).json(err);
    }
  }

  async update(req: any, res: express.Response) {
    try {
      let updated: IGettedCard | Array<IGettedCard>;

      if (req.body.filter) {
        updated = await CardService.updateMany(req.body);
      } else {
        let image;
        if (req.file?.path) {
          const response = await cloudinary.uploader.upload(req.file?.path);
          image = response.secure_url;
        }
        updated = await CardService.update(req.body, image);
      }
      return res.json(updated);
    } catch (err) {
        return res.status(500).json(err.message);
    }
  }

  async delete(req: express.Request, res: express.Response) {
    try {
      const deleted = await CardService.delete(req.params.id);
      return res.json(deleted)
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async deleteMany(req: express.Request, res: express.Response) {
    try {
      const deleted = CardService.deleteMany(req.body);
      return deleted;
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

export default new CardController();
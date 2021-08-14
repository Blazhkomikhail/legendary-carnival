import Card from '../models/card';

export interface IGettedCard {
  _id: string,
  categoryName: string,
  word:  string,
  translation: string,
  picture: string,
  audioSrc: string
}

interface IChangeMany {
  filter: { categoryName : string };
  update: { categoryName : string };
}

interface IDeleteMany {
  categoryName: string;
}

class CardService {
  async create(card: typeof Card, picture: any) {
    const createdCard = await Card.create({...card, picture: picture});
    return createdCard;
  }

  async getAll() {
    const cards = await Card.find();
    return cards;
  }

  async getAllByCategoryName(categoryName: String) {
    if (!categoryName) {
      throw new Error('It has no category name');
    }
    const cards = await Card.find({'categoryName': categoryName });
    return cards;
  }

  async getOne(id: string) {
      if(!id) {
        throw new Error('It has no ID');
      }
      const card = await Card.findById(id);
      return card;
  }

  async update(card: IGettedCard, fileLink: any) {
    if(!card._id) {
      throw new Error('It has no ID');
    } 
    let updated: IGettedCard; 

    if (fileLink) {
      updated = await Card.findByIdAndUpdate(
        card._id, 
        {...card, picture: fileLink },
        {new: true}
      );
    } else {
      updated = await Card.findByIdAndUpdate(card._id, card, {new: true});
    }
    return updated;
  }

  async updateMany(data: IChangeMany) {
    const updated = await Card.updateMany(data.filter, {"$set":data.update}, {new: true});
    return updated;
  }

  async delete(id: string) {
      if(!id) {
        throw new Error ('Id parameter is expected');
      }
      const deleted = await Card.findByIdAndDelete(id);
      return deleted;
  }

  async deleteMany(body: IDeleteMany) {
    if(!body) {
      throw new Error('It has no body');
    } 
    const deleted = await Card.deleteMany(body);
    return deleted;
  }

}

export default new CardService();
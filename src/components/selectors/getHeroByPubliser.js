import { heroes } from '../../data/heroes';

export const getHeroesByPublisher = (publisher) => {
  return heroes.filter(hero => hero.publisher === publisher);
};
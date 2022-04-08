import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { heroImages } from '../../helpers/heroImages';
import { getHeroById } from '../selectors/getHeroById';

export const HeroScreen = () => {

  const { heroeId } = useParams();
  const navigate = useNavigate();

  // Necesitamos usar el usememo porque si cambias el state del componente se volver a ejectuar el getHeroById
  const hero = useMemo(() => getHeroById(heroeId), [heroeId]);

  if (!hero) {
    return <Navigate to='/' />;
  }

  const { superhero, publisher, alter_ego, first_appearance, characters } = hero;

  const handleReturn = () => {
    navigate(-1);
  };


  return (
    <div className='row mt-5'>
      <div className='col-4'>
        <img
          src={heroImages(`./${heroeId}.jpg`)}
          className='img-thumbnail animate__animated animate__fadeInLeft' alt={superhero} />

      </div>

      <div className='col-8'>
        <h2>{hero.superhero}</h2>
        <ul className='list-group animate__animated animate__fadeInDown'>
          <li className='list-group-item'><b>Alter ego: {alter_ego}</b></li>
          <li className='list-group-item'><b>Publisher: {publisher}</b></li>
          <li className='list-group-item'><b>First Appearance: {first_appearance}</b></li>
        </ul>

        <div className='animate__animated animate__fadeInUp'>
          <h5 className='mt-3'>Characters</h5>
          <p>{characters}</p>
          <button className='btn btn-outline-info' onClick={handleReturn}>
            Regresar
          </button>
        </div>

      </div>
    </div>
  );
};
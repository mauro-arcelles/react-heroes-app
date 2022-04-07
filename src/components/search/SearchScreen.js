import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { HeroCard } from '../hero/HeroCard';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../selectors/getHeroesByName';
import { useMemo } from 'react';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;
  const heroeFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Búsquedas</h1>
      <hr />
      <div className='row'>
        <div className='col-md-5'>

          <h4>Buscar</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input
              type='text'
              placeholder='Buscar un heroe'
              className='form-control'
              name='searchText'
              autoComplete='off'
              value={searchText}
              onChange={handleInputChange}
            />

            <button type='submit' className='btn btn-outline-primary mt-1'>
              Buscar
            </button>

          </form>

        </div>

        <div className='col-7'>
          <h4>Resultados</h4>
          <hr />

          {
            (q === '')
              ? (
                <div className='alert alert-info'>
                  Busca un heroe
                </div>
              )

              : (heroeFiltered.length === 0) && (
                <div className='alert alert-danger'>
                  No hay resultados: {q}
                </div>
              )
          }

          {
            heroeFiltered.map(heroe => (
              <HeroCard key={heroe.id} {...heroe} />
            ))
          }

        </div>
      </div>
    </>
  );
};
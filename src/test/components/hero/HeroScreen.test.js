import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HeroScreen } from '../../../components/hero/HeroScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Pruebas en <HeroScreen />', () => {

  test('No debe de mostrar el HeroScreen si no hay un heroe en el url', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <Routes>
          <Route path='/hero' element={<HeroScreen />} />
          <Route path='/' element={<h1>No Hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find('h1').text()).toBe('No Hero Page');


  });

  test('debe de mostrar un heroe si el parametro existe y se encuentra', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Routes>
          <Route path='/hero/:heroeId' element={<HeroScreen />} />
          <Route path='/' element={<h1>No Hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find('.row').exists()).toBe(true);


  });

  test('debe de regresar a la pantalla anterior', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Routes>
          <Route path='/hero/:heroeId' element={<HeroScreen />} />
        </Routes>
      </MemoryRouter>
    );

    wrapper.find('.btn').simulate('click');

    expect(mockNavigate).toHaveBeenCalledWith(-1);

  });


  test('debe de mostrar el No Hero Page si no tenemos un heroe', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider123123']}>
        <Routes>
          <Route path='/hero/:heroeId' element={<HeroScreen />} />
          <Route path='/' element={<h1>No Hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find('h1').text()).toBe('No Hero Page');


  });
});
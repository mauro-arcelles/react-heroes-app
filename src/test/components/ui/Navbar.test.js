import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


describe('Pruebas en <Navbar />', () => {

  const contextValue = {
    user: {
      name: 'Juan',
      logged: true
    },
    dispatch: jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>
    </AuthContext.Provider>
  );


  test('debe de mostrarse correctamente', () => {

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe(contextValue.user.name);


  });

  test('debe de llamar el logout, llamar el navigate y el dispatch con los argumentos', () => {

    wrapper.find('button').simulate('click');

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout
    });

    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      replace: true
    });


  });


});
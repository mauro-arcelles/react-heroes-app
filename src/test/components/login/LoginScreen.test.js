import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Pruebas en <LoginScreen />', () => {

  const contextValue = {
    user: {
      logged: false
    },
    dispatch: jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={['/']}>
        <LoginScreen />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('debe de hacer match con el snapchot', () => {

    expect(wrapper).toMatchSnapshot();

  });

  test('debe de realizar el dispatch y la navegacion', () => {

    const handleClick = wrapper.find('button').prop('onClick');
    handleClick();

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: { name: 'Adrian' }
    });

    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });

    localStorage.setItem('lastPath', '/dc');

    handleClick();

    expect(mockNavigate).toHaveBeenCalledWith('/dc', { replace: true });

  });

});
import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {

  test('debe de retornar el estado por defecto', () => {

    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });

  });

  test('debe de autenticar y colocar el "name" del usuario', () => {

    const state = authReducer({ logged: false }, { type: types.login, payload: { name: 'Juan' } });
    expect(state).toEqual({ logged: true, name: 'Juan' });

  });

  test('debe de borrar el name del usuario y logger en false', () => {

    const state = authReducer({ logged: true, name: 'Juan' }, { type: types.logout });
    expect(state).toEqual({ logged: false });

  });



});
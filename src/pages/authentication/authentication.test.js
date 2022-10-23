import renderer from 'react-test-renderer';
import Authentication from './authentication';

it('Authentication page rendered correctly', ()=>{
    const authPage=renderer.create(
            <Authentication/>
        ).toJSON();
      expect(authPage).toMatchSnapshot();
});
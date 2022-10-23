import renderer from 'react-test-renderer';
import HomePage from './homepage.component';

it('Home page rendered correctly', ()=>{
    const homePage=renderer.create(
            <HomePage/>
        ).toJSON();
      expect(homePage).toMatchSnapshot();
});
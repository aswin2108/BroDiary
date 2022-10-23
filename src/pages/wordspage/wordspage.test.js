import renderer from 'react-test-renderer';
import WordsPage from './wordspage.component';

it('Words page rendered correctly', ()=>{
    const wordsPage=renderer.create(
            <WordsPage/>
        ).toJSON();
      expect(wordsPage).toMatchSnapshot();
});
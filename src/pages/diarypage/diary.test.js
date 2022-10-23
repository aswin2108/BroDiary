import renderer from 'react-test-renderer';
import DiaryPage from './diary.component';
import { MemoryRouter } from 'react-router-dom';

it('DiaryPage page rendered correctly', ()=>{
    const diarypage=renderer.create(
        <MemoryRouter>
            <DiaryPage/>
        </MemoryRouter>
        ).toJSON();
      expect(diarypage).toMatchSnapshot();
});
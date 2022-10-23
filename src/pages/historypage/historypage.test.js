import renderer from 'react-test-renderer';
import HistoryPage from './historyPage.component';

it("History page rendered properly", ()=>{
    const historyPage=renderer.create(
        <HistoryPage/>
    ).toJSON();
    expect(historyPage).toMatchSnapshot();
});
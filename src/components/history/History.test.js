import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import History from './history.component'

it('Card  rendered correctly', ()=>{
    const mockHistory=[
        {
            id: 2022-10-24,
            entry: 'I enjoying coding',
            possitive: 0.951200125,
            negative: 0.000000005,
            neutral: 0.000001462,
            mixed: 0.1500069
        }
    ];
    const cardComp=renderer.create(
        <MemoryRouter>
            <History props={mockHistory} />
        </MemoryRouter>
    ).toJSON();
    expect(cardComp).toMatchSnapshot();
});
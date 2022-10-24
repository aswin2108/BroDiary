import React from "react";
import { render} from "@testing-library/react";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DiaryForm from "./diary-form.component";


render(
    <MemoryRouter>
        <DiaryForm />
    </MemoryRouter>
    );
const dateinput= screen.getByLabelText('date')
const entryinput = screen.getByLabelText('entry')

test('renders form properly', ()=>{
    expect(dateinput).toBeInTheDocument();
    expect(dateinput).toHaveAttribute('type', 'date');
    expect(entryinput).toBeInTheDocument();
    expect(entryinput).toHaveAttribute('type', 'text');
});
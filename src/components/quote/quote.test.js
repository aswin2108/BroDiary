import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Quote from "./quote.component";

render(
    <MemoryRouter>
        <Quote />
    </MemoryRouter>
    );
const quote=screen.getByLabelText('quote')
const author=screen.getByLabelText('author')

test('quote is in the page', ()=>{
    expect(quote).toBeInTheDocument();
    expect(author).toBeInTheDocument();
})
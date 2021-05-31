// import React from 'react'
// import { render, fireEvent } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import LoginWrapper from './Login.wrapper';


// describe("LoginWrapper", () => {
//   describe("with valid inputs", () => {
//     it('calls the onSubmit function', async () => {
//       const mockOnSubmit = jest.fn()
//       const {getByLabelText, getByRole} = render(<LoginWrapper onSubmit={mockOnSubmit}/>)

//       await act(async () => {
//         fireEvent.change(getByLabelText("Email Address *"), {target: {value: "email@test.com"}})
//         fireEvent.change(getByLabelText("Password *"), {target: {value: "1234567"}})
//       })

//       await act(async () => {
//         fireEvent.click(getByRole("button"))
//       })

//       expect(mockOnSubmit).toHaveBeenCalled()
//     })
//   })

//   describe("with invalid email", () => {
//     it("renders the email validation error", async () => {
//       const {getByLabelText, container} = render(<LoginWrapper />)

//       await act(async () => {
//         const emailInput = getByLabelText("Email Address *")
//         fireEvent.change(emailInput, {target: {value: "invalid email"}})
//         fireEvent.blur(emailInput)
//       })

//       expect(container.innerHTML).toMatch("Email address badly formatted")
//     })
//   })

//   describe("with invalid password", () => {
//     it("renders the password validation error", async () => {
//       const {getByLabelText, container} = render(<LoginWrapper />)

//       await act(async () => {
//         const paswordInput = getByLabelText("Password *")
//         fireEvent.change(paswordInput, {target: {value: "123"}})
//         fireEvent.blur(paswordInput)
//       })

//       expect(container.innerHTML).toMatch("Minimun 6 characters required")

//     })
//   })
// })
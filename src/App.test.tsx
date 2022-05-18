import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import ListAddress from './pages/listAddress/ListAddress'
import SearchAddress from './pages/searchAddress/SearchAddress'

test('Renders home textbox fields', () => {
  render(<App />)

  const names = screen.getByLabelText(/Names/i)
  expect(names).toBeInTheDocument()

  const telephones = screen.getByLabelText(/Telephones/i)
  expect(telephones).toBeInTheDocument()
});

test('Fill home textbox fields', () => {
  render(<App />)

  const names = screen.getByLabelText(/Names/i)
  fireEvent.change(names, { target: { value: "Fran" } })
  const nameFinded = screen.getByDisplayValue("Fran")
  expect(nameFinded).toBeInTheDocument()

  const telephones = screen.getByLabelText(/Telephones/i)
  fireEvent.change(telephones, { target: { value: "02012345567" } })
  const telephoneFinded = screen.getByDisplayValue("02012345567")
  expect(telephoneFinded).toBeInTheDocument();
});

test('Validation Fields', () => {
  render(<App />)

  let names = screen.getByLabelText(/Names/i)
  fireEvent.change(names, { target: { value: "Fran55" } })

  let telephones = screen.getByLabelText(/Telephones/i)
  fireEvent.change(telephones, { target: { value: "1322282828" } })

  const saveButton = screen.getByRole('button', { name: /save/i })
  fireEvent.click(saveButton)

  const wrongName = screen.getByText(/The following names are not correct: Fran55/i)
  expect(wrongName).toBeInTheDocument()

  const wrongTelephone = screen.getByText(/The following telephones are not correct: 1322282828/i)
  expect(wrongTelephone).toBeInTheDocument()

  fireEvent.change(names, { target: { value: "Fran" } })
  fireEvent.change(telephones, { target: { value: "02012345567" } })

  fireEvent.click(saveButton)

  const successName = screen.queryByText(/The following names are not correct: Fran/i)
  expect(successName).not.toBeInTheDocument()

  const successTelephone = screen.queryByText(/The following telephones are not correct: 02012345567/i)
  expect(successTelephone).not.toBeInTheDocument()

  fireEvent.click(saveButton)

  const localStorageValue = JSON.parse(window.localStorage.getItem("addressList")!)
  const localStorageName = localStorageValue[0].name
  const localStorageTelephone = localStorageValue[0].telephone
  expect(localStorageName).toBe("Fran")
  expect(localStorageTelephone).toBe("02012345567")
});


test('Validation List', () => {
  render(<ListAddress />)

  window.localStorage.setItem("addressList", JSON.stringify([{ name: "Fran", telephone: "02012345567" }]))

  const nameFinded = screen.getByText("Fran")
  expect(nameFinded).toBeInTheDocument()

  const telephoneFinded = screen.getByText("02012345567")
  expect(telephoneFinded).toBeInTheDocument()
})

test('Validation Search', async () => {
  render(<SearchAddress />)

  window.localStorage.setItem("addressList", JSON.stringify([{ name: "Fran", telephone: "02012345567" }]))

  const searchButton = screen.getByRole('button', { name: /search/i })

  const searchByName = screen.getByPlaceholderText(/Search by name/i)
  fireEvent.change(searchByName, { target: { value: "Fr" } })
  fireEvent.click(searchButton)

  const nameFinded = screen.getByText(/Fran/i)
  expect(nameFinded).toBeInTheDocument()

  const telephoneFinded = screen.getByText(/02012345567/i)
  expect(telephoneFinded).toBeInTheDocument()

  const searchByTelephoneButton = screen.getByRole('button', { name: /telephone/i })
  fireEvent.click(searchByTelephoneButton)

  const searchByTelephone = screen.getByPlaceholderText(/Search by telephone/i)
  fireEvent.change(searchByTelephone, { target: { value: "02012345567" } })
  fireEvent.click(searchButton)

  expect(nameFinded).toBeInTheDocument()
  expect(telephoneFinded).toBeInTheDocument()

  const clearButton = screen.getByRole('button', { name: /clear/i })
  fireEvent.click(clearButton)
  const telephoneFindedSearch = screen.queryByText(/02012345567/i)
  expect(telephoneFindedSearch).not.toBeInTheDocument()
})
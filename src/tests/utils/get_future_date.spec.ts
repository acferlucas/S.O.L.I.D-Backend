import { test, expect } from "vitest";
import getFutureDate from "./get_future_date";

test('increases date with one year', () => {

  const year = new Date().getFullYear()

  expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(2023)
})
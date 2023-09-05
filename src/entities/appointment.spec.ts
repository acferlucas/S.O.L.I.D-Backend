
import { expect, test } from 'vitest'
import { Appointment } from './appointment'

test('create an appointment', () => {

  const startDate = new Date()
  const endDate = new Date()

  endDate.setDate(endDate.getDate() + 1)


  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt: startDate,
    endsAt: endDate,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toBe('John Doe')
})

test('cannot create an appointment with end date before start date', () => {
  const startDate = new Date()
  const endDate = new Date()

  endDate.setDate(endDate.getDate() - 1)


  expect(() => new Appointment({
    customer: 'John Doe',
    startsAt: startDate,
    endsAt: endDate,
  })).toThrow()

})

test('cannot create an appointment with start date before now', () => {
  const startDate = new Date()
  const endDate = new Date()

  startDate.setDate(startDate.getDate() - 1)
  endDate.setDate(endDate.getDate() - 100)

  expect(() => new Appointment({
    customer: 'John Doe',
    startsAt: startDate,
    endsAt: endDate,
  })).toThrow()

})
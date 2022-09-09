import { describe, it, expect } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointmentsreposositories";
import { CreateAppointment } from "./create-appointment";

describe("create an appointment", () => {
  it('should be able to create an appointment', () => {

    const appointmentsRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startDate = new Date()
    const endDate = new Date()

    endDate.setDate(endDate.getDate() + 1)


    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: startDate,
      endsAt: endDate
    })).resolves.toBeInstanceOf(Appointment)
  })
});

describe("create an appointment", () => {
  it('should not be able to create an appointment with overlapping dates', async () => {

    const appointmentsRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startDate = new Date()
    const endDate = new Date()

    endDate.setDate(endDate.getDate() + 5)

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt: startDate,
      endsAt: endDate
    })

    const conflictingStartDate = new Date()
    const conflictingEndDate = new Date()

    conflictingStartDate.setDate(conflictingEndDate.getDate() + 2)
    conflictingEndDate.setDate(conflictingEndDate.getDate() + 5)


    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: conflictingStartDate,
      endsAt: conflictingEndDate
    })).rejects.toBeInstanceOf(Error)
  })
});
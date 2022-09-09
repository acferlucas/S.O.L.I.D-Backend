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
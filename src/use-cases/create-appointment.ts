import { Appointment } from '../entities/appointment'
import { AppointmentsRepository } from '../repositories/appointments-repository';

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;


export class CreateAppointment {

  constructor(
    private appointmentsRepository: AppointmentsRepository,
  ) { }

  async execute(req: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {

    const overlappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(req.startsAt, req.endsAt)

    if (overlappingAppointment) {
      throw new Error('Overlapping appointment')
    }

    const appointment = new Appointment(req)

    await this.appointmentsRepository.create(appointment)

    return appointment

  }
}
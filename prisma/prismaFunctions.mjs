/////////////////////////
// ESSENTIALS

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createHospital(name, address, phone) {
  const newHospital = await prisma.hospital.create({
    data: {
      name: name,
      address: address,
      phone: phone
    }
  })
  return newHospital
}

export async function getAllHospitals(){
  const resultPackage = await prisma.hospital.findMany({
  })
  return resultPackage
}

export async function createUser(name, email, password, birthDate = new Date(), gender = "") {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        birthDate: birthDate,
        gender: gender
      }
    })
    return newUser
}
export async function findUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    return user;
}
  
export async function createDoctor(specialty, userId) {
  const newDoctor = await prisma.doctor.create({
    data: {
      specialty: specialty,
      user: {
        connect: { id: userId }
      }
    }
  })
  return newDoctor
}
  
export async function createPatient(dateOfBirth, userId) {
  const newPatient = await prisma.patient.create({
    data: {
      dateOfBirth: dateOfBirth,
      user: {
        connect: { id: userId }
      }
    }
  })
  return newPatient
}
  
export async function createAppointment(date, reason, doctorId, patientId) {
  const newAppointment = await prisma.appointment.create({
    data: {
      date: date,
      reason: reason,
      doctor: {
        connect: { id: doctorId }
      },
      patient: {
        connect: { id: patientId }
      }
    }
  })
  return newAppointment
}

export async function createPrescription(name, dosage, instructions, doctorId, patientId, appointmentId) {
    const newPrescription = await prisma.prescription.create({
      data: {
        name: name,
        dosage: dosage,
        instructions: instructions,
        doctorId: doctorId,
        patientId: patientId,
        appointment: {
          connect: { id: appointmentId }
        }
      }
    })
    return newPrescription
}

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

export async function getAllDoctorsBySpecialtyAndHospitalId(specialty,hospitalId){
  const resultPackage = await prisma.doctor.findMany({
    select: {
      specialty: true,
      user: {
        select: {
          name: true,
          email: true,
        }
      }
    },
    where: {
      specialty: specialty,
      hospitals: {
        some: {
          id: hospitalId
        }
      }
    }
  })
  return(resultPackage)
}

export async function getAllAppointmentsLiteByDoctorId(doctorId){
  const resultPackage = await prisma.appointment.findMany({
    where: {
      doctorId: doctorId
    },
    select: {
      id: true,
      date: true,
      doctorId: true,
      hospitalId: true
    }
  })
  return resultPackage
}


export async function getAllDoctorsByHospitals(){
  const resultPackage = await prisma.hospital.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      phone: true,
      doctors: {
        select: {
          id: true,
          specialty: true,
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }
    }
  })
  return resultPackage
}

export async function getDoctorDataLiteById(doctorId) {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId
    },
    select: {
      id: true,
      specialty: true,
      user: {
        select: {
          name: true,
          email: true,
          birthDate: true,
          gender: true,
        }
      }
    }
  })
  return(doctor)
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
  
export async function createAppointment(date, reason, doctorId, patientId, hospitalId) {
  const newAppointment = await prisma.appointment.create({
    data: {
      date: date,
      reason: reason,
      hospitalId: hospitalId,
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

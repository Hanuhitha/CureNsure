export class AppointmentStatus {
    static BOOKED = "Booked";
    static CONFIRMED = "Confirmed";
    static ACCEPTED = "Accepted";
    static ATTENDED = "Attended";
    static CLOSED = "Closed";
    static CANCELLED = "Cancelled";
    static RESCHEDULED ="Rescheduled";
}


export class MedexDoctor {
    doctorId?: string;
    fullName?: string;
    email?: string
    phone?: string;
    registrationId?: string;
    specialities?: string[];
    shortBio?: string;
    gender?: Gender
    qualification?: string;
    dp?: string;         
    practiceStartDate?: number;
    isDeleted?: boolean;
    projects?: string[];
    avgConsultationTime?: number;
    resourceCenter?: string;
  }
class Gender {
    static MALE = "Male";
    static FEMALE = "Female";
}

class Priority {
    static HIGH = "High";
    static NORMAL = "Normal";
    static LOW = "Low";
}

  
class PatientInfo {
    patientId?: string;
    firstName?: string;
    lastName?: string;
    dobInEpoch?: number;
    gender?: Gender;
    email?: string;
    phone?: string;
    pin?: number;
    dp?: string;
}

class BookedBy {
    static SELF = "Self";
    static COARDINATOR = "Coordinator";
    static PARAMEDIC = "Paramedic";
}

export class Note {
    note?: string;
    addedBy?: string;
    role?: string;
}

export class CommunicationChannel {
    static VIDEO = "Video";
    static VOICE = "Voice";
    static EMAIL = "Email";
}


export class MedeAppointmentFeedback {
    rating?: number;
    feedback?: string;
    givenBy?: string;
    role?: string;
}

export class Report {
    name?: string;
    date?: number;
    link?: string;
}

class ParamedicInfo {
    paramedicId?: string;
    name?: string;
    centerId?: string;
}


class Prescription{
    prescriptionUrl?:string;
}

export class BookingType {
    static IMMEDIATE = "IMMEDIATE";
    static SCHEDULED = "SCHEDULED";
  }
export class MedeAppointment {
    appointmentId?: string;
    appointmentDisplayId?: string;
    
    patientInfo?: PatientInfo;
    doctorInfo?: MedexDoctor;
    paramedicInfo?: ParamedicInfo;

    casesheetInfo?: any;
     prescription?:Prescription;
    priority?: Priority;
    consultCategory?:string;

    bookedBy?: BookedBy;

    reason?: string;

    notes?: Note[];

    trends?: any;

    communicationChannel?: CommunicationChannel;

    consultationTime?: number;

    scheduledAt?: number;
    bookedAt?: number;
    attendedAt?: number;
    closedAt?: number;
    bookingType?: BookingType;
    feedback?: MedeAppointmentFeedback[];
    reports?: Report[];

    status?: AppointmentStatus;

    token?: string;
    requestedSpeciality?: string;
    appointmentType?: string;

}

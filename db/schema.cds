namespace hospital;

entity Patients {
  key ID            : UUID;
  firstName         : String(80);
  lastName          : String(80);
  dateOfBirth       : Date;
  gender            : String(10);        
  phone             : String(20);
  email             : String(100);
  address           : String(255);
  createdAt         : Timestamp;
  modifiedAt        : Timestamp;
}

entity Doctors {
  key ID            : UUID;
  firstName         : String(80);
  lastName          : String(80);
  specialization    : String(100);       
  phone             : String(20);
  email             : String(100);
  yearsOfExperience : Integer;
  createdAt         : Timestamp;
  modifiedAt        : Timestamp;
}

entity Appointments {
  key ID            : UUID;
  patient           : Association to Patients;
  doctor            : Association to Doctors;
  appointmentDate   : DateTime;
  reason            : String(255);       
  status            : String(20);        // Scheduled, Completed, Cancelled, NoShow
  createdAt         : Timestamp;
  modifiedAt        : Timestamp;
}

entity Prescriptions {
  key ID            : UUID;
  appointment       : Association to Appointments;
  medicineName      : String(100);
  dosage            : String(50);        
  durationDays      : Integer;
  notes             : String(255);
  createdAt         : Timestamp;
}

entity Bills {
  key ID            : UUID;
  appointment       : Association to Appointments;
  amount            : Decimal(10,2);
  paid              : Boolean default false;
  paymentDate       : Date;
  paymentMethod     : String(30);        
  createdAt         : Timestamp;
}

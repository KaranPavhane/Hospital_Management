using {hospital as my} from '../db/schema';

service HospitalService {
  entity Patients as projection on my.Patients;
  entity Doctors as projection on my.Doctors;
  entity Appointments as projection on my.Appointments;
  entity Prescriptions as projection on my.Prescriptions;
  entity Bills as projection on my.Bills;
}

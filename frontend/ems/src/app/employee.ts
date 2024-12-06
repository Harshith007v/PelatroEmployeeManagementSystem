import { Department } from './department';

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  emailId: string;
  role: string;
  department: Department;
  profilePicture: string | File | null;
  profilePicturePath: string;
  phone: string;
  joiningDate: string;
}

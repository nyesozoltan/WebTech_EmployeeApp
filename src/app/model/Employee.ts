export class Employee {
    employeeId: string;
    employeeName: string;    
    emailId: string;
    department: string;    
    gender: 'Férfi' | 'Nő' | 'Egyéb';    
    birthDate: Date;

    constructor() {
        this.employeeId = '';    
        this.employeeName = '';        
        this.emailId = '';   
        this.department = ''; 
        this.gender = 'Egyéb';        
        this.birthDate = new Date();
    }
  }
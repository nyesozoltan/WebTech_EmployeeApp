import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Employee } from "../model/employee";
import { Observable, tap } from "rxjs";

const STORAGE_KEY = 'employees';

@Injectable({providedIn: 'root'})
export class EmployeeService {
    http = inject(HttpClient);

    private employees: Employee[] = [];
    private readonly localStorageKey = 'employees';

    loadInitialEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>('employees.json').pipe(tap((data: Employee[]) => this.employees = data));
    };

    loadEmployees(): Employee[] {
        const storedEmployees = localStorage.getItem(this.localStorageKey);
        if(storedEmployees) {
            this.employees = JSON.parse(storedEmployees);
        }
        return this.employees;
    };

    getAllEmployees() {
        return this.employees;  
    };

    getEmployeeById(id: string) {
        return this.employees.find((employee) => employee.employeeId === id);
    };
    
    addEmployee(employee: Employee) {
        this.employees.push(employee);
        this.saveEmployeesToLocalStorage();
    };
    

    updateEmployee(employee: Employee) {
        const index = this.employees.findIndex(e => e.employeeId === employee.employeeId);
        if (index !== -1) {
          this.employees[index] = employee;
          this.saveEmployeesToLocalStorage();
          
        }
      }

    deleteEmployee(id: string) {
        const index = this.employees.findIndex((employee) => employee.employeeId === id);
        if (index !== -1) {
            this.employees.splice(index, 1);
            this.saveEmployeesToLocalStorage();
        }
    };

    private saveEmployeesToLocalStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.employees));
    };
}
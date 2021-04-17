const Employee = require('../lib/Employee');

test('creates an Employee', () => {
    const employee = new Employee('Bob', 1, 'bob@email.com')

    expect(employee.name).toBe("Bob")
    expect(employee.email).toBe("bob@email.com")
    expect(employee.id).toBe(1)    
})
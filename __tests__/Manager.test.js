const Manager = require('../lib/Manager');

test('creates new manager', () => {
    const manager = new Manager("Sandra", 9, "sandra@email.com", "Manager", 100)

    expect(manager.name).toBe("Sandra")
    expect(manager.id).toBe(9)
    expect(manager.role).toBe("Manager")
    expect(manager.officeNumber).toBe(100)
})
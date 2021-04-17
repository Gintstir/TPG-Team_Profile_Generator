const Engineer = require('../lib/Engineer');

test('creates an engineer', () => {
    const engineer = new Engineer("John", 2, "john@email.com", "Engineer", "gintstir" )

    expect(engineer.name).toBe("John")
    expect(engineer.id).toBe(2)
    expect(engineer.role).toBe("Engineer")
    expect(engineer.github).toBe("gintstir")
})
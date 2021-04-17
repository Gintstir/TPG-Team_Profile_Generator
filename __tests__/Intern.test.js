const Intern = require('../lib/Intern');

test('creates an intern', () => {
    const intern = new Intern("Sam", 3, "sam@email.com", "Intern", "Temple");

    expect(intern.name).toBe("Sam")
    expect(intern.id).toBe(3)
    expect(intern.email).toBe("sam@email.com")
    expect(intern.role).toBe("Intern")
    expect(intern.school).toBe("Temple")
})
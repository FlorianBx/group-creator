Alpine.data('personInput', () => ({
  newPerson: '',

  submit() {
    if (this.newPerson.trim()) {
      Alpine.store('groups').addPerson(this.newPerson)
      this.newPerson = ''
    }
  },

  importJSON() {
    try {
      const input = JSON.parse(this.newPerson)
      if (Array.isArray(input)) {
        input.forEach((person) => Alpine.store('groups').addPerson(person))
        this.newPerson = ''
      }
    } catch (e) {
      Alpine.store('groups').error = 'Format JSON invalide'
    }
  },
}))

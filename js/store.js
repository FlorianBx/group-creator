Alpine.store('groups', {
  people: [],
  groups: [],
  error: '',

  addPerson(person) {
    this.people.push(person.trim())
  },

  removePerson(index) {
    this.people.splice(index, 1)
  },

  createGroups(size) {
    if (this.people.length === 0) {
      this.error = 'Veuillez ajouter des personnes à la liste'
      return
    }

    if (this.groupSize <= 0) {
      this.error = 'La taille des groupes doit être positive'
      return
    }

    // Mélanger la liste
    const shuffled = [...this.people].sort(() => Math.random() - 0.5)

    // Calculer le nombre de groupes optimal
    const numGroups = Math.ceil(shuffled.length / this.groupSize)

    // Créer les groupes
    this.groups = Array.from({ length: numGroups }, () => [])

    shuffled.forEach((person, index) => {
      const groupIndex = index % numGroups
      this.groups[groupIndex].push(person)
    })

    this.error = ''
  },
})

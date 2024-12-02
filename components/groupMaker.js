export const groupMaker = () => ({
  people: [],
  newPerson: '',
  groupSize: 4,
  groups: [],
  error: '',

  addPerson() {
    const trimmedPerson = this.newPerson.trim()
    if (!trimmedPerson) {
      this.error = 'Please enter a valid name'
      return
    }

    if (this.people.includes(trimmedPerson)) {
      this.error = 'This person is already in the list'
      return
    }

    this.people.push(trimmedPerson)
    this.newPerson = ''
    this.error = ''
  },

  removePerson(index) {
    this.people.splice(index, 1)
    this.error = ''
  },

  createGroups() {
    // Input validation
    if (this.people.length === 0) {
      this.error = 'Please add people to the list first'
      return
    }

    if (this.groupSize <= 0) {
      this.error = 'Group size must be positive'
      return
    }

    try {
      const shuffled = [...this.people].sort(() => Math.random() - 0.5)

      const numGroups = Math.ceil(shuffled.length / this.groupSize)

      // Create and populate groups
      this.groups = Array.from({ length: numGroups }, () => [])
      shuffled.forEach((person, index) => {
        const groupIndex = index % numGroups
        this.groups[groupIndex].push(person)
      })

      this.error = ''

      this.$nextTick(() => {
        const target = document.querySelector('#list')
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      })
    } catch (e) {
      this.error = 'An error occurred while creating groups'
      console.error('Error creating groups:', e)
    }
  },

  loadSeptember2024() {
    this.people = [
      'Vania GONCALVES',
      'Mathieu BOURDIER',
      'Calista VOLGET',
      'Yacine DAHMOUN',
      'Cherif GUEYE',
      'Erwan LE GOFF',
      'Denis DECHAMBRE',
      'Abdelkrim BECHIR',
      'Anis MERABTENE',
      'Mike GERLINGER',
      'Steven SU',
      'Mohamed EL AKROUCHE',
      'Toufik ELSHAKH',
      'Jason Natanael Arisa RAJAONARIMANANA',
      'Lucas MACHARD',
      'Harold BUSSON',
      'Liliane LANDAU',
      'Arnaud SIMONARD',
      'Linda DEBOU',
    ]
  },

  importJSON() {
    try {
      const input = JSON.parse(this.newPerson)

      if (!Array.isArray(input)) {
        this.error = 'JSON format must be an array of names'
        return
      }

      if (!input.every((item) => typeof item === 'string' && item.trim())) {
        this.error = 'All elements must be non-empty strings'
        return
      }

      // Import data
      this.people = input
      this.newPerson = ''
      this.error = ''
    } catch (e) {
      this.error = 'Invalid JSON format'
      console.error('JSON import error:', e)
    }
  },
})

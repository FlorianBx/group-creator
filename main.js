import './css/style.css'
import Alpine from 'alpinejs'
import { groupMaker } from './components/groupMaker'

Alpine.data('groupMaker', groupMaker)

window.Alpine = Alpine
Alpine.start()

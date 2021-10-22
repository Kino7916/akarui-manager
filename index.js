const d = require('./librarby/Panel/Main').default
const panel = new d()

panel.listen(3000, () => console.log('Tem logging'))

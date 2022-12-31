import { Node } from 'src/app/tree/models/node'
import { User } from './user'

describe('User', () => {
  let user: User

  beforeEach(() => {
    user = new User({
      id: 1,
      residence: 'Via G. Verdi, 22',
      role: {
        id: 1,
        name: 'standard',
      },
      node: {
        id: 1,
        firstname: 'Pasquale',
        lastname: 'Cafiero',
        birthdate: new Date('1953-11-09').toString(),
        birthplace: 'Poggioreale',
        sex: 'MALE',
        documents: []
      },
    })
  })

  it('Should be created', () => {
    expect(user).toBeDefined()
  })

  it('Should insert a node in the user tree', () => {
    const nodes = new Set<Node>()
    const node = new Node({
      id: 2,
      documents: []
    })
    nodes.add(node)
    user.addNode(node)
    expect(user.getNodes()).toEqual(nodes)
  })

  it('Should modify a certain node in the user tree', () => {
    const node = new Node({
      id: 2,
      documents: []
    })
    user.addNode(node)
    user.modifyNode(
      2,
      new Node({
        id: 2,
        firstname: 'Gennaro',
        documents: []
      }),
    )
    for (const node of user.tree) {
      if (node.id == 2) {
        expect(node.firstname).toBe('Gennaro')
      }
    }
  })

  it('Should not modify a non existing node of the user tree', () => {
    try {
      user.modifyNode(
        2,
        new Node({
          id: 2,
          firstname: 'Gennaro',
          documents: []
        }),
      )
    } catch(err) {
      expect(err).toBeDefined();
    }
  })

  it('Should delete a certain node in the user tree', () => {
    const child = new Node({
      id: 3,
      fatherId: 2,
      motherId: 4
    })
    const father = new Node({
      id: 2,
      documents: []
    })
    const mother = new Node({
      id: 4,
      documents: []
    })
    user.addNode(child)
    user.addNode(father)
    user.addNode(mother)
    user.deleteNode(2)
    user.deleteNode(4)
    expect(user.tree.has(mother)).toBeFalse()
    expect(user.tree.has(father)).toBeFalse()
    expect(child.fatherId).toBeUndefined();
    expect(child.motherId).toBeUndefined();
  })

  it('Should not delete a non existing node of the user tree', () => {
    try {
      user.deleteNode(2)
    } catch(err) {
      expect(err).toBeDefined();
    }
  })

})

import { Document, IDocument } from 'src/app/document/models/document'

export interface INode {
  id?: number
  firstname?: string
  lastname?: string
  sex?: 'MALE' | 'FEMALE'
  birthplace?: string
  deathplace?: string
  birthdate?: string | Date | null
  deathdate?: string | Date | null
  fatherId?: number
  motherId?: number
  ownerId?: number
  documents?: Set<IDocument> | IDocument[]
  motherHasChildren?: { connect: { id: number } }
  fatherHasChildren?: { connect: { id: number } }
}

export class Node implements INode {
  public readonly id?: number
  public firstname?: string
  public lastname?: string
  public sex?: 'MALE' | 'FEMALE'
  public birthplace?: string
  public deathplace?: string
  public birthdate?: Date | null
  public deathdate?: Date | null
  public fatherId?: number
  public motherId?: number
  public ownerId?: number
  public documents: Set<Document> = new Set()
  public motherHasChildren?: { connect: { id: number } }
  public fatherHasChildren?: { connect: { id: number } }

  public constructor(node: INode) {
    this.id = node.id
    this.firstname = node.firstname
    this.lastname = node.lastname
    this.sex = node.sex
    this.birthplace = node.birthplace
    this.deathplace = node.deathplace
    this.birthdate = node.birthdate ? new Date(node.birthdate) : null
    this.deathdate = node.deathdate ? new Date(node.deathdate) : null
    this.fatherId = node.fatherId
    this.motherId = node.motherId
    this.ownerId = node.ownerId
    if (node.documents) {
      this.documents = new Set(
        (node.documents as Document[]).map((d) => new Document(d)),
      )
    }
    this.motherHasChildren = node.motherHasChildren
    this.fatherHasChildren = node.fatherHasChildren
  }

  public bindDocument(document: Document) {
    this.documents!.add(document)
  }

  public unbindDocument(id: number) {
    for (const document of this.documents!) {
      if (document.id == id) {
        this.documents!.delete(document)
        return
      }
    }
    throw new Error("Node doesn't contain a document with id " + id)
  }
}

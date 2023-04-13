import '@starlightcms/react-sdk'
import {
  MediaField,
  RelationField,
  VisualField,
  Collection,
  StringField,
  BooleanField,
} from '@starlightcms/react-sdk'

export type Home = {
  logo: MediaField
  slogan: StringField
}

export type Book = {
  cover_picture: MediaField
  excerpt: VisualField
  is_available: BooleanField
  isbn: StringField
  slug: StringField
  title: StringField
}

export type Magazine = {
  cover_picture: MediaField
  is_available: BooleanField
  issue_number: StringField
  excerpt: VisualField
  month: StringField
  year: StringField
  slug: StringField
  title: StringField
}

export type Newspaper = {
  logo: MediaField
  slug: StringField
  title: StringField
}

export type Publication = {
  excerpt: VisualField
  is_available: BooleanField
  newspaper: RelationField<Entry<Newspaper>>
  slug: StringField
  title: StringField
  year: StringField
}

export type Disk = {
  cover_picture: MediaField
  excerpt: VisualField
  is_available: BooleanField
  slug: StringField
  title: StringField
}

declare module '@starlightcms/react-sdk' {
  export interface DefaultModelDefinition {
    books: Book
    magazines: Magazine
    newspapers: Newspaper
    publications: Publication
    disks: Disk
  }
}

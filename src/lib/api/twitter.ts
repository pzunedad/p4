export type Auth = { 
  username: string,
  email: string,
  password: string
}

export type Post = {
    id: string,
    like: boolean,
    retweet: boolean,
    comment: string,
    contenido: string
}

export type Profile = {
    id: string,
    follow: string
}
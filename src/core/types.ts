export type UserProps = {
    email: string | undefined,
    isAdmin?: boolean,
    roles?: ['ROLE_ADMIN', 'ROLE_USER']
    token?: string | null | undefined,
}

export type CarProps = {
    id: number,
    image: string,
    name: string,
    price: number
}
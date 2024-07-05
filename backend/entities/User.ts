export class User {
    constructor(
        public readonly _id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly createdAt: Date,
        public readonly phoneNumber: string
    ) {

    }
}
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
    userId: string;
    name: string;
    rewardPoints: number;
    email: string;
}

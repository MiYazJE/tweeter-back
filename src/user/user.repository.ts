import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { SignupDto } from 'src/auth/dto/auth.dto';

export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  getByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  getByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  create(user: SignupDto): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}

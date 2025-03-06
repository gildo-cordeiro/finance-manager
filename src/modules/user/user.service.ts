import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../modules/user/user.entity';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger(UserService.name);

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    var foundUser = await this.findByEmail(user.email);
    if (foundUser) {
      const message = `User with email ${user.email} already exists`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }
    
    const newUser = await this.userRepository.save(user);
    this.logger.log(`User with ${user.email} and id ${newUser.id} created`);
    return newUser;
  }

  async updatePassword(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      const message = `User with email ${email} not found`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    user.password = password;
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({where : {id}});
  }
}

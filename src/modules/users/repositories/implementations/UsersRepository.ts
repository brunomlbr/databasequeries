import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOne({
      where: { id: user_id },
      relations: ["games"],
    });
    console.log(user);
    if (!user) {
      throw new Error("Erro");
    }
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("SELECT * FROM users ORDER BY first_name ASC"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const first_name_lower = first_name.toLowerCase();
    const last_name_lower = last_name.toLowerCase();

    return this.repository.query(
      `SELECT * FROM users WHERE LOWER(first_name) = '${first_name_lower}' AND LOWER(last_name) = '${last_name_lower}'`
    ); // Complete usando raw query
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createScore(_name: string, score: number): Promise<Score> {
    const newScore = this.scoreRepository.create({ name: _name, score });
    return this.scoreRepository.save(newScore);
  }

  async getTopScores(limit: number = 10): Promise<Score[]> {
    return this.scoreRepository.find({
      order: { score: 'DESC' },
      take: limit,
      relations: ['user'],
    });
  }
}

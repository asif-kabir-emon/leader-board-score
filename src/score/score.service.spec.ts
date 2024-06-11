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

  async createScore(userId: number, value: number): Promise<Score> {
    const score = new Score();
    score.user = { id: userId } as any;
    score.value = value;
    return this.scoreRepository.save(score);
  }

  async getTopScores(limit: number = 10): Promise<Score[]> {
    return this.scoreRepository.find({
      order: { value: 'DESC' },
      take: limit,
      relations: ['user'],
    });
  }
}

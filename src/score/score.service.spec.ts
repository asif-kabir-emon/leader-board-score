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

  async createScore(name: string, score: number): Promise<Score> {
    return this.scoreRepository.save({ name, score: score });
  }

  async getTopScores(limit: number = 10): Promise<Score[]> {
    return this.scoreRepository.find({
      order: { score: 'DESC' },
      take: limit,
      relations: ['user'],
    });
  }
}

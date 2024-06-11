import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Request } from 'express';

@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() body: { name: string; score: number },
  ) {
    return this.scoreService.createScore(body.name, body.score);
  }

  @Get('leaderboard')
  async leaderboard() {
    return this.scoreService.getTopScores();
  }
}

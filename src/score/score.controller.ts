import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ScoreService } from './score.service';
import { Request } from 'express';

@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() body: { value: number }) {
    const user = req.user as any;
    return this.scoreService.createScore(user.id, body.value);
  }

  @Get('leaderboard')
  async leaderboard() {
    return this.scoreService.getTopScores();
  }
}

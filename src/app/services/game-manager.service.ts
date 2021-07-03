import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  constructor() { }

  private currentDifficulty = GameDifficulty.UNKNOWN
  private currentScore = 0

  public setDifficultyById(id: number): void {
    switch(id) {
      case 0:
        this.currentDifficulty = GameDifficulty.REGULAR
        break
      case 1:
        this.currentDifficulty = GameDifficulty.HARD
        break
      case 2:
        this.currentDifficulty = GameDifficulty.HARDER
        break
      default:
        this.currentDifficulty = GameDifficulty.UNKNOWN
    }
  }

  get gameDifficulty(): GameDifficulty {
    return this.currentDifficulty
  }

  public addToScore(type: BugType): void {
    if (type === BugType.BUG) this.currentScore += 1
    else if (type === BugType.SHINY) this.currentScore += 5
    else if (type === BugType.FEATURE) this.currentScore -= 5
  }

  get gameScore(): number {
    return this.currentScore * 1000
  }

  public clearGameState(): void {
    this.currentDifficulty = GameDifficulty.UNKNOWN
    this.currentScore = 0
  }

}

export const enum BugType {
  BUG,
  SHINY,
  FEATURE
}

export const enum GameDifficulty {
  REGULAR,
  HARD,
  HARDER,
  UNKNOWN
}
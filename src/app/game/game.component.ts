import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BugType, GameDifficulty, GameManagerService } from '../services/game-manager.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  constructor(
    private manager: GameManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.manager.gameDifficulty === GameDifficulty.UNKNOWN) {
      this.router.navigateByUrl("/")
    }
  }

  ngAfterViewInit(): void {
    document.documentElement.style.setProperty("--board-size", this.boardSize.toString())
  }

  get points(): number {
    return this.manager.gameScore
  }

  get boardSize(): number {
    switch(this.manager.gameDifficulty) {
      case GameDifficulty.REGULAR:
        return 3
      case GameDifficulty.HARD:
        return 4
      case GameDifficulty.HARDER:
        return 5
      default:
        return 0
    } 
  }

  onQuitClick(): void {
    this.router.navigateByUrl("/")
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameDifficulty, GameManagerService } from '../services/game-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private manager: GameManagerService
  ) { }

  ngOnInit(): void {
  }

  onDifficultySelect(id: number): void {
    const buttonList = document.querySelectorAll("button")
    buttonList.forEach((button, index) => {
      if (index === id) button.classList.add("selected")
      else button.classList.remove("selected")
    })
    this.manager.setDifficultyById(id)
  }

  onStartClick() {
    if (this.manager.gameDifficulty === GameDifficulty.UNKNOWN) {
      alert("Please select a difficulty first!")
    } else {
      this.router.navigateByUrl("/game")
    }
  }

}

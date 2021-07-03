import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { BugType, GameDifficulty, GameManagerService } from '../services/game-manager.service';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent implements OnInit, AfterViewInit {
  @Input() bugId!: number
  isHidden = false
  bugType = BugType.BUG
  bugElem!: HTMLElement
  hideTimeout!: any
  modifiers = {
    minHide: 0,
    maxHide: 0,
    minShow: 0,
    maxShow: 0,
    regularProb: 0,
    featureProb: 0
  }

  constructor(
    private manager: GameManagerService
  ) { }

  ngOnInit(): void {
    this.setModifiers()
    this.setBugType()
    this.setHideTimeout()
  }

  ngAfterViewInit(): void {
    this.bugElem = document.getElementById(this.bugId.toString())!!
    this.showBug()
  }

  private setBugType() {
    const rand = this.getRandom(1, 100)
    if (rand >= 1 && rand < this.modifiers.regularProb) {
      this.bugType = BugType.BUG
    } else if (rand >= this.modifiers.regularProb && rand <= (this.modifiers.featureProb + this.modifiers.regularProb)) {
      this.bugType = BugType.FEATURE
    } else {
      this.bugType = BugType.SHINY
    }
  }

  private showBug() {
    this.bugElem.style.cursor = "pointer"
    switch(this.bugType) {
      case BugType.SHINY:
        this.bugElem.style.fill = "gold"
        break
      case BugType.BUG:
        this.bugElem.style.fill = getComputedStyle(document.documentElement).getPropertyValue("--focus-color")
        break
      case BugType.FEATURE:
        this.bugElem.style.fill = "firebrick"
    }
    this.isHidden = false
  }

  private hideBug() {
    this.bugElem.style.cursor = "initial"
      this.bugElem.style.fill =
        getComputedStyle(document.documentElement).getPropertyValue("--background-color")
      this.isHidden = true
  }

  private setHideTimeout() {
    this.hideTimeout = setTimeout(() => {
      this.hideBug()
      this.setShowTimeout()
    }, this.getRandom(this.modifiers.minHide, this.modifiers.maxHide))
  }

  private setShowTimeout() {
    setTimeout(() => {
      this.setBugType()
      this.showBug()
      this.setHideTimeout()
    }, this.getRandom(this.modifiers.minShow, this.modifiers.maxShow))
  }

  private setModifiers() {
    if (this.manager.gameDifficulty === GameDifficulty.REGULAR) {
      this.modifiers.minHide = 3000
      this.modifiers.maxHide = 6000
      this.modifiers.minShow = 3000
      this.modifiers.maxShow = 5000
      this.modifiers.regularProb = 70
      this.modifiers.featureProb = 20
    }
    else if (this.manager.gameDifficulty === GameDifficulty.HARD) {
      this.modifiers.minHide = 2000
      this.modifiers.maxHide = 5000
      this.modifiers.minShow = 2000
      this.modifiers.maxShow = 4000
      this.modifiers.regularProb = 65
      this.modifiers.featureProb = 30
    }
    else if (this.manager.gameDifficulty === GameDifficulty.HARDER) {
      this.modifiers.minHide = 1000
      this.modifiers.maxHide = 4000
      this.modifiers.minShow = 1000
      this.modifiers.maxShow = 2500
      this.modifiers.regularProb = 60
      this.modifiers.featureProb = 38
    }
  }

  private getRandom(min: number, max: number): number {
    return Math.floor((Math.random() * max) + min)
  }

  onBugClick() {
    if (!this.isHidden) {
      this.hideBug()
      clearTimeout(this.hideTimeout)
      this.setShowTimeout()
      this.manager.addToScore(this.bugType)
    }
  }

}

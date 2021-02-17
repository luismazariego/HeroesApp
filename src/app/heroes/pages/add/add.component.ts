import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `],
})
export class AddComponent implements OnInit {
  publishers= [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      ).subscribe(hero => this.hero = hero);
    
  }
  
  save() {
    if (this.hero.superhero.trim().length < 1) {
      return;
    }

    if (this.hero.id) {
      this.heroesService.updateHero(this.hero)
        .subscribe(updatedHero => {
          this.router.navigate(['/heroes', updatedHero.id]);
        });
    } else {
      this.heroesService.addHero(this.hero)
        .subscribe(newHero => {
          this.router.navigate(['/heroes/edit', newHero.id])
        });
    }
  }
}

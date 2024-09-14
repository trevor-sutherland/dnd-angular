import { Component, Input } from '@angular/core';
import { Spell } from '../../interfaces/spell';

@Component({
  selector: 'app-spellinfo',
  standalone: true,
  imports: [],
  templateUrl: './spellinfo.component.html',
  styleUrl: './spellinfo.component.scss'
})
export class SpellInfoComponent 
{
  @Input() spell: Spell;
}

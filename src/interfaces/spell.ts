import { APILink } from "./apilink"

export interface Spell
{
    higher_level: number,
    index: string,
    name: string,
    desc: string[],
    range: string,
    components: string[],
    ritual: boolean,
    duration: string,
    concentration: boolean,
    casting_time: string,
    level: number,
    school: APILink,
    classes: APILink[],
    subclasses: APILink[],
    url: string
  }
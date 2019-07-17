import { Transformer } from './transformer';

export class Replacer {

  private transformer = new Transformer();

  replace(str: string, replacements: string[][], transformationOrder: string[]) {
    return replacements.reduce((rs, rss) => {
      const [o, n] = rss.map(_ => this.transformer.all(_));

      return transformationOrder.reduce((s, r) => s.replace(new RegExp(o[r], 'g'), n[r]), rs);
    }, str);
  }

}

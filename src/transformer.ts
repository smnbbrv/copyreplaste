const STRING_DASHERIZE_REGEXP = (/[ _]/g);
const STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);
const STRING_CAMELIZE_REGEXP = (/(-|_|\.|\s)+(.)?/g);
const STRING_UNDERSCORE_REGEXP_1 = (/([a-z\d])([A-Z]+)/g);
const STRING_UNDERSCORE_REGEXP_2 = (/-|\s+/g);

export class Transformer {

  dasherize(str: string) {
    return this.decamelize(str).replace(STRING_DASHERIZE_REGEXP, '-');
  }

  decamelize(str: string) {
    return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
  }

  camelize(str: string) {
    return str
      .replace(STRING_CAMELIZE_REGEXP, (_match, _separator, chr) => {
        return chr ? chr.toUpperCase() : '';
      }).replace(/^([A-Z])/, (match) => match.toLowerCase());
  }

  classify(str: string) {
    return str.split('.').map(part => this.capitalize(this.camelize(part))).join('.');
  }

  underscore(str: string) {
    return str
      .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
      .replace(STRING_UNDERSCORE_REGEXP_2, '_')
      .toLowerCase();
  }

  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }

  all(original: string) {
    return {
      original,
      dasherized: this.dasherize(original),
      decamelized: this.decamelize(original),
      camelized: this.camelize(original),
      classified: this.classify(original),
      underscored: this.underscore(original),
      capitalized: this.capitalize(original),
    };
  }

}

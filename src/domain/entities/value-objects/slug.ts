export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Receives a string and normalize it as a slug.
   * 
   * Example: "An example title" => "an-example-title"
   * 
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // remove todos espaços em branco por -
    .replace(/[^\w-]+/g, '') // remove todos caracteres especiais
    .replace(/_/g, '-') // substitui todos os _ por -
    .replace(/--+/g, '-') // substitui todos os -- por -
    .replace(/-$/g, '') // remove o - no final do slug

    return new Slug(slugText)
  }
}
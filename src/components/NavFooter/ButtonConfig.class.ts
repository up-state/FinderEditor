export class ButtonConfig {
  constructor(public name: string, public disabled: boolean = false, public listener: () => void) {}
}

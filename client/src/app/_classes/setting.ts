export class Setting {

  constructor(
      public name: string,
      public type: 'String' | 'Number' | 'Boolean',
      public prettyName = '',
      private cb?: (v?: any) => void
    ) { }

  public set(value: any) {
    localStorage.setItem(this.name, String(value));
    if (this.cb) {
        this.cb(value);
    }
  }

  public get() {

    const data = localStorage.getItem(this.name);

    if (this.type === 'Boolean') {

      return data === 'true';

    } else {

      // This is ok because this.type will always be "String", "Number" or "Boolean".
      // @ts-ignore
      return window[this.type](data);

    }

  }

}

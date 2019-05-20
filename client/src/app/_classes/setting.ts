export class Setting {

  constructor(
      public name: string,
      public type: 'String' | 'Number' | 'Boolean',
      public prettyName: string,
      public defaultValue: any,
      public description?: string,
      private cb?: (v?: any) => void
    ) { }

  public set(value: any) {

    if (this.type === 'Number') {

      const n = Number(value);
      localStorage.setItem(this.name, String(isNaN(n) ? this.defaultValue : n));
      if (this.cb) {
        this.cb(value);
      }

    } else {

      localStorage.setItem(this.name, String(value));
      if (this.cb) {
          this.cb(value);
      }

    }

  }

  public get() {

    const data = localStorage.getItem(this.name);

    if (data) {

      if (this.type === 'Boolean') {

        return data === 'true';

      } else {

        // This is ok because this.type will always be "String", "Number" or "Boolean".
        // @ts-ignore
        return window[this.type](data);

      }

    } else {

      return this.defaultValue;

    }

  }

  public reset() {
    this.set(this.defaultValue);
  }

}
